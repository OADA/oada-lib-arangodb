const config = require('../config');
const db = require('../db.js');
const aql = require('arangojs').aql;
const resources = require('./resources');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

/*
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

function findById(id) {
  return db
    .query(aql`FROM DOCUMENT(${config.get('arango:collections:codes')}/${id})`)
    .then((user) => {
      user._id = user._key;

      return user;
    })
    .catch({code: 404}, () => null);
}

function findByUsernae(username) {

}

function create(u) {
  return Promise.try(() => {
    console.log('create user was called');
  });
  /*
  u = _.cloneDeep(u);
  // Hash the plaintext password:
  u.password = bcrypt.hashSync(u.password, config.get('init:passwordSalt'));

  // 1. Create meta document for bookmarks resource
  resources
  // 2. Create bookmarks resource
  // 3. Create graph node for meta document and bookmarks resource
  // 4. Create _meta edge for bookmarks -> meta
  // 5. Create user with proper bookmarksid
*/
}


module.exports = {
  findById,
  findByUsername,
  create: create,
};
