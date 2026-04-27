import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('receitas').select('*').limit(1);
  console.log('receitas table:', data ? 'EXISTS' : 'ERROR', error);

  const { data: data2, error: error2 } = await supabase.from('recipes').select('*').limit(1);
  console.log('recipes table:', data2 ? 'EXISTS' : 'ERROR', error2);
}

check();
