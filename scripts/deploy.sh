#!/bin/bash

# Import env vars from .env
set -o allexport
source .env set
set +o allexport

echo "Deploying commands"
node ./src/deploy-commands.js

endpoint="$DEPLOY_URL:$DEPLOY_DIRECTORY"
echo "Deploying to $endpoint"
scp -r src package.json package-lock.json $endpoint
ssh $DEPLOY_URL "cd $DEPLOY_DIRECTORY && npm ci"
