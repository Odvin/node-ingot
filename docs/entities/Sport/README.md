## Sport

[Entities](../README.md).

### Mapping with MySQL data (Mongo:sports <-> MySQL:sports one to many sport_position)

|                MongoDB | MySQL                 | Req. |   Type   | Description                      |
| ---------------------: | :-------------------- | :--: | :------: | :------------------------------- |
|                   \_id | null                  |  +   | ObjectId | Document Id                      |
|                 ncsaId | -                     |  +   | integer  | NCSA sport Id                    |
|                  title | sports.sport          |  +   |  string  | Sport title                      |
|              updatedAt | sports.date_modified  |  +   |   date   | Date of last update              |
|             shortTitle | sports.short          |  +   |  string  | Abbreviation for the sport title |
|                 gender | sports.gender         |  +   |  string  | Enum ['M', 'F']                  |
|              published | sports.published      |  +   | boolean  | True if the sport is published   |
|      positions[].label | sport_position.label  |  +   |  string  | Position label                   |
| positions[].shortLabel | sport_position.abbrev |  +   |  string  | Position short label             |

### Problems

1. In MySQL database sport position has three duplicated fields: _abbrev_, _aliases_, _ncsa_code_. The values in this fields are equal so only one field - _position.shortLabel_ will be used.
2. When we receive information about NCSA user sports there are: canonical sport Id and NCSA sport Id. The questions are: where to get canonical sport id and do we need NCSA sport id?

### Mongo Schema

![Sport](./scripts/sport.svg 'Sport ER diagram')

### Payload Example

```json
{
  "_id": "60ca013077d6b30034d0d45e",
  "ncsaId": 2,
  "title": "Volleyball",
  "updatedAt": "2021-06-18T06:18:55.301Z",
  "shortTitle": "FVB",
  "gender": "F",
  "published": true,
  "positions": [
    {
      "label": "Middle",
      "shortLabel": "MB"
    },
    {
      "label": "Right Side",
      "shortLabel": "RS"
    },
    {
      "label": "Outside",
      "shortLabel": "OH"
    },
    {
      "label": "Setter",
      "shortLabel": "S"
    },
    {
      "label": "Libero",
      "shortLabel": "LB"
    },
    {
      "label": "Defensive Specialist",
      "shortLabel": "DS"
    }
  ]
}
```

### Schema

```json
{
  "type": "object",
  "required": [
    "ncsaId",
    "title",
    "updatedAt",
    "shortTitle",
    "gender",
    "published",
    "positions"
  ],
  "additionalProperties": false,
  "properties": {
    "_id": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "ncsaId": {
      "type": "integer"
    },
    "title": {
      "type": "string"
    },
    "updatedAt": {
      "type": "string"
    },
    "shortTitle": {
      "type": "string"
    },
    "gender": {
      "type": {
        "enum": ["M", "F"]
      }
    },
    "published": {
      "type": "boolean"
    },
    "positions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["label", "shortLabel"],
        "additionalProperties": false,
        "properties": {
          "label": {
            "type": "string"
          },
          "shortLabel": {
            "type": "string"
          }
        }
      }
    }
  }
}
```
