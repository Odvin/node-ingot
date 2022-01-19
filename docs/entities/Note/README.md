## Notes

[Entities](../README.md).

### Mapping with mysql data (Mongo:coaches <-> MySQL:?)

|   MongoDB | MySQL | Req. |   Type   | Description                  |
| --------: | :---- | :--: | :------: | :--------------------------- |
|      \_id | null  |  +   | ObjectId | Document Id                  |
| athleteId | -     |  +   | ObjectId | **FK** for **athletes**.\_id |
|   coachId | -     |  +   | ObjectId | **FK** for **coaches**.\_id  |
|   mysqlId | -     |  -   | integer  | MySQL Id                     |
| updatedAt | -     |  +   |   date   | Date of last update          |
|    pinned | -     |  +   | boolean  | True if pinned               |
|      text | -     |  +   |  string  | Note text                    |

### Problems

1. ...

### Mongo Schema

### Payload Example

```json
{
  "_id": "60ca013077d6b30034d0d45e",
  "athleteId": "60ca013088d6b30034d0d45e",
  "coachId": "40ca013088d6b30034d0d45e",
  "mysqlId": 1,
  "updatedAt": "2021-06-18T06:18:55.301Z",
  "pinned": false,
  "text": "Recommendation to contact with the athlete"
}
```

### Schema

```json
{
  "type": "object",
  "required": [
    "_id",
    "athleteId",
    "coachId",
    "updatedAt",
    "pinned",
    "text"
  ],
  "additionalProperties": false,
  "properties": {
    "_id": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "athleteId": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "coachId": {
      "type": "string",
      "pattern": "^[a-fA-F0-9]{24}$"
    },
    "mysqlId": {
      "type": "number"
    },
    "updatedAt": {
      "type": "string"
    },
    "pinned": {
      "type": "boolean"
    },
    "text": {
      "type": "string"
    }
  }
}
```