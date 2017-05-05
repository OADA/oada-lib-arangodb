'use strict';

const config = require('./config');
const db = require('arangojs')(config.get('arangodb:connectionString'));

if (config.get('isTest')) {
  config.set('arangodb:database', 'oada-test');
}

db.useDatabase(config.get('arangodb:database'));

module.exports = db;
