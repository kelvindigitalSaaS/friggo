#!/usr/bin/env node

/**
 * Script para inserir 5000 receitas no Supabase via Node.js
 *
 * Uso:
 *   npx node insert_recipes.js <supabase_url> <service_role_key> <recipes_json_file>
 *
 * Exemplo:
 *   npx node insert_recipes.js \
 *     https://nrfketkwajzkmrlkvoyd.supabase.co \
 *     "sua-service-role-key-aqui" \
 *     src/receitas_5000.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function insertRecipes(supabaseUrl, serviceRoleKey, recipesFile, batchSize = 100) {
  // Validar arquivo
  if (!fs.existsSync(recipesFile)) {
    console.error(`❌ Arquivo não encontrado: ${recipesFile}`);
    return false;
  }

  // Carregar JSON
  console.log(`📖 Carregando receitas de ${recipesFile}...`);
  let recipes;
  try {
    const data = fs.readFileSync(recipesFile, "utf-8");
    recipes = JSON.parse(data);
  } catch (err) {
    console.error(`❌ Erro ao decodificar JSON: ${err.message}`);
    return false;
  }

  if (!Array.isArray(recipes)) {
    console.error("❌ JSON deve ser um array de receitas");
    return false;
  }

  console.log(`✅ ${recipes.length} receitas carregadas`);

  // Preparar URL
  const restUrl = `${supabaseUrl}/rest/v1/recipes`;

  const headers = {
    Authorization: `Bearer ${serviceRoleKey}`,
    apikey: serviceRoleKey,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  // Transformar receitas: remover 'id' e manter 'recipe_id'
  const transformedRecipes = recipes.map(recipe => {
    const { id, ...rest } = recipe;
    return {
      recipe_id: id || rest.recipe_id,
      ...rest
    };
  });

  // Inserir em lotes
  console.log(`\n🔄 Inserindo ${transformedRecipes.length} receitas em lotes de ${batchSize}...\n`);

  let totalInserted = 0;
  let totalErrors = 0;

  for (let i = 0; i < transformedRecipes.length; i += batchSize) {
    const batch = transformedRecipes.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(recipes.length / batchSize);

    try {
      const response = await fetch(restUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(batch),
      });

      if (response.status === 201 || response.status === 204) {
        totalInserted += batch.length;
        console.log(
          `  ✅ Lote ${batchNum}/${totalBatches}: ${batch.length} receitas inseridas (${totalInserted}/${recipes.length})`
        );
      } else {
        const errorText = await response.text();
        const errorMsg = errorText || `HTTP ${response.status}`;
        console.error(`  ❌ Lote ${batchNum}/${totalBatches}: Erro - ${errorMsg}`);
        totalErrors += batch.length;
      }
    } catch (err) {
      console.error(`  ❌ Lote ${batchNum}/${totalBatches}: ${err.message}`);
      totalErrors += batch.length;
    }
  }

  // Resumo
  console.log(`\n${"=".repeat(50)}`);
  console.log(`📊 Resumo:`);
  console.log(`  Total de receitas: ${recipes.length}`);
  console.log(`  Inseridas: ${totalInserted}`);
  console.log(`  Erros: ${totalErrors}`);
  console.log(`${"=".repeat(50)}`);

  if (totalInserted === recipes.length) {
    console.log(`\n✅ Sucesso! Todas as ${totalInserted} receitas foram inseridas.`);
    return true;
  } else if (totalInserted > 0) {
    console.log(`\n⚠️  Inserção parcial: ${totalInserted}/${recipes.length} receitas.`);
    console.log("   Tente novamente para as receitas faltantes.");
    return false;
  } else {
    console.log(`\n❌ Falha na inserção. Nenhuma receita foi inserida.`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log(`
Script para inserir 5000 receitas no Supabase.

Uso:
  npx node insert_recipes.js <supabase_url> <service_role_key> <recipes_json_file>

Exemplo:
  npx node insert_recipes.js \\
    https://nrfketkwajzkmrlkvoyd.supabase.co \\
    "sua-service-role-key-aqui" \\
    src/receitas_5000.json
    `);
    process.exit(1);
  }

  const supabaseUrl = args[0];
  const serviceRoleKey = args[1];
  const recipesFile = args[2];

  // Validar inputs
  if (!supabaseUrl.startsWith("https://")) {
    console.error("❌ URL do Supabase deve começar com https://");
    process.exit(1);
  }

  if (serviceRoleKey.length < 20) {
    console.error("❌ Service Role Key parece inválida (muito curta)");
    process.exit(1);
  }

  const success = await insertRecipes(supabaseUrl, serviceRoleKey, recipesFile);
  process.exit(success ? 0 : 1);
}

main().catch((err) => {
  console.error(`❌ Erro fatal: ${err.message}`);
  process.exit(1);
});
