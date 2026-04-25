#!/usr/bin/env python3
"""
Script para inserir 5000 receitas no Supabase.

Uso:
  python3 insert_recipes.py <supabase_url> <service_role_key> <recipes_json_file>

Exemplo:
  python3 insert_recipes.py \
    https://nrfketkwajzkmrlkvoyd.supabase.co \
    "sua-service-role-key-aqui" \
    src/receitas_5000.json
"""

import json
import sys
import os
from typing import Optional
import requests

def insert_recipes(
    supabase_url: str,
    service_role_key: str,
    recipes_file: str,
    batch_size: int = 100
) -> bool:
    """Inserir receitas em lotes no Supabase."""

    print(f"📖 Carregando receitas de {recipes_file}...")

    # Validar arquivo
    if not os.path.exists(recipes_file):
        print(f"❌ Arquivo não encontrado: {recipes_file}")
        return False

    # Carregar JSON
    try:
        with open(recipes_file, "r", encoding="utf-8") as f:
            recipes = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Erro ao decodificar JSON: {e}")
        return False
    except Exception as e:
        print(f"❌ Erro ao ler arquivo: {e}")
        return False

    if not isinstance(recipes, list):
        print("❌ JSON deve ser um array de receitas")
        return False

    print(f"✅ {len(recipes)} receitas carregadas")

    # Preparar URL
    rest_url = f"{supabase_url}/rest/v1/recipes"

    headers = {
        "Authorization": f"Bearer {service_role_key}",
        "apikey": service_role_key,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",  # Não retorna dados, apenas status
    }

    # Inserir em lotes
    print(f"\n🔄 Inserindo {len(recipes)} receitas em lotes de {batch_size}...")

    total_inserted = 0
    total_errors = 0

    for i in range(0, len(recipes), batch_size):
        batch = recipes[i : i + batch_size]
        batch_num = i // batch_size + 1
        total_batches = (len(recipes) + batch_size - 1) // batch_size

        try:
            response = requests.post(
                rest_url,
                json=batch,
                headers=headers,
                timeout=30
            )

            if response.status_code in (201, 204):
                total_inserted += len(batch)
                print(f"  ✅ Lote {batch_num}/{total_batches}: {len(batch)} receitas inseridas ({total_inserted}/{len(recipes)})")
            else:
                error_msg = response.text or f"HTTP {response.status_code}"
                print(f"  ❌ Lote {batch_num}/{total_batches}: Erro - {error_msg}")
                total_errors += len(batch)

        except requests.exceptions.Timeout:
            print(f"  ❌ Lote {batch_num}/{total_batches}: Timeout")
            total_errors += len(batch)
        except Exception as e:
            print(f"  ❌ Lote {batch_num}/{total_batches}: {str(e)}")
            total_errors += len(batch)

    # Resumo
    print(f"\n{'='*50}")
    print(f"📊 Resumo:")
    print(f"  Total de receitas: {len(recipes)}")
    print(f"  Inseridas: {total_inserted}")
    print(f"  Erros: {total_errors}")
    print(f"{'='*50}")

    if total_inserted == len(recipes):
        print(f"\n✅ Sucesso! Todas as {total_inserted} receitas foram inseridas.")
        return True
    elif total_inserted > 0:
        print(f"\n⚠️  Inserção parcial: {total_inserted}/{len(recipes)} receitas.")
        print("   Tente novamente para as receitas faltantes.")
        return False
    else:
        print(f"\n❌ Falha na inserção. Nenhuma receita foi inserida.")
        return False

def main():
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)

    supabase_url = sys.argv[1]
    service_role_key = sys.argv[2]
    recipes_file = sys.argv[3]

    # Validar inputs
    if not supabase_url.startswith("https://"):
        print("❌ URL do Supabase deve começar com https://")
        sys.exit(1)

    if len(service_role_key) < 20:
        print("❌ Service Role Key parece inválida (muito curta)")
        sys.exit(1)

    success = insert_recipes(supabase_url, service_role_key, recipes_file)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
