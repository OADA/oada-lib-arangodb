// This file exports a function which can be used to initialize the database
// with `npm run init`.

const config = require('./config');
const debug = require('debug')('arango/init');
const Database  = require('arangojs').Database;
const _ = require('lodash');
const Promise = require('bluebird');
const users = require('./libs/users.js');

// Can't use db.js's db 
const db = require('arangojs')(config.get('connectionString'));

//------------------------------------------------------------
// First setup some shorter variable names:
const dbname = config.get('database');
const cols = config.get('collections');
const colnames = _.values(cols);

module.exports = {
  run: () => {
    debug('Checking if database exists');
    //---------------------------------------------------------------------
    // Start the show: Figure out if the database exists: if not, make it
    return db.get()
    .then(info => db.listDatabases())
    .then(dbs => {
      dbs = _.filter(dbs, d => d === dbname);
      if (dbs.length > 0) return debug('database '+dbname+' exists');
      debug('Database '+dbname+' does not exist.  Creating...');
      return db.createDatabase(dbname)
      .then(() => debug('Now '+dbname+' database exists'));
    
    
    
    //---------------------------------------------------------------------
    // Use that database, then check that all the collections exist
    }).then(() => {
      db.useDatabase(dbname);
      return db.listCollections();
    }).then(dbcols => {
      return Promise.each(colnames, c => {
        if (_.find(dbcols,d => d.name===c)) {
          return debug('Collection '+c+' exists');
        }
        return db.collection(c).create()
        .then(() => debug('Collection '+c+' has been created'));
      });
    
    
    //---------------------------------------------------------------------
    // Now check if the proper indexes exist on each collection:
    }).then(() => Promise.try(() => indexes)) // Convert to bluebird promise for map
    .map(ind => db.collection(ind.collection).indexes())
    .map((dbindexes,i) => {
      // dbindexes looks like [ { fields: [ 'token' ], sparse: true, unique: true },... ]
      const index = indexes[i]; // { collection: 'tokens', index: 'index' }
      const hasindex = _.find(dbindexes, i => 
        _.includes(i.fields,index.index) && i.sparse && i.unique
      );
      if (hasindex) return debug('Index '+index.index+' exists on collection '+index.collection);
      return db.collection(index.name) // collection name
      .createHashIndex(index.index,{unique: true, sparse: true})
      .then(() => debug('Created '+index.index+' index on '+index.collection));
    
    
    //----------------------------------------------------------------------
    // Finally, insert default users if they want some:
    }).then(() => defaultusers || [])
    .map(u => {
      return db.collection('users').firstExample({ username: u.username })
      .then(() => debug('User '+u.username+' exists'))
      .catch(err => {
        debug('User '+u.username+' does not exist.  Creating...');
        return users.create(u)
        .then(debug('User '+u.username+' created'));
      })
    });
  },

  // cleanup will delete the test database if in test mode
  cleanup: () => {
    if (!config.get('isTest')) {
      throw new Error('Cleanup called, but isTest is not true!  Cleanup only deletes the database when testing.');
    }
    db.useDatabase('_system'); // arango only lets you drop databases from _system
    debug('Cleaning up by dropping test database '+config.get('database'));
    return db.dropDatabase(config.get('database'))
    .then(() => debug('Database '+config.get('database')+' dropped successfully'));
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







