# Athletes service

## Setup dev environment

1. Contact with team lead to receive sensitive credentials. To set default dev environment create _.env_ file.

   ```
   cp .env.config .env
   ```

2. Install docker compose. Check the version

   ```
   docker-compose -v
   ```

3. Install libraries. Synchronize **Node.JS** version with team members. Do not install packages from the local system use container where API server is running. To install packages execute the command.

   ```
   docker-compose run athletes-api-server npm ci
   ```

4. Setup local mongoDB cluster. Run the command

   ```
   docker compose up mongo01 mongo02 mongo03 mongo-setup
   ```

5. When mongoDB cluster is running use another terminal to create a use and database to work with.

   1. Connect to the container that runs primary replica.

      ```
      docker exec -it mongo01 bash
      ```

   2. Connect to the replica

      ```
      mongo
      ```

   3. Select _admin_ database

      ```
      use admin
      ```

   4. Create the user with permissions. The default values in the command but check _.env_ to be sure that they are correct.

      ```
      db.createUser(
        {
          user: "itRDevUser",
          pwd: "topSecret53!",
          roles: [
            { role: "readWrite", db: "nsca-athletes" }
          ]
        }
      )
      ```

   5. Exit the replica.

      ```
      exit
      ```

   6. Connect to the cluster with new user credentials.

      ```
      mongo -u itRDevUser -p
      ```

   7. Select created database.

      ```
      use nsca-athletes
      ```

   8. Exit from mongo replica

      ```
      exit
      ```

   9. Exit from the container

      ```
      exit
      ```

6. Download and install _Compass_.

7. Set _Compass_ connection string to
   ```
   mongodb://itRDevUser:topSecret53!@localhost:27017
   ```
8. Connect to the cluster from _Compass_ UI.

9. Start the EL cluster

   ```
   docker compose up es01 es02 es03 kib01
   ```

10. Connect to the Kibana in browser with address _localhost:5601_

    1. In the **Management** sections select **Dev Tools**
    2. Check cluster status

       ```
       GET _cluster/health

       GET _cat/nodes?v

       GET _cat/indices?v
       ```

11. Run PostgreSQL Server

    ```
    docker compose up postgres-db
    ```

    1. Connect to the container that runs Postgres

       ```
       docker exec -it athletes-postgres bash
       ```

    2. Create database (inside **athletes-postgres** container)

       ```
       psql -d athletes-db -U itRDevUser < /usr/src/migrations/schema.up.sql
       ```

    3. Connect to the database

       ```
       psql -d athletes-db -U itRDevUser
       ```

12. Run API server. Use another terminal do not close the process in the terminal that runs mongo cluster.
    ```
    docker compose up athletes-api-server
    ```

To stop the possess use _Control-C_ in the terminal.
