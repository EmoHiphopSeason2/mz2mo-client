#!/bin/bash
REPOSITORY=/home/ubuntu/mzo-deploy
cd $REPOSITORY

sudo pnpm install
sudo -E npx pm2 reload