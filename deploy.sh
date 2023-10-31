#! /bin/bash

set -e

export WEBHOOK_URL="https://discord.com/api/webhooks/1168515563077775430/pGtOucUOUd9Tl0N_qhrtxaMFBCGqyvuM4s-IQvchN560pNZIrisdiHXdoyMDeoRYpJ_z"
export GIT_DIR="./area/.git"

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
USERNAME=$(git config user.name)

curl \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"Deployment Notifier\", \"content\": \"$USERNAME started deploying branch $BRANCH_NAME\"}" \
  $WEBHOOK_URL

eval "$(ssh-agent)" && ssh-add ~/.ssh/id_rsa
tar --exclude='node_modules' -czf area.tar.gz ./area
scp area.tar.gz root@area.baragouin.fr:/root/dev
ssh root@area.baragouin.fr 'cd /root/dev/ && tar -xzf area.tar.gz && cd area && docker-compose up -d --build front back'

curl \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"Deployment Notifier\", \"content\": \"Deployment finished for branch $BRANCH_NAME\"}" \
  $WEBHOOK_URL
