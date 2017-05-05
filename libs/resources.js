const db = require('../db');
const debug = require('debug')('resources');

//----------------------------------------
// - Create a resource with a given id and content.
// - This will also create a meta resource.
// - This will also update the graph to point to from
//   the resource to the meta resource.
// r should look like:
// { 
//   _id: 'kjf20i3kfl3f2j', 
//   _type: 'application/vnd.oada.bookmarks.1+json',
//   ...other content...
// }
function create(r) {
  debug('create resources called');
/*
  if (!r._id) { 
    debug('r._id required, but not given.');
    throw new Error({ code: 'MISSING_ID'});
  }
  if (!r._type) { 
    debug('r._type required, but not given.');
    throw new Error({ code: 'TYPE_MISSING'});
  }
  if (r._meta) delete r._meta;
  if (r._rev) delete r._rev;

  // 1. create meta document
*/
}

module.exports = {
  create: create,
};
