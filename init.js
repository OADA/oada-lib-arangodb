// This file exports a function which can be used to initialize the database
// with `npm run init`.

const config = require('./config');
const debug = require('debug')('arango/init');
const Database  = require('arangojs').Database;
const _ = require('lodash');
const users = require('./libs/users.js');
const Promise = require('bluebird');
const pr = Promise.resolve; // for wrapping the native promises returned from arangodb

// Can't use db.js's db because we're creating the actual database
const db = require('arangojs')(config.get('arangodb:connectionString'));
db.useDatabase('_system');

//------------------------------------------------------------
// First setup some shorter variable names:
const dbname = config.get('arangodb:database');
const cols = config.get('arangodb:collections');
const colsarr = _.values(cols);
const defaultusers = config.get('arangodb:init:users');

module.exports = {
  run: () => {
    debug('Checking if database exists');
    //---------------------------------------------------------------------
    // Start the show: Figure out if the database exists: if not, make it
    return pr(db.listDatabases())
    .then(dbs => {
      dbs = _.filter(dbs, d => d === dbname);
      if (dbs.length > 0) return debug('database '+dbname+' exists');
      debug('Database '+dbname+' does not exist.  Creating...');
      return pr(db.createDatabase(dbname))
      .then(() => debug('Now '+dbname+' database exists'));
    
    
    
    //---------------------------------------------------------------------
    // Use that database, then check that all the collections exist
    }).then(() => {
      debug('Using database '+dbname);
      db.useDatabase(dbname);
      return pr(db.listCollections());
    }).then(dbcols => {
      debug('Found collections, looking for the ones we need');
      return Promise.each(colsarr, c => {
        if (_.find(dbcols,d => d.name===c.name)) {
          return debug('Collection '+c.name+' exists');
        }
        return pr(db.collection(c.name).create())
        .then(() => debug('Collection '+c.name+' has been created'));
      });
    
    
    //---------------------------------------------------------------------
    // Now check if the proper indexes exist on each collection:
    }).then(() => pr(colsarr))
    .map(c => pr(db.collection(c.name).indexes())
      .then(dbindexes => {
        return Promise.map(c.indexes, ci => { // for each index in this collection, check and create
          if (_.find(dbindexes, dbi => _.isEqual(dbi.fields, [ ci ]))) {
            return debug('Index '+ci+' exists on collection '+c.name);
          }
          // Otherwise, create the collection
          return pr(db.collection(c.name).createHashIndex(ci,{unique: true, sparse: true}))
          .then(() => debug('Created '+ci+' index on '+c.name));
        });
      })

    
    //----------------------------------------------------------------------
    // Finally, insert default users if they want some:
    ).then(() => (defaultusers || []))
    .map(u => {
      return pr(db.collection('users').firstExample({ username: u.username }))
      .then(() => debug('User '+u.username+' exists'))
      .catch(err => {
        debug('User '+u.username+' does not exist.  Creating...');
        return users.create(u)
        .then(debug('User '+u.username+' created'));
      })
    }).catch(err => {
      if (err && err.response) {
        debug('ERROR: something went wrong.  err.body = ', err.response.body);
      } else {
        debug('ERROR: something went wrong.  err = ', err);
      }
    });
  },

  // cleanup will delete the test database if in test mode
  cleanup: () => {
    if (!config.get('isTest')) {
      throw new Error('Cleanup called, but isTest is not true!  Cleanup only deletes the database when testing.');
    }
    db.useDatabase('_system'); // arango only lets you drop databases from _system
    debug('Cleaning up by dropping test database '+config.get('arangodb:database'));
    return pr(db.dropDatabase(config.get('arangodb:database')))
    .then(() => debug('Database '+config.get('arangodb:database')+' dropped successfully'));
  }

};

//-----------------------------------------------------------------------
/* examples of what's in the database:
 
    graphNode {
      resourceId: <id of resource>
      isResource: true
    }

    resource {
      _id: <id of resource (me)>
      _rev:
      _meta: {
        _id: <id of meta resource (meta:<id of this resource>)>
        _rev:
      }
    }

    edge {
      _to: <id of graphNode B>
      _from: <id of graphNode A>
      name: <key name in resource for link>
    }

  client {
    "clientId": "3klaxu838akahf38acucaix73@identity.oada-dev.com",
    "name": "OADA Reference Implementation",
    "contact": "info@openag.io",
    "puc": "https://identity.oada-dev.com/puc.html",
    "redirectUrls": [
      "https://client.oada-dev.com/redirect"
    ],
    "licenses": [
      {
        "id": "oada-1.0",
        "name": "OADA Fictitious Agreement v1.0"
      }
    ],
    "keys": [{
      "kty": "RSA",
      "use": "sig",
      "alg": "RS256",
      "kid": "nc63dhaSdd82w32udx6v",
      "n": "AKj8uuRIHMaq-EJVf2d1QoB1DSvFvYQ3Xa1gvVxaXgxDiF9-Dh7bO5f0VotrYD05MqvY9X_zxF_ioceCh3_rwjNFVRxNnnIfGx8ooOO-1f4SZkHE-mbhFOe0WFXJqt5PPSL5ZRYbmZKGUrQWvRRy_KwBHZDzD51b0-rCjlqiFh6N",
      "e": "AQAB"
    }]
  }

  code {
    "code": "xyz",
    "scope": [],
    "nonce": "",
    "user": { "_id": "123frank" },
    "createTime": 1413831649937,
    "expiresIn": 60,
    "redeemed": true,
    "clientId": "jf93caauf3uzud7f308faesf3@provider.oada-dev.com",
    "redirectUri": "http://client.oada-dev.com/redirect"
  }
  
  token {
    "token": "xyz",
    "createTime": 1413831649937,
    "expiresIn": 60,
    "user": { "_id": "123frank" },
    "clientId": "jf93caauf3uzud7f308faesf3@provider.oada-dev.com"
  }

  user {
    "_key": "123frank",
    "username": "frank",
    "password": "test",
    "name": "Farmer Frank",
    "family_name": "Frank",
    "given_name": "Farmer",
    "middle_name": "",
    "nickname": "Frankie",
    "email": "frank@openag.io"
  }

*/







