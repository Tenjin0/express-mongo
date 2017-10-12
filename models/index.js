const fs = require('fs')
const path = require('path')
const db = {}
fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import (path.join(__dirname, file));
        db[model.name] = model;
    });

