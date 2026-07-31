#!/bin/bash
set -e

npx pnpm@10 install --no-frozen-lockfile

export PORT=10000
export BASE_PATH=/
export NODE_ENV=production

npx --yes pnpm@10 --filter @workspace/talentos run build
npx --yes pnpm@10 --filter @workspace/api-server run build
