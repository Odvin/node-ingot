## College

[Entities](../README.md).

### Mapping with mysql data (Mongo:colleges <-> MySQL:colleges)

|                 MongoDB | MySQL                    | Req.  |   Type   | Description                             |
| ----------------------: | :----------------------- | :---: | :------: | :-------------------------------------- |
|                    \_id | null                     |   +   | ObjectId | Document Id                             |
|                 mysqlId | college_id               |   +   | integer  | MySQL Id                                |
|                 ipedsId | ope_id                   |   +   | integer  | Int. Postsecondary Educ. Data System Id |
|               updatedAt | date_modified            |   +   |   date   | Date of last update                     |
|                   title | school_long_name         |   +   |  string  | School name                             |
|              shortTitle | name                     |   +   |  string  | School sort name                        |
|           address.state | state                    |   +   |  string  | State abrogation e.g. [AL, CL, ...]     |
|             address.zip | index_zip                |   +   |  string  | Zip code                                |
|            address.city | city                     |   +   |  string  | City name                               |
|          address.street | address                  |   +   |  string  | School address                          |
| location.coordinates[1] | longitude                |   +   |  float   | GeoPoint longitude                      |
| location.coordinates[2] | latitude                 |   +   |  float   | GeoPoint latitude                       |
|           phone.general | index_general_telephone  |   -   |  string  | School general telephone                |
|         phone.financial | financial_aid_telephone  |   -   |  string  | School financial aid telephone          |
|    phone.administrative | administrative_telephone |   -   |  string  | School administrative telephone         |
|              url.school | index_url                |   -   |  string  | School web address                      |
|            url.athletes | url_athletic             |   -   |  string  | School athletes web page                |
|                url.logo | logo                     |   -   |  string  | School logo Url                         |
|             student.men | undergrad_men            |   +   | integer  | Undergraduate man                       |
|           student.women | undergrad_women          |   +   | integer  | Undergraduate women                     |
|                  hidden | hidden                   |   +   | boolean  | True if school is archived              |

### Problems

1. _phone_, _finPhone_, _adminPhone_ have to be converted to one standard format.
2. _logoUrl_ contains relevant links, it has to be url of S3 object.
3. mysql DB has _name_, _school_long_name_ and _index_name_ this field have different values.

### Mongo Schema

![College](./scripts/college.svg 'College ER diagram')

### Payload Example

```json
{
  "_id": "60ca013077d6b30034d0d45e",
  "mysqlId": 4,
  "ipedsId": 100937,
  "updatedAt": "2021-06-18T06:18:55.301Z",
  "title": "Birmingham Southern College",
  "shortTitle": "Birmingham Coll.",
  "address": {
    "state": "AL",
    "zip": "35254",
    "city": "Birmingham",
    "street": "900 Arkadelphia Road"
  },
  "location": {
    "type": "Point",
    "coordinates": [86.9291992, 33.5446014]
  },
  "phone": {
    "general": "2052264700",
    "financial": "2052264688",
    "administrative": "2052264696"
  },
  "url": {
    "school": "bsc.edu",
    "athletes": "www.bscsports.net",
    "logo": "5468707.png"
  },
  "student": {
    "men": 528,
    "women": 751
  },
  "hidden": false
}
```

### Schema

```json
{
  "type": "object",
  "required": [
    "mysqlId",
    "ipedsId",
    "title",
    "shortTitle",
    "address",
    "location",
    "student",
    "hidden"
  ],
  "additionalProperties": false,
  "properties": {
    "_id": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "mysqlId": {
      "type": "integer"
    },
    "ipedsId": {
      "type": "integer"
    },
    "updatedAt": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "shortTitle": {
      "type": "string"
    },
    "address": {
      "type": "object",
      "required": ["state", "zip", "city", "street"],
      "additionalProperties": false,
      "properties": {
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "street": {
          "type": "string"
        }
      }
    },
    "location": {
      "type": "object",
      "required": ["type", "coordinates"],
      "additionalProperties": false,
      "properties": {
        "type": {
          "enum": ["Point"]
        },
        "coordinates": {
          "type": "array",
          "maxItems": 2,
          "items": {
            "type": "number"
          }
        }
      }
    },
    "phone": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "general": {
          "type": "string"
        },
        "financial": {
          "type": "string"
        },
        "administrative": {
          "type": "string"
        }
      }
    },
    "url": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "school": {
          "type": "string"
        },
        "athletes": {
          "type": "string"
        },
        "logo": {
          "type": "string"
        }
      }
    },
    "student": {
      "type": "object",
      "required": ["men", "women"],
      "additionalProperties": false,
      "properties": {
        "men": {
          "type": "integer"
        },
        "women": {
          "type": "integer"
        }
      }
    },
    "hidden": {
      "type": "boolean"
    }
  }
}
```
