## Events

[Entities](../README.md).

### Document schema (Mongo collection: events)

|   MongoDB | Index | Req. |   Type   | Description          |
| --------: | :---- | :--: | :------: | :------------------- |
|      \_id | +     |  +   | ObjectId | Document Id          |
|    extIdA | -     |  -   | integer  | External (MySQL) Id  |
| updatedAt | -     |  +   |   date   | Date of last update  |
|      name | -     |  +   |  string  | Event name           |
|   started | -     |  -   |   date   | When the event stats |
|     ended | -     |  -   |   date   | When the event ends  |

### Problems

1. Need more information;
2. An event must contain information about clubs, teams and involved athletes;
3. It is important to analyse information that the providers give to upload;
