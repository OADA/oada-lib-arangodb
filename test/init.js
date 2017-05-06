// Tests for init.js

const config = require('../config');
const arango = require('arangojs');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const _ = require('lodash');
const Promise = require('bluebird');

config.set('isTest', true);
const init = require('../init');
const dbname = config.get('arangodb:database');

const db = new arango.Database({
  promise: Promise,
  url: config.get('arangodb:connectionString'),
});
const cleanup = init.cleanup; // set this to an empty function if you don't want db to be deleted

describe('init', () => {

  it('should drop test database if it already exists', () => {
    db.useDatabase('_system');
    return db.listDatabases()
    .then(dbs => { console.log('dbs = ', dbs); return dbs; })
    .each(d => (d === dbname ? db.dropDatabase(dbname) : null))
    .then(() => db.createDatabase(dbname))
    .then(() => {
      db.useDatabase(dbname);
      return db.collection('dummycollection').create();
    })
    .then(init.run)
    .then(() => db.listCollections())
    .then(cols => { expect(_.map(cols,'name')).to.not.contain('dummycollection') })
    .finally(init.cleanup);
  });


  it('should create test database'+dbname, () => {
    return init.run()
    .then(() => {
      db.useDatabase('_system');
      return db.listDatabases()
      // Expect one of the database names returned to be the database name
      .then(dbs => {
        expect(_.find(dbs, d => d === dbname)).to.equal(dbname)
      });
    }).finally(init.cleanup);
  });

  it('should have created all the collections', () => {
    return init.run()
    .then(() => {
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
    }).finally(init.cleanup)
  });

  it('create all the indexes on the collections', () => {
    return init.run()
    .then(() => {
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
    }).finally(init.cleanup)
  });

  it('should create any requested default users', () => {
    return init.run()
    .then(() => {
      db.useDatabase(dbname);
      const collection = db.collection(config.get('arangodb:collections:users').name);
      const us = config.get('arangodb:init:users');
      if (!_.isArray(us)) return expect(true).to.equal(true); // no requested default users
      return Promise.map(us, u => {
        return collection.firstExample({username: u})
        .then(result => {
          expect(result.username).to.equal(u.username);
        }).catch(err => {
          const str = 'User: '+u.username+', err: ';
          expect(str+err).to.equal(str); // this wonky code is so it at least prints out the username
        })
      });
    }).finally(init.cleanup);
  });
});
