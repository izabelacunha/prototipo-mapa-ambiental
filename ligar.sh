#!/bin/bash
echo "🚀 Iniciando Backend (3001) e Frontend (3000)..."
trap 'kill 0' SIGINT
(cd /workspaces/backend-api && npm run dev) &
(cd /workspaces/prototipo-mapa-ambiental && npm run dev) &
wait
