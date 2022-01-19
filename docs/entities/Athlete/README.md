## Athletes

[Entities](../README.md).

### Document schema (Mongo collection: athletes)

|                 MongoDB | Index | Req. |   Type   | Description                       |
| ----------------------: | :---- | :--: | :------: | :-------------------------------- |
|                    \_id | +     |  +   | ObjectId | Document Id                       |
|                  extIdA | -     |  -   | integer  | External (MySQL) Id               |
|               updatedAt | -     |  +   |   date   | Date of last update               |
|                    name | -     |  +   |  string  | Athlete name                      |
|                 surname | -     |  +   |  string  | Athlete surname                   |
|                    nick | -     |  -   |  string  | Athlete nickname                  |
|              graduation | -     |  +   |   init   | Graduation year                   |
|                birthday | -     |  -   |   date   | Birthday                          |
|          contacts.email | -     |  -   |  string  | Emails                            |
|         contacts.phones | -     |  -   |  string  | Phone                             |
|          contacts.state | -     |  -   |  string  | Stage abbreviation                |
|        contacts.address | -     |  -   |  string  | Address                           |
|           contacts.city | -     |  -   |  string  | City                              |
|            contacts.zip | -     |  -   |  string  | Zip                               |
|               club.\_id | +     |  +   | ObjectId | **FK** for **clubs**.\_id         |
|              club.title | -     |  -   |  string  | Current club name                 |
|              team.title | -     |  -   |  string  | Current team name                 |
|            team.uniform | -     |  -   |  number  | Team uniform number               |
|         team.position[] | -     |  -   |  string  | Team positions                    |
|           academics.gpa | -     |  -   |  number  | Athlete's GPA                     |
|           academics.act | -     |  -   | integer  | Athlete's ACT                     |
|           academics.sat | -     |  -   | integer  | Athlete's SAT                     |
| academics.scholarStatus | -     |  -   |  string  | Enum ['Uncommitted', 'Committed'] |
|            school.title | -     |  -   |  string  | School name                       |
|          school.address | -     |  -   |  string  | School address                    |
|             school.city | -     |  -   |  string  | School city                       |
|            school.state | -     |  -   |  string  | School state abbreviation         |
|              school.zip | -     |  -   |  string  | School zip code                   |
|      parents[].relation | -     |  -   |  string  | Enum ['mother', ...]              |
|          parents[].name | -     |  -   |  string  | Parent full name                  |
|         parents[].email | -     |  -   |  string  | Parent email                      |
|         parents[].phone | -     |  -   |  string  | Parent phone                      |
|         physical.height | -     |  -   |  number  | Height                            |
|         physical.weight | -     |  -   |  number  | Weight                            |
|          physical.reach | -     |  -   |  number  | Athlete reach                     |
|       physical.approach | -     |  -   |  number  | Approach                          |
|          physical.block | -     |  -   |  number  | Block                             |
|         physical.handed | -     |  -   |  string  | Enum['R', 'L']                    |
|         social.facebook | -     |  -   |  string  | Facebook URL                      |
|        social.instagram | -     |  -   |  string  | Instagram URL                     |
|          social.twitter | -     |  -   |  string  | Twitter URL                       |
|         social.snapchat | -     |  -   |  string  | Snapchat URL                      |

### Problems

1. Is it possible for the athlete to be in more then one club or team at the same time.
2. Is it necessary to store history about clubs and teams were athlete played or just the last ones.

### Mongo Schema

![Athlete](./scripts/athlete.svg 'Athlete ER diagram')

### Payload Example

```json
{
  "_id": "60ed70c6b324950026d70e5f",
  "updatedAt": "2021-07-13T10:53:58.414Z",
  "mysqlId": 887,
  "name": "Gloria",
  "surname": "Boyer",
  "nick": "Mathilde",
  "graduation": 2004,
  "birthday": "2021-07-13T10:53:58.414Z",
  "contacts": {
    "email": "Fay.Bernhard@hotmail.com",
    "altEmail": "Velva44@gmail.com",
    "recEmail": "Jacey89@hotmail.com",
    "homePhone": "633-798-9474",
    "cellPhone": "544-272-6928",
    "state": "WA",
    "address": "247 Karley View",
    "altAddress": "Apt. 036",
    "city": "Davie",
    "zip": "80824"
  },
  "club": {
    "name": "Krajcik - Grady",
    "director": "Brent Corkery",
    "phone": "792-335-1166",
    "email": "Mazie.Schaefer@yahoo.com",
    "coach": "Wanda Grimes",
    "coachPhone": "823-654-4715",
    "coachEmail": "Lyda_Reichel@hotmail.com",
    "teamAge": "20",
    "teamRank": "Inc",
    "uniform": 15,
    "position": "6",
    "altPosition": "7"
  },
  "academics": {
    "gpa": 153,
    "act": 45,
    "sat": 3,
    "scholarshipStatus": "uncommitted"
  },
  "school": {
    "name": "Hartmann, Mayert and Ledner",
    "address": "Apt. 875",
    "city": "St. Peters",
    "state": "MI",
    "zip": "15540"
  },
  "team": {
    "name": "Stiedemann, Stark and Boyer",
    "uniform": 7,
    "position": "5",
    "altPosition": "12"
  },
  "parents": [
    {
      "relation": "mother",
      "name": "Darin Pagac DVM",
      "email": "Nella36@hotmail.com",
      "phone": "267-397-5856"
    },
    {
      "relation": "mother",
      "name": "Delia Gusikowski",
      "email": "Dannie.Leannon@yahoo.com",
      "phone": "978-769-5785"
    }
  ],
  "physical": {
    "height": 218,
    "weight": 71,
    "reach": 99,
    "approach": 76,
    "block": 157,
    "handed": "L"
  },
  "social": {
    "facebook": "Blaze17",
    "instagram": "Sally32",
    "twitter": "Alison_Jacobson65",
    "snapchat": "Vida_Stamm"
  }
}
```

### Schema

```json
{
  "type": "object",
  "required": ["_id", "updatedAt", "name", "surname", "graduation"],
  "additionalProperties": false,
  "properties": {
    "_id": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "mysqlId": {
      "type": "number"
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
    "nick": {
      "type": "string"
    },
    "graduation": {
      "type": "number"
    },
    "birthday": {
      "type": "string"
    },
    "contacts": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "email": {
          "type": "string"
        },
        "altEmail": {
          "type": "string"
        },
        "recEmail": {
          "type": "string"
        },
        "homePhone": {
          "type": "string"
        },
        "cellPhone": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "address": {
          "type": "string"
        },
        "altAddress": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        }
      }
    },
    "club": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "director": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "coach": {
          "type": "string"
        },
        "coachPhone": {
          "type": "string"
        },
        "coachEmail": {
          "type": "string"
        },
        "teamAge": {
          "type": "string"
        },
        "teamRank": {
          "type": "string"
        },
        "uniform": {
          "type": "number"
        },
        "position": {
          "type": "string"
        },
        "altPosition": {
          "type": "string"
        }
      }
    },
    "academics": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "gpa": {
          "type": "number"
        },
        "act": {
          "type": "number"
        },
        "sat": {
          "type": "number"
        },
        "scholarshipStatus": {
          "enum": ["committed", "uncommitted"]
        }
      }
    },
    "school": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "zip": {
          "type": "string"
        }
      }
    },
    "team": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string"
        },
        "uniform": {
          "type": "number"
        },
        "position": {
          "type": "string"
        },
        "altPosition": {
          "type": "string"
        }
      }
    },
    "parents": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "relation": {
            "enum": [
              "mother",
              "father",
              "stepmother",
              "stepfather",
              "friend of family",
              "guardian"
            ]
          },
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          }
        }
      }
    },
    "physical": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "height": {
          "type": "number"
        },
        "weight": {
          "type": "number"
        },
        "reach": {
          "type": "number"
        },
        "approach": {
          "type": "number"
        },
        "block": {
          "type": "number"
        },
        "handed": {
          "enum": ["R", "L"]
        }
      }
    },
    "social": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "facebook": {
          "type": "string"
        },
        "instagram": {
          "type": "string"
        },
        "twitter": {
          "type": "string"
        },
        "snapchat": {
          "type": "string"
        }
      }
    }
  }
}
```
