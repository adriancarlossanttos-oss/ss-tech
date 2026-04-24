"""
Script: adicionar_ativo.py
Função: Adiciona o campo "ativo": true em todos os produtos do produtos.json
        que ainda não possuem esse campo.

Como usar:
    1. Coloque este script na mesma pasta do seu produtos.json
    2. Rode: python adicionar_ativo.py
    3. Um backup será salvo em produtos_backup.json antes de qualquer alteração
"""

import json
import shutil
import os

ARQUIVO = "produtos.json"
BACKUP  = "produtos_backup.json"

def main():
    if not os.path.exists(ARQUIVO):
        print(f"❌ Arquivo '{ARQUIVO}' não encontrado. Rode o script na mesma pasta do arquivo.")
        return

    # Backup antes de alterar
    shutil.copy(ARQUIVO, BACKUP)
    print(f"✅ Backup salvo em '{BACKUP}'")

    with open(ARQUIVO, "r", encoding="utf-8") as f:
        produtos = json.load(f)

    alterados = 0
    for produto in produtos:
        if "ativo" not in produto:
            produto["ativo"] = True
            alterados += 1

    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump(produtos, f, ensure_ascii=False, indent=2)

    print(f"✅ Campo 'ativo' adicionado em {alterados} produto(s).")
    print(f"📋 Total de produtos: {len(produtos)}")
    print()
    print("Agora você pode editar o produtos.json e setar:")
    print('   "ativo": false   → produto some do site')
    print('   "ativo": true    → produto aparece no site')

if __name__ == "__main__":
    main()