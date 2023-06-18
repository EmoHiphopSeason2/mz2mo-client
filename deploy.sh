#!/bin/bash
REPOSITORY=/home/ubuntu/mzo-deploy
cd $REPOSITORY

sudo pnpm install # 의존성 파일 설치
sudo -E npx pm2 reload  # pm2 reload로 변경사항 적용