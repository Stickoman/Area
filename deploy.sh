#! /bin/bash

eval "$(ssh-agent)" && ssh-add ~/.ssh/id_ed25519
tar --exclude='node_modules' -czf area.tar.gz ./area
scp area.tar.gz root@area.baragouin.fr:/root/dev
ssh root@area.baragouin.fr 'cd /root/dev/ && tar -xzf area.tar.gz && cd area && docker-compose up -d --build front back'
