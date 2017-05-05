'use strict';

const config = require('../config');
const db = require('../db');
const aql = require('arangojs').aql;
const debug = require('debug')('auth');

const codes = db.collection(config.get('arango:collections:codes'));

function findCode(code) {
  return db
          .query(aql`FOR code IN ${config.get('arango:collections:codes')}
                        FILTER code.code == ${code}
                        RETURN code`)
          .then((code) => {
            code._id = code._key;

            return code;
          })
          .catch({code: 404}, () => null);
}

module.exports = {
  findCode: findCode,
};
