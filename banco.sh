#!/bin/bash
cd /workspaces/backend-api

case "$1" in
  listar)
    node -e '
      const { DatabaseSync } = require("node:sqlite");
      const db = new DatabaseSync("./data/database.sqlite");
      console.log("\n=== TABELAS DO BANCO ===");
      console.table(db.prepare("SELECT name FROM sqlite_master WHERE type = \x27table\x27").all());
      console.log("\n=== SETORES CADASTRADOS ===");
      console.table(db.prepare("SELECT id, nome, tipo, top, left, icon FROM setores").all());
      console.log("\n=== RELATOS CADASTRADOS ===");
      console.table(db.prepare("SELECT id, titulo, local, status FROM relatos").all());
    '
    ;;
  add-setor)
    node -e '
      const { DatabaseSync } = require("node:sqlite");
      const db = new DatabaseSync("./data/database.sqlite");
      const [nome, tipo, top, left, icon, desc] = process.argv.slice(1);
      if (!nome) {
        console.log("Uso: ./banco.sh add-setor \"Nome\" \"Tipo\" \"50%\" \"50%\" \"📍\" \"Descricao\"");
        process.exit(1);
      }
      db.prepare("INSERT INTO setores (nome, tipo, top, left, icon, desc) VALUES (?, ?, ?, ?, ?, ?)")
        .run(nome, tipo || "Setor", top || "50%", left || "50%", icon || "📍", desc || "Novo setor adicionado.");
      console.log("✅ Setor \"" + nome + "\" adicionado ao SQLite com sucesso!");
    ' "$2" "$3" "$4" "$5" "$6" "$7"
    ;;
  remover-setor)
    node -e '
      const { DatabaseSync } = require("node:sqlite");
      const db = new DatabaseSync("./data/database.sqlite");
      db.prepare("DELETE FROM setores WHERE nome = ?").run(process.argv[1]);
      console.log("🗑️ Setor \"" + process.argv[1] + "\" removido do SQLite!");
    ' "$2"
    ;;
  *)
    echo "Comandos disponíveis:"
    echo "  ./banco.sh listar"
    echo "  ./banco.sh add-setor \"Nome\" \"Tipo\" \"top%\" \"left%\" \"emoji\" \"Descrição\""
    echo "  ./banco.sh remover-setor \"Nome\""
    ;;
esac
