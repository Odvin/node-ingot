## Clubs

[Entities](../README.md).

### Document schema (Mongo collection: clubs)

|         MongoDB | Index | Req. |   Type   | Description                |
| --------------: | :---- | :--: | :------: | :------------------------- |
|            \_id | +     |  +   | ObjectId | Document Id                |
|          extIdA | -     |  -   | integer  | External (MySQL) Id        |
|       updatedAt | -     |  +   |   date   | Date of last update        |
|            name | -     |  +   |  string  | Club name                  |
|        director | -     |  -   |  string  | Club director name         |
|           phone | -     |  -   |  string  | Club phone                 |
|           email | -     |  -   |  string  | Club email                 |
|          webUrl | -     |  -   |  string  | Club web page              |
|    teams[].name | -     |  -   |  string  | Club team name             |
| teams[].sportId | -     |  +   | ObjectId | **FK** for **sports**.\_id |
|   teams[].coach | -     |  -   |  string  | Team coach name            |
|   teams[].phone | -     |  -   |  string  | Team coach phone           |
|   teams[].email | -     |  -   |  string  | Team coach email           |
|  teams[].webUrl | -     |  -   |  string  | Team web page              |

### Mongo Schema

![Club](./scripts/club.svg 'Club ER diagram')
