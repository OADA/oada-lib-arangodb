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

module.exports = {
  isTest: false, // set to true and random database will be created for you
  connectionString: 'http://arangodb:8529',
  database: 'oada-ref-auth',
  collections: {
    users: 'users',
    clients: 'clients',
    tokens: 'tokens',
    codes: 'codes',
    resources: 'resources',
    graphNodes: 'graphNodes',
    edges: 'edges'
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
