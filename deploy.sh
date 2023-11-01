#! /bin/bash

export GIT_DIR="./area/.git"

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
USERNAME=$(git config user.name)

WEBHOOK_URL="https://discord.com/api/webhooks/1168515563077775430/pGtOucUOUd9Tl0N_qhrtxaMFBCGqyvuM4s-IQvchN560pNZIrisdiHXdoyMDeoRYpJ_z"

handle_error() {
  local exit_code="$?"
  echo "Error occurred in the script at line $BASH_LINENO, exit code: $exit_code"
  curl \
    -H "Content-Type: application/json" \
    -d "{\"username\": \"Deployment Notifier\", \"content\": \"Deployment failed for branch $BRANCH_NAME\"}" \
    $WEBHOOK_URL
  exit $exit_code
}

# Set up the custom error handler
trap 'handle_error' ERR

set -e

curl \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"Deployment Notifier\", \"content\": \"$USERNAME started deploying branch $BRANCH_NAME\"}" \
  $WEBHOOK_URL

if [ -f ~/.ssh/id_ed25519 ]; then
    eval "$(ssh-agent)" && ssh-add ~/.ssh/id_ed25519
else
    if [ -f ~/.ssh/id_rsa ]; then
        eval "$(ssh-agent)" && ssh-add ~/.ssh/id_rsa
    else
        echo "No supported SSH keys found (neither Ed25519 nor RSA)."
        exit 1
    fi
fi

tar --exclude='node_modules' -czf area.tar.gz ./area
scp area.tar.gz root@area.baragouin.fr:/root/dev
ssh root@area.baragouin.fr 'cd /root/dev/ && tar -xzf area.tar.gz && cd area && docker-compose up -d --build front back'

curl \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"Deployment Notifier\", \"content\": \"Deployment finished for branch $BRANCH_NAME\"}" \
  $WEBHOOK_URL
