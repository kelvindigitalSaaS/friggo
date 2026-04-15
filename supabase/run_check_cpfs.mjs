import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

async function loadEnv(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const lines = content.split(/\r?\n/);
    const env = {};
    for (const line of lines) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(.*))\s*$/);
      if (m) {
        env[m[1]] = m[2] ?? m[3] ?? m[4] ?? '';
      }
    }
    return env;
  } catch (err) {
    return {};
  }
}

async function run() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envPath = path.resolve(__dirname, '../.env');
  const env = await loadEnv(envPath);

  const SUPABASE_URL = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Faltando VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY em .env');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false }
  });

  try {
    console.log('Executando queries...');

    const a = await supabase.from('profile_sensitive').select('id', { count: 'exact', head: true }).neq('cpf', null);
    console.log('profile_sensitive_cpfs_not_null:', a.count ?? a.error?.message ?? null);

    const b = await supabase.from('profile_sensitive').select('id', { count: 'exact', head: true });
    console.log('profile_sensitive_total:', b.count ?? b.error?.message ?? null);

    const c = await supabase.from('profile_sensitive_backup').select('id', { count: 'exact', head: true });
    console.log('profile_sensitive_backup_total:', c.count ?? c.error?.message ?? null);

    // profiles table cpf check
    const p = await supabase.from('profiles').select('id', { count: 'exact', head: true }).neq('cpf', null);
    if (p.error) {
      const msg = String(p.error.message || p.error);
      if (msg.toLowerCase().includes('column') || msg.toLowerCase().includes('does not exist')) {
        console.log('profiles table or cpf column not present');
      } else {
        console.log('profiles query error:', msg);
      }
    } else {
      console.log('profiles_cpfs_not_null:', p.count ?? null);
    }
  } catch (err) {
    console.error('Erro ao executar queries:', err?.message || err);
    process.exit(1);
  }
}

run();
