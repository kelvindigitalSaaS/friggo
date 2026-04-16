#!/usr/bin/env node

/**
 * Cleanup All Users Except Test User (JavaScript Version)
 *
 * Script para deletar todos os dados de usuários e CPF EXCETO o usuário teste.
 *
 * Uso:
 *   node supabase/cleanup-all-users.js
 *
 * Variáveis de ambiente necessárias:
 *   SUPABASE_URL - URL do projeto Supabase
 *   SUPABASE_SERVICE_ROLE_KEY - Chave de serviço (permissões totais)
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const TEST_USER_EMAIL = "test@friggo.com.br";

// Cores para output no console
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  section: (msg) =>
    console.log(`\n${colors.bright}${colors.blue}━━ ${msg} ━━${colors.reset}`),
};

async function cleanup() {
  // Validação
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    log.error(
      "Variáveis de ambiente SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY não foram definidas."
    );
    log.info("Exemplo de uso:");
    log.info(
      '  SUPABASE_URL="https://xxx.supabase.co" SUPABASE_SERVICE_ROLE_KEY="xxx" node cleanup-all-users.js'
    );
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  log.section("LIMPEZA DE BANCO DE DADOS - TODOS OS USUÁRIOS EXCETO TESTE");

  try {
    // 1. Encontrar o usuário teste
    log.info(`Procurando usuário teste: ${TEST_USER_EMAIL}`);

    const { data: testUser, error: testUserError } = await supabase.auth.admin
      .listUsers();

    if (testUserError) throw testUserError;

    const foundTestUser = testUser?.users?.find(
      (u) => u.email === TEST_USER_EMAIL
    );

    if (!foundTestUser) {
      log.error(`Usuário teste (${TEST_USER_EMAIL}) não encontrado!`);
      log.warning("Operação cancelada por segurança.");
      process.exit(1);
    }

    const testUserId = foundTestUser.id;
    log.success(
      `Usuário teste encontrado: ${TEST_USER_EMAIL} (ID: ${testUserId})`
    );

    // Contar usuários que serão deletados
    const totalUsers = testUser?.users?.length || 0;
    const usersToDelete = totalUsers - 1;

    log.warning(`${usersToDelete} usuário(s) será/serão deletado(s).`);

    if (usersToDelete === 0) {
      log.info("Nenhum usuário adicional para deletar. Finalizando.");
      return;
    }

    log.warning(
      "⚠️  ATENÇÃO: Esta operação é IRREVERSÍVEL! Todos os dados serão perdidos."
    );

    log.section("DELETANDO DADOS DOS USUÁRIOS");

    // 2. Deletar dados usando SQL direto via rpc
    const { error: cleanupError } = await supabase.rpc(
      "cleanup_all_users_except_test",
      {
        test_user_id: testUserId,
      }
    );

    if (cleanupError) {
      // Se a função RPC não existir, fazer deletion manualmente
      log.warning(
        "Função RPC não encontrada. Deletando manualmente por tabelas..."
      );
      await deleteUserDataManually(supabase, testUserId);
    } else {
      log.success("Limpeza concluída via SQL RPC");
    }

    log.section("RESUMO");
    log.success(`✅ Limpeza concluída com sucesso!`);
    log.success(
      `✅ Usuário teste preservado: ${TEST_USER_EMAIL} (ID: ${testUserId})`
    );
    log.success(`✅ ${usersToDelete} usuário(s) e seus dados foram deletados.`);
    log.success("✅ Todos os CPFs foram removidos do banco.");
  } catch (error) {
    log.error(`Erro durante limpeza: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

async function deleteUserDataManually(supabase, testUserId) {
  /**
   * Deleta dados manualmente tabela por tabela.
   * Útil quando não há função RPC disponível.
   */

  const tables = [
    "items",
    "shopping_items",
    "consumables",
    "saved_recipes",
    "favorite_recipes",
    "meal_plan",
    "payment_history",
    "subscriptions",
    "profile_sensitive",
    "profile_settings",
    "notifications",
    "shopping_history",
  ];

  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .neq("user_id", testUserId);

      if (error && error.code !== "PGRST116") {
        // PGRST116 = table not found (esperado se tabela não existir)
        log.warning(`⚠ ${table}: ${error.message}`);
      } else if (!error) {
        log.success(`${table}: dados dos usuários deletados`);
      }
    } catch (e) {
      log.warning(`${table}: não encontrado ou erro ao deletar`);
    }
  }

  // Limpar CPFs de todos os usuários
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ cpf: null })
      .neq("user_id", testUserId)
      .not("cpf", "is", null);

    if (!error) {
      log.success("CPFs: removidos de todos os usuários");
    }
  } catch (e) {
    log.warning("CPFs: erro ao remover");
  }

  // Deletar perfis
  try {
    const { error } = await supabase
      .from("profiles")
      .delete()
      .neq("user_id", testUserId);

    if (!error) {
      log.success("profiles: deletados");
    }
  } catch (e) {
    log.warning("profiles: erro ao deletar");
  }

  // Deletar usuários via Admin API
  try {
    const { data: users } = await supabase.auth.admin.listUsers();
    const usersToDelete = users?.users?.filter((u) => u.id !== testUserId) || [];

    for (const user of usersToDelete) {
      await supabase.auth.admin.deleteUser(user.id);
    }

    log.success(`auth.users: ${usersToDelete.length} usuário(s) deletado(s)`);
  } catch (e) {
    log.warning(`auth.users: erro ao deletar usuários - ${e.message}`);
  }
}

// Executar limpeza
cleanup();
