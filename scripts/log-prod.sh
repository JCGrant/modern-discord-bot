#!/bin/bash

# Import env vars from .env
set -o allexport
source .env set
set +o allexport

endpoint="$DEPLOY_URL"
echo "Logging $endpoint"
ssh $endpoint "pm2 log --raw" | pino-pretty -i pid,hostname -t "yyyy-mm-dd HH:MM:ss"