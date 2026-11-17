#!/bin/bash
fuser -k 3000/tcp 3001/tcp >/dev/null 2>&1
rm -f /workspaces/prototipo-mapa-ambiental/.next/dev/lock
echo "🚀 Iniciando Backend (3001) e Frontend (3000)..."
trap 'kill 0' SIGINT
(cd /workspaces/backend-api && npm run dev) &
(cd /workspaces/prototipo-mapa-ambiental && npm run dev) &
wait
