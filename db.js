'use strict';

const config = require('./config');
const db = require('arangojs')(configure.get('arango:connectionString'));

module.exports = db.useDatabase(config.get('arango:database'));
