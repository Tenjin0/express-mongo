const express = require('express')
const config = require('./config')
const db = require('./config/mongoose')

db.connect()
const app = express();

app.set('port', process.env.PORT || 3000);
app.use((req, res, next) => {
    req.db = db;
    next();
});
app.get('/api/restaurants?/:id?', (req, res, next) => {
    const opts = {}
    if (req.params.id) {
        opts._id = req.params.id
    }
    req
        .db
        .restaurant
    // .find(opts, (err, restaurants) => {     if (err) {         return next(err);
    //    }     if (!restaurants) {         return res.status(404).json({action:
    // 'get', message:'not found'})     }     res.json(restaurants); })
        .find(opts)
        .then(restaurants => {
            if (!restaurants.length) {
                return res
                    .status(404)
                    .json({action: 'get', message: 'not found'})
            }
            res.json(restaurants[0]);
        }).catch(err => {
            console.warn(err)
            res.status(500).json({err,message : 'server error'})
            
        })
});

app.delete('/api/restaurants?/:id', (req, res, next) => {
    db
        .restaurant
        .findOneAndRemove({
            _id: req.params.id
        }, (err, restaurant) => {
            if (err) {
                return res
                    .status(500)
                    .send('server error')
            }
            if (!restaurant) {
                return res
                    .status(404)
                    .send('not found')
            }
            res.json({action: "detete", restaurant})
        })
})

// app.use()
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
    console.log(`Mode: ${process.env.NODE_ENV}`);
});
