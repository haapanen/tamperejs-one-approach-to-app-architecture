#!/bin/bash

curl -X GET -H "Content-Type: application/json" -H "x-user-id: $1"  http://localhost:3000/api/todo
