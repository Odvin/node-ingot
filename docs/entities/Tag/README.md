## Tag

[Entities](../README.md).

### Mapping with MySQL data (Mongo:tags <-> MySQL:college_tag )

|     MongoDB | MySQL              | Req. |   Type   | Description                            |
| ----------: | :----------------- | :--: | :------: | :------------------------------------- |
|        \_id | -                  |  +   | ObjectId | Document Id                            |
|   collegeId | college_tag_id     |  +   | ObjectId | **FK** for **colleges**.\_id           |
|     sportId | college_program_id |  +   | ObjectId | **FK** for **sports**.\_id             |
|     coachId | -                  |  +   | ObjectId | **FK** for **coaches**.\_id            |
|       title | title              |  +   |  string  | Tag name                               |
| description | description        |  -   |  string  | Tag description                        |
|   updatedAt | date_modified      |  +   |   date   | Date of last update                    |
|    archived | -                  |  +   | boolean  | While true cannot be set to an athlete |
|       color | color              |  +   |  string  | Hex color                              |
|        icon | icon               |  +   |  string  | Icon title                             |
|        kind | primary            |  +   |  string  | Enum ['primary', 'regular']            |
|    position | sort_order         |  +   |  number  | Display position                       |
|     private | -                  |  +   | boolean  | If a coach personal only               |

### Problems

1. There is no coachId for the gag in MySQL so it will not be possible to connect old tags with coaches.

### Mongo Schema

![Tag](./scripts/tag.svg 'Tag ER diagram')

### Payload Example

```json
{
  "_id": "60ca013077d6b30034d0d45e",
  "collegeId": "60ca013088d6b30034d0d45e",
  "sportId": "30ca013088d6b30034d0d45e",
  "coachId": "40ca013088d6b30034d0d45e",
  "title": "Recommended",
  "description": "Recommendation to contact with the athlete",
  "updatedAt": "2021-06-18T06:18:55.301Z",
  "archived": false,
  "color": "#468ee5",
  "icon": "envelope",
  "kind": "regular",
  "private": false
}
```

### Schema

```json
{
  "type": "object",
  "required": [
    "_id",
    "collegeId",
    "sportId",
    "coachId",
    "title",
    "updatedAt",
    "archived",
    "color",
    "icon",
    "kind",
    "private"
  ],
  "additionalProperties": false,
  "properties": {
    "_id": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "collegeId": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "sportId": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "coachId": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "updatedAt": {
      "type": "string"
    },
    "archived": {
      "type": "boolean"
    },
    "kind": {
      "enum": ["primary", "regular"]
    },
    "private": {
      "type": "boolean"
    },
    "color": {
      "type": "string"
    },
    "icon": {
      "type": "string"
    },
    "position": {
      "type": "number"
    }
  }
}
```
