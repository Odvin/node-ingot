## Sport

[Entities](../README.md).

### External data for coach profile is received from NCSA Cognito user pool.

### Mapping with mysql data (Mongo:coaches <-> MySQL:users)

|          MongoDB | MySQL               | Req. |    Type    | Description                  |
| ---------------: | :------------------ | :--: | :--------: | :--------------------------- |
|             \_id | null                |  +   |  ObjectId  | Document Id                  |
|          mysqlId | users.users_id      |  -   |  integer   | MySQL Id                     |
|           ncsaId | -                   |  -   |  integer   | NCSA user Id                 |
|        updatedAt | users.date_modified |  +   |    date    | Date of last update          |
|             name | users.first         |  +   |   string   | User name                    |
|          surname | users.last          |  +   |   string   | User surname                 |
|             role | -                   |  +   |   string   | Enum ['manager', 'coach']    |
|   contacts.email | users.email         |  +   |   string   | User email                   |
| contacts.twitter | -                   |  -   |   string   | User twitter                 |
|   contacts.phone | -                   |  -   |   string   | User phone                   |
|       sportIds[] | -                   |  +   | [ObjectId] | **FK** for **sports**.\_id   |
|        collegeId | -                   |  +   |  ObjectId  | **FK** for **colleges**.\_id |

### Problems

1. Do we need Stripe information in this service.
2. How to connect coaches with sports and universities using foreign keys? We have mysql internal keys, ncsa keys, ipedsId for the colleges and canonical sport id for the sports.

### Mongo Schema

![Coach](./scripts/coach.svg 'Coach ER diagram')

### Payload Example

```json
{
  "_id": "60ca013077d6b30034d0d45e",
  "mysqlId": 2,
  "ncsaId": 3879,
  "updatedAt": "2021-06-18T06:18:55.301Z",
  "name": "Marc",
  "surname": "Swindle",
  "role": "manager",
  "contacts": {
    "email": "mswindle@synchagency.com",
    "twitter": "@mswindle",
    "phone": "8907803453"
  },
  "sportIds": [
    "60ca013077d6b30034d0d44e",
    "60ca013077d6b30034d0d46e",
    "60ca013077d6b30034d0d48e"
  ],
  "collegeId": "60ca013077d6b30034d0d40e"
}
```

### Schema

```json
{
  "type": "object",
  "required": [
    "updatedAt",
    "name",
    "surname",
    "role",
    "contacts",
    "sportIds",
    "collegeId"
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
    "ncsaId": {
      "type": "integer"
    },
    "updatedAt": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "surname": {
      "type": "string"
    },
    "role": {
      "type": {
        "enum": ["manager", "coach"]
      }
    },
    "contacts": {
      "type": "object",
      "required": ["email"],
      "additionalProperties": false,
      "properties": {
        "email": {
          "type": "string"
        },
        "twitter": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        }
      }
    },
    "sportIds": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^[a-fA-F0-9]{24}$",
        "minItems": 1
      }
    },
    "collegeId": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    }
  }
}
```
