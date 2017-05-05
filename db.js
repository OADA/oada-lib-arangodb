'use strict';

const config = require('./config');

const db = require('arangojs')(config.get('connectionString'));

module.exports = db.useDatabase(config.get('database'));
