#!/bin/bash

userId="394"

curl -X POST -H "Content-Type: application/json" -H "x-user-id: $userId" -d '{"text":"'"$1"'", "completed": false}' http://localhost:3000/api/todo
