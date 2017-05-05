/* Copyright 2014 Open Ag Data Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

var path = require('path');
var fs = require('fs');

module.exports = {
  isTest: false, // set to true and random database will be created for you
  connectionString: 'http://arangodb:8529',
  database: 'oada-ref-auth',
  collections: {
         users: { name: 'users',      indexes: [ 'username' ], },
       clients: { name: 'clients',    indexes: [ 'clientId' ], },
        tokens: { name: 'tokens',     indexes: [ 'token'    ], },
         codes: { name: 'codes',      indexes: [ 'code'     ], },
     resources: { name: 'resources',  indexes: [ ], },
    graphNodes: { name: 'graphNodes', indexes: [ ], },
         edges: { name: 'edges',      indexes: [ ], },
  },
  init:
    users: [
      {   username: "frank",           password: "test",
              name: "Farmer Frank", family_name: "Frank",
        given_name: "Farmer",       middle_name: "",
          nickname: "Frankie",            email: "frank@openag.io",
      },
    ],
  },
};
