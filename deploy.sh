#! /bin/bash

export WEBHOOK_URL="https://discord.com/api/webhooks/1168515563077775430/pGtOucUOUd9Tl0N_qhrtxaMFBCGqyvuM4s-IQvchN560pNZIrisdiHXdoyMDeoRYpJ_z"

curl \
  -H "Content-Type: application/json" \
  -d '{"username": "Deployment Notifier", "content": "Someone started deploying application"}' \
  $WEBHOOK_URL

eval "$(ssh-agent)" && ssh-add ~/.ssh/id_ed25519
tar --exclude='node_modules' -czf area.tar.gz ./area
scp area.tar.gz root@area.baragouin.fr:/root/dev
ssh root@area.baragouin.fr 'cd /root/dev/ && tar -xzf area.tar.gz && cd area && docker-compose up -d --build front back'

curl \
  -H "Content-Type: application/json" \
  -d '{"username": "Deployment Notifier", "content": "Deployment finished!"}' \
  $WEBHOOK_URL
