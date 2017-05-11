module.exports = [ 
  //------------------------------------------------
  // Bookmarks document:
  { 
    "_key": "default:resource_bookmarks_123",
    resource_id: 'default:resource_bookmarks_123',
    is_resource: true,
    meta_id: "default:meta_bookmarks_123",
  },
  {
    "_key": "default:changes_bookmarks_123",
    resource_id: 'default:changes_bookmarks_123',
    is_resource: true,
    meta_id: "default:meta_bookmarks_123",
  },

  // Bookmarks document meta
  { 
    "_key": "default:meta_bookmarks_123",
    resource_id: 'default:meta_bookmarks_123',
    is_resource: true,
    meta_id: "default:meta_bookmarks_123",
  },
  {
    "_key": "default:changes_meta_bookmarks_123",
    resource_id: 'default:changes_meta_bookmarks_123',
    is_resource: true,
    meta_id: "default:meta_bookmarks_123",
  },


  //------------------------------------------------------
  // Rocks document:
  {
    "_key": "default:resources_rocks_123",
    resource_id: 'default:resources_rocks_123',
    is_resource: true,
    meta_id: "default:meta_rocks_123",
  },
  { // This is an example of a node internal to a resource
    _key: 'default:resources_rocks_123:rocks-index',
    resource_id: 'default:resources_rocks_123',
    meta_id: 'default:meta_rocks_123',
    is_resource: false,
    path: '/rocks-index',
  },

  {
    "_key": "default:changes_rocks_123",
    resource_id: 'default:changes_rocks_123',
    is_resource: true,
  },

  // Rocks document meta
  {
    "_key": "default:meta_rocks_123",
    resource_id: 'default:meta_rocks_123',
    is_resource: true,
    meta_id: "default:meta_rocks_123",
  },
  {
    "_key": "default:changes_meta_rocks_123",
    resource_id: 'default:changes_meta_rocks_123',
    is_resource: true,
    meta_id: "default:meta_rocks_123",
  },

   
  //-----------------------------------------------------------------
  // Rock document
  {
    "_key": "default:resources_rock_123",
    resource_id: 'default:resources_rock_123',
    is_resource: true,
    meta_id: 'default:meta_rock_123',
  },
  {
    "_key": "default:changes_rock_123",
    resource_id: 'default:changes_rock_123',
    meta_id: 'default:meta_rock_123',
    is_resource: true,
  },

  // Rock document meta
  {
    "_key": "default:meta_rock_123",
    resource_id: 'default:meta_rock_123',
    meta_id: 'default:meta_rock_123',
    is_resource: true,
  },
  {
    "_key": "default:changes_meta_rock_123",
    resource_id: 'default:changes_meta_rock_123',
    meta_id: 'default:meta_rock_123',
    is_resource: true,
  },


];
