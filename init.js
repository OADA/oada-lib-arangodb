// This file exports a function which can be used to initialize the database
// with `npm run init`.

/*
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
*/




const debug = require('debug')('init');
const Database  = require('arangojs').Database;
const _ = require('lodash');
const Promise = global.Promise = require('bluebird');
const bcrypt = require('bcryptjs');

// Allow oada-ref-auth-js to pass us the config, avoiding circular requires
module.exports = config => {

  debug('Checking if database '+config.get('database')+' exists');

  //------------------------------------------------------------
  // First setup some shorter variable names:
  const db = new Database(config.get('connectionString'));
  const dbname = config.get('database');
  const cols = config.get('collections');
  const colnames = _.values(cols);
  // Get users, hash passwords in case we need to save:
  const defaultusers = _.map(config.get('arango:defaultusers'), u => {
    u.password = bcrypt.hashSync(u.password, config.get('server:passwordSalt'))
    return u;
  });
  const indexes = [
    { collection: 'users', index: 'username' }, 
    { collection: 'clients', index: 'clientId' }, 
    { collection: 'tokens', index: 'token' }, 
    { collection: 'codes', index: 'code'  },
  ];


  //---------------------------------------------------------------------
  // Start the show: Figure out if the database exists: if not, make it
  return db.get()
  .then(info => db.listDatabases())
  .then(dbs => {
    dbs = _.filter(dbs, d => d === dbname);
    if (dbs.length > 0) return debug('database '+dbname+' exists');
    debug('database '+dbname+' does not exist.  Creating...');
    return db.createDatabase(dbname)
    .then(() => debug('Now '+dbname+' database exists'));


  //---------------------------------------------------------------------
  // Use that database, then check that all the collections exist
  }).then(() => {
    db.useDatabase(dbname);
    return db.listCollections();
