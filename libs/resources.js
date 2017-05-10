const db = require('../db');
const debug = require('debug')('resources');
const _ = require('lodash');
const Promise = require('bluebird');
const uuidV4 = require('uuid/v4');
const moment = require('moment');
const aql = require('arangojs').aqlQuery;
const md5 = require('md5');

//----------------------------------------
// - Create a resource with a given id and content.
// - This will also create a meta resource.
// - This will also update the graph to point to from
//   the resource to the meta resource.
// req should look like:
// {
//   body: {                        // body is REQUIRED
//     _id: 'kjf20i3kfl3f2j', 
//     _type: 'application/vnd.oada.bookmarks.1+json',
//   },
//   revPrefix: 154,                 // revPrefix is REQUIRED: it's the integer part on the front of the _rev.  Use the offset from Kafka partition.
//   user: { _id: "kjf02ij3fkls" },  // user is REQUIRED
//   client: 'kdf02ijklsjfo23ik32k", // client is OPTIONAL if not created from an API request
// }
function upsert(req) {
  /*
  const c; // resources collection
  const rescol; // collection name, shorter than config.get('arangodb:collections:resources')
  const graphcol;
  const meta; // id of meta if we're making one
  const exists = false;
  const hasmeta = false;
  return Promise.try(() => {
    opts = opts || {};
    req = _.cloneDeep(req);

    rescol = config.get('arangodb:collections:resources');
    graphcol = config.get('arangodb:collections:graphNodes');

    if (!req.body) {
      debug('req._body required but not given');
      throw new Error({ code: 'MISSING_BODY' });
    }

    // If they gave an _id, move it to _key for arango
    if (req.body._id) { 
      req.body._key = req.body._id;
      delete req.body._id;
    }
    // Can't create a resource without specifying the _key for arango
    if (!req.body._key) {
      debug('req.body._id (oada _id) or req.body._key required, but neither was given.');
      throw new Error({ code: 'MISSING_ID'});
    }
    if (!req.body._type) { 
      debug('req.body._type required, but not given.');
      throw new Error({ code: 'MISSING_TYPE'});
    }
    if (!req.user || !req.user._id) {
      debug('req.user and req.user._id required, but not given');
      throw new Error({ code: 'MISSING_USER'});
    }
    if (!req.revPrefix) {
      debug('req.revPrefix is required, but not given');
      throw new Error({ code: 'MISSING_REVPREFIX'});
    }
    // This library sets up meta and rev, so get rid of any from outside:
    if (req.body._meta) delete r.body._meta;
    if (req.body._rev) delete r.body._rev;


    //--------------------------------------------------------------------------------------
    // 1: Decide new rev
    const rev = req.revPrefix+'-'+md5(req);

    // 2: Check database to see if this change is to a meta resource or an actual resource
    return db.query(aql`FOR r IN ${colname} FILTER r._key == ${req.body._key} RETURN { _key: r._key, _meta: r._meta }`)
    .then(res => { exists = !!res._key; hasmeta = !!res._meta; })

  }).then(() => {
    //--------------------------------------------------------------------------------------
    // 3: Upsert request to _changes
    const node = graphcol+'/'+req.body._key;
    if (hasmeta) { // db object is a meta object, so 1-hop in the graph
      return db.query(aql`
        FOR v,e IN 1..1
          OUTBOUND ${node}
          edges FILTER e.name == '_changes' AND p.edges[1] == null
          UPDATE 

     
    } else { // db object is a resource, so 2-hops in the graph
    return db.query(aql`
      FOR v,e,p IN 1..2
        OUTBOUND ${node}
        edges FILTER p.edges[0].name == '_meta' AND p.edges[1].name == '_changes'
              FILTER p.edges[0].name == '_changes' AND p.edges[1] == null


    }

    const startnode = graphcol+'/'+req.body._key;
    // If changing meta doc, post req 

    //--------------------------------------------------------------------------------------
    // 1. Need to decide if it already exists or if we need to make it because if it is new, 
    //    we have to create it's meta document, etc.

  }).then(res => {
    exists = !!res._key;
    hasmeta = !!res._meta;
    // If it doesn't exist we're creating a new one:
    if (!exists) {
      // If making a resource, make its meta document first:
      if (!req.isMeta) {
        const meta = {
          _key: uuidV4().replace('-',''), // I don't like the dashes
          _type: req.body._type,
          _owner: req.user._id,
          _client: (req.client ? req.client : null),
          _stats: {
            createdBy: { _id: req.user._id },
            created: moment().unix(),
            modifiedBy: { _id: req.user._id },
            modified: moment().unix(),
          }
        };
        return create({
          body: meta,
          user: req.user,
          client: req.client,
          isMeta: true,
        });
      }
    }
    //------------------------------------
    // 1. If regular resource, create meta document
    if (!req.isMeta) { // false or undefined
    }
  // Now meta exists, create actual resource
  }).then(() => {
  });
  */
}

function upsertMeta(req) {
}

function upsertChanges(req) {
}

module.exports = {
  upsert: upsert,
};
