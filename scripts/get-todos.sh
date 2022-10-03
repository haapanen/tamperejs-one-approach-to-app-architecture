#!/bin/bash

baseUrl="${2:-http://localhost:3000}"

curl -X GET -H "Content-Type: application/json" -H "x-user-id: $1" $baseUrl/api/todo
