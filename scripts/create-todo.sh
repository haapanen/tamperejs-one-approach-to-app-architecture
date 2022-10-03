#!/bin/bash

baseUrl="${2:-http://localhost:3000}"
userId="394"

curl -X POST -H "Content-Type: application/json" -H "x-user-id: $userId" -d '{"text":"'"$1"'", "completed": false}' $baseUrl/api/todo
