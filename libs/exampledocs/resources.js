module.exports = [

  //------------------------------------------------
  // Bookmarks document:
  { 
    "_key": "default:resources_bookmarks_123",
    "_oada_rev": "1-abc",
    "_type": "application/vnd.oada.bookmarks.1+json",
    "_meta": { "_id": "default:meta_bookmarks_123", "_rev": "1-abc" },
    "_changes": { "_id": "default:changes_bookmarks_123" },
    "rocks": { "_id": "default:resources_rocks_123", "_rev": "1-abc" }
  },
  {
    "_key": "default:changes_bookmarks_123",
    resourceid: 'default:resources_bookmarks_123', // _changes cannot link to anything
    _oada_rev: "1-abc",
    "1-abc": {
      merge: {
        "_rev": "1-abc",
        "_type": "application/vnd.oada.bookmarks.1+json",
        "_meta": { "_id": "default:meta_bookmarks_123", "_rev": "1-abc" },
        "_changes": { "_id": "default:changes_bookmarks_123" },
        "rocks": { "_id": "default:resources_rocks_123", "_rev": "1-abc" }
      },
      userid: 'default:users_frank_123',
      clientid: 'default:clients_123',
    },
  },

  // Bookmarks document meta
  { 
    "_key": "default:meta_bookmarks_123",
    "_oada_rev": "1-abc",
    "_type": "application/vnd.oada.bookmarks.1+json",
    "_owner": "default:users_frank_123",
    "_changes": { "_id": "default:changes_meta_bookmarks_123" },
    "stats": { // stats on meta is exempt from _changes because that would generate loop of rev updates with resource
      "createdBy": "default:users_frank_123",
      "created": 1494133055,
      "modifiedBy": "default:users_frank_123",
      "modified": 1494133055
    },
  },
  {
    "_key": "default:changes_meta_bookmarks_123",
    _oada_rev: "1-abc",
    resourceid: 'default:meta_bookmarks_123',
    "1-abc": {
      merge: {
        "_rev": "1-abc",
        "_type": "application/vnd.oada.bookmarks.1+json",
        "_owner": "default:users_frank_123",
        "_changes": { "_id": "default:changes_meta_bookmarks_123" },
      },
      userid: 'default:users_frank_123',
      clientid: 'default:clients_123',
    },
  },


  //------------------------------------------------------
  // Rocks document:
  {
    "_key": "default:resources_rocks_123",
    "_oada_rev": "1-abc",
    "_type": "application/vnd.oada.rocks.1+json",
    "_meta": { "_id": "default:meta_rocks_123", "_rev": "1-abc" },
    "_changes": { "_id": "default:changes_rocks_123" },
    "rocks-index": { 
      "90j2klfdjss": { "_id": "default:resources_rock_123", "_rev": "1-abc" }
    }
  },
  {
    "_key": "default:changes_rocks_123",
    "_oada_rev": "1-abc",
    resourceid: 'default:resources_rocks_123',
    "1-abc": {
      merge: {
        "_rev": "1-abc",
        "_type": "application/vnd.oada.rocks.1+json",
        "rocks-index": { 
          "90j2klfdjss": { "_id": "default:resources_rock_123", "_rev": "1-abc" }
        }
      },
      userid: 'default:users_frank_123',
      clientid: 'default:clients_123',
    }
  },

  // Rocks document meta
  {
    "_key": "default:meta_rocks_123",
    "_oada_rev": "1-abc",
    "_type": "application/vnd.oada.rocks.1+json",
    "_owner": "default:users_frank_123",
    "_changes": { "_id": "default:changes_meta_rocks_123" },
    "stats": {
      "createdBy": "default:users_frank_123",
      "created": 1494133055,
      "modifiedBy": "default:users_frank_123",
      "modified": 1494133055
    }
  },
  {
    "_key": "default:changes_meta_rocks_123",
    "_oada_rev": "1-abc",
    resourceid: 'default:meta_rocks_123',
    "1-abc": {
      merge: {
        "_rev": "1-abc",
        "_type": "application/vnd.oada.rocks.1+json",
        "_owner": "default:users_frank_123",
        "_changes": { "_id": "default:changes_meta_rocks_123" },
      },
      userid: 'default:users_frank_123',
      clientid: 'default:clients_123',
    }
  },

   
  //-----------------------------------------------------------------
  // Rock document
  {
    "_key": "default:resources_rock_123",
    "_oada_rev": "1-abc",
    "_type": "application/vnd.oada.rock.1+json",
    "_meta": { "_id": "default:meta_rock_123", "_rev": "1-abc" },
    "_changes": { "_id": "default:changes_rock_123" },
    "location": { "latitude": "-40.1231242", "longitude": "82.192089123" },
    "picked_up": false
  },
  {
    "_key": "default:changes_rock_123",
    "_oada_rev": "1-abc",
    resourceid: "default:changes_rock_123",
    '1-abc': {
      merge: {
        "_rev": "1-abc",
        "_type": "application/vnd.oada.rock.1+json",
        "_meta": { "_id": "default:meta_rock_123", "_rev": "1-abc" },
        "_changes": { "_id": "default:changes_rock_123" },
        "location": { "latitude": "-40.1231242", "longitude": "82.192089123" },
        "picked_up": false
      },
      userid: 'default:users_frank_123',
      clientid: 'default:clients_123',
    }
  },



  // Rock document meta
  {
    "_key": "default:meta_rock_123",
    "_oada_rev": "1-abc",
    "_type": "application/vnd.oada.rock.1+json",
    "_owner": "default:users_frank_123",
    "_changes": { "_id": "default:changes_meta_rock_123" },
    "stats": {
      "createdBy": "default:users_frank_123",
      "created": 1494133055,
      "modifiedBy": "default:users_frank_123",
      "modified": 1494133055
    }
  },
  {
    "_key": "default:changes_meta_rock_123",
    "_oada_rev": "1-abc",
    resourceid: "default:changes_rock_123",
    '1-abc': {
      merge: {
        "_rev": "1-abc",
        "_type": "application/vnd.oada.rock.1+json",
        "_owner": "default:users_frank_123",
        "_changes": { "_id": "default:changes_meta_rock_123" },
      },
      userid: 'default:users_frank_123',
      clientid: 'default:clients_123',
    }
  },


]
