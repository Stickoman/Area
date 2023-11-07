#! /bin/bash

export GIT_DIR=".git"
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

echo "=========[SSH ACCESS]========="

if [ -f ~/.ssh/id_ed25519 ]; then
  eval "$(ssh-agent)" && ssh-add ~/.ssh/id_ed25519
elif [ -f ~/.ssh/id_rsa ]; then
  eval "$(ssh-agent)" && ssh-add ~/.ssh/id_rsa
else
  echo "No supported SSH keys found (neither Ed25519 nor RSA)."
  exit 1
fi

echo "=========[BUILD IMAGES]========="

docker build -t baragouin/area-frontend front
docker build -t baragouin/area-backend back

echo "=========[PUSH IMAGES]========="

docker push baragouin/area-frontend:latest
docker push baragouin/area-backend:latest
docker push baragouin/area-mobile:latest

echo "=========[SERVER UPDATE]========="

scp docker-compose.yml root@area.baragouin.fr:/root/dev
ssh root@area.baragouin.fr 'cd /root/dev/ && docker-compose down && docker-compose pull && docker-compose up -d'

curl \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"Deployment Notifier\", \"content\": \"Deployment finished for branch $BRANCH_NAME\"}" \
  $WEBHOOK_URL

echo "Done."
