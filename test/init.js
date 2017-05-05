// Tests for init.js

const config = require('../config');
const arango = require('arangojs');

const dbname = 'lib-arango-test';
config.set('isTest', true);
config.set('database', dbname);

const init = require('../init');

const db = new arango.Database(config.get('connectionString'));
db.useDatabase(config.get('database'));

describe('init', () => {
  before(() => {
    console.log('Running init before the tests: if it throws early, that will show here.');
    init.run();
    console.log('Init is done running, runing tests to see if it did what it should');
  });

  it('should have created test database lib-arangodb-test', () => {
    return db.listDatabases()
    // Expect one of the database names returned to be the database name
    .then(dbs => expect(_.find(dbs, d => d === dbname)).to.equal(dbname));
  });

  // check collections

  after(() => {
    init.cleanup();
  });
});
