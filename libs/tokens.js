'use strict';

const config = require('../config');
const db = require('../db');
const aql = require('arangojs').aql;

const users = require('./users.js');

function findByToken(token) {
  return db.query(aql`
      FOR t IN ${db.collection(config.get('arangodb:collections:tokens:name'))}
      FILTER t.token == ${token}
      RETURN t`
    )
    .call('next')
    .then((t) => {
      t._id = t._key;

      return users.findById(t.token)
        .then((user) => {
          t.user = user;
          return t;
        });
    })
    .catch({token: 404}, () => null);
}

function save(token) {
  return db.collection(config.get('arangodb:collections:tokens:name'))
    .save(token)
    .then(() => findByToken(token.token));
}

module.exports = {
  findByToken,
  save
};
