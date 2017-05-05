// Tests for init.js

const config = require('../config');
const arango = require('arangojs');
const expect = require('chai').expect;
const _ = require('lodash');
const Promise = require('bluebird');

config.set('isTest', true);
const init = require('../init');
const dbname = config.get('arangodb:database');

const db = new arango.Database({
  promise: Promise,
  url: config.get('arangodb:connectionString'),
});

describe('init', () => {
  before(() => {
    console.log('Running init before the tests: if it throws early, that will show here.');
    return init.run().then(() => {;
      console.log('Init is done running, runing tests to see if it did what it should');
    });
  });

  it('should have created test database'+dbname, () => {
    db.useDatabase('_system');
    return db.listDatabases()
    // Expect one of the database names returned to be the database name
    .then(dbs => {
      expect(_.find(dbs, d => d === dbname)).to.equal(dbname)
    });
  });

  it('should have created all the collections', () => {
    db.useDatabase(dbname);
    return db.listCollections()
    .then(dbcols => {
      const cols = config.get('arangodb:collections');
      _.each(cols, c => {
        // expect the returned list of db collections to contain each name
        const hasname = !!_.find(dbcols, d => d.name === c.name);
        expect(hasname).to.equal(true);
      });
    });
  });

  it('should have created all the indexes on the collections', () => {
    db.useDatabase(dbname);
    const colsarr = _.values(config.get('arangodb:collections'));
    return Promise.map(colsarr, c => {
      // dbindexes looks like [ { fields: [ 'token' ], sparse: true, unique: true },... ]
      return db.collection(c.name).indexes()
      .then(dbindexes => { 
        return _.map(c.indexes, ci => { // for each index in collection, check if exists
          const hasindex = !!_.find(dbindexes, dbi => _.includes(dbi.fields,ci));
          expect(hasindex).to.equal(true);
        });
      });
    });
  });

  after(() => {
    console.log('About to cleanup after running tests.  If cleanup throws, it will be here.');
    return init.cleanup().then(() => {
      console.log('Cleanup finished.');
    });
  });
});
