module.exports = [ 
  //-------------------------------------------------------
  // /bookmarks/rocks
  {
    _key: 'default:edges_bookmarks_rocks_123',
    _from: 'graphNodes/default:resources_bookmarks_123',
    _to: 'graphNodes/default:resources_rocks_123',
    name: 'rocks',
    versioned: true,
  },
  // /bookmarks/_changes
  {
    _key: 'default:edges_bookmarks_changes_123',
    _from: 'graphNodes/default:resources_bookmarks_123',
    _to: 'graphNodes/default:changes_bookmarks_123',
    name: '_changes',
    versioned: false,
  },
  // /bookmarks/_meta
  {
    _key: 'default:edges_bookmarks_meta_123',
    _from: 'graphNodes/default:resources_bookmarks_123',
    _to: 'graphNodes/default:meta_bookmarks_123',
    name: '_meta',
    versioned: true,
  },
  // /bookmarks/_meta/_changes
  {
    _key: 'default:edges_meta_bookmarks_changes_123',
    _from: 'graphNodes/default:meta_bookmarks_123',
    _to: 'graphNodes/default:changes_meta_bookmarks_123',
    name: '_changes',
    versioned: true,
  },

  //--------------------------------------------------------
  // /bookmarks/rocks/rocks-index
  {
    _key: 'default:edges_rocks_rocks-index_123',
    _from: 'graphNodes/default:resources_rocks_123',
    _to: 'graphNodes/default:resources_rocks_123:rocks-index',
    name: 'rocks-index', // this was internal to resource
    versioned: true,
  },
  // /bookmarks/rocks/_changes
  {
    _key: 'default:edges_rocks_changes_123',
    _from: 'graphNodes/default:resources_rocks_123',
    _to: 'graphNodes/default:changes_rocks_123',
    name: '_changes',
    versioned: false,
  },
  // /bookmarks/rocks/_meta
  {
    _key: 'default:edges_rocks_meta_123',
    _from: 'graphNodes/default:resources_rocks_123',
    _to: 'graphNodes/default:meta_rocks_123',
    name: '_meta',
    versioned: true,
  },
  // /bookmarks/rocks/_meta/_changes
  {
    _key: 'default:edges_meta_rocks_changes_123',
    _from: 'graphNodes/default:meta_rocks_123',
    _to: 'graphNodes/default:changes_meta_rocks_123',
    name: '_changes',
    versioned: true,
  },


  //--------------------------------------------------------
  // /bookmarks/rocks/rocks-index/90j2klfdjss
  {
    _key: 'default:edges_rocks-index_rock_123',
    _from: 'graphNodes/default:resources_rocks_123:rocks-index',
    _to: 'graphNodes/default:resources_rock_123',
    name: '90j2klfdjss',
    versioned: true,
  },

  // /bookmarks/rocks/rocks-index/90j2klfdjss/_changes
  {
    _key: 'default:edges_rock_changes_123',
    _from: 'graphNodes/default:resources_rock_123',
    _to: 'graphNodes/default:changes_rock_123',
    name: '_changes',
    versioned: false,
  },
  // /bookmarks/rocks/rocks-index/90j2klfdjss/_meta
  {
    _key: 'default:edges_rock_meta_123',
    _from: 'graphNodes/default:resources_rock_123',
    _to: 'graphNodes/default:meta_rock_123',
    name: '_meta',
    versioned: true,
  },
  // /bookmarks/rocks/rocks-index/90j2klfdjss/_meta/_changes
  {
    _key: 'default:edges_meta_rock_changes_123',
    _from: 'graphNodes/default:meta_rock_123',
    _to: 'graphNodes/default:changes_meta_rock_123',
    name: '_changes',
    versioned: true,
  },

];
