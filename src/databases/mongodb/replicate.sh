#!/bin/bash
echo "sleeping for 5 seconds"
sleep 5

echo mongo_setup.sh time now: `date +"%T" `
mongo --host mongo01:27017 <<EOF
  var cfg = {
    "_id": "mongo-cluster",
    "version": 1,
    "members": [
      {
        "_id": 1,
        "host": "mongo01:27017",
        "priority": 2
      },
      {
        "_id": 2,
        "host": "mongo02:27017",
        "priority": 0
      },
      {
        "_id": 3,
        "host": "mongo03:27017",
        "priority": 0
      },
    ]
  };
  rs.initiate(cfg);
EOF