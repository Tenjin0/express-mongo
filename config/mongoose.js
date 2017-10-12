const mongoose = require('mongoose')
const util = require('util')
const config = require('./index')
const debug = require('debug')('express-mongoose');
const db = {}

Promise = require('bluebird')
db.connection = mongoose.Promise = Promise;1
db.connection = mongoose
    .connection
    .on('error', () => {
        throw new Error(`unable to connect to database: ${mongoUri}`);
        process.exit(1)
    });

if (config.env === 'development') 
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });

db.restaurant = mongoose.model('restaurants', new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
    // cuisine: String
}));

db.connect = () => {
    mongoose.connect(config.mongo.uri, {
        keepAlive: 1,
        useMongoClient: true
    });
}

module.exports = db;
