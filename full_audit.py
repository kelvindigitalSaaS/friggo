import os
import time
import json
from playwright.sync_api import sync_playwright

# --- CONFIGURAÇÃO ---
BASE_URL = "http://localhost:8080"
TIMEOUT = 30000 # 30s

def run_suite():
    print("\n--- INICIANDO AUDITORIA TOTAL: KAZA APP ---")
    print(f"Alvo: {BASE_URL}")
    print("-" * 50)

    # ... (rest of configuration)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1"
        )
        page = context.new_page()

        try:
            # 1. TESTE DE PERFORMANCE & CARREGAMENTO (SHELL)
            print("[1/5] Testando App Shell e Performance...")
            start_time = time.now() if hasattr(time, 'now') else time.time()
            page.goto(BASE_URL)
            page.wait_for_load_state('networkidle')
            load_time = time.time() - start_time
            print(f"OK: App carregado em {load_time:.2f}s")

            # 2. TESTE DE GOOGLE AUTH CALLBACK (REDIRECIONAMENTO)
            print("\n[2/5] Testando Fluxo Google Auth (Redirecionamento)...")
            # Procura o botão de Google pelo texto ou ícone
            google_btn = page.locator("button:has-text('Google')")
            if google_btn.is_visible():
                print("Botao Google encontrado. Testando clique...")
                google_btn.click()
                # Espera o redirecionamento para o Supabase Auth
                page.wait_for_timeout(3000)
                if "supabase.co/auth" in page.url or "accounts.google.com" in page.url:
                    print("OK: Clique no Google redireciona corretamente para o provedor de Auth.")
                else:
                    print(f"Aviso: Redirecionamento inesperado para {page.url}")
            else:
                print("Aviso: Botao Google nao encontrado na landing page.")

            # 3. TESTE DE BLINDAGEM DE ROTAS (AUTH GUARD)
            print("\n[3/5] Testando Blindagem de Rotas (Auth Guard)...")
            page.goto(f"{BASE_URL}/app/home")
            page.wait_for_url("**/auth", timeout=10000)
            print("OK: Tentativa de acesso bloqueada e redirecionada para /auth")

            # 4. TESTE DE SEGURANÇA (ZERO LEAKAGE - RLS)
            print("\n[4/5] Testando Zero Leakage (RLS Tables)...")
            leak_check = page.evaluate("""async () => {
                const { supabase } = await import('/src/integrations/supabase/client.ts');
                const tables = ['profiles', 'homes', 'items', 'profiles_backup'];
                const results = [];
                for (const table of tables) {
                    try {
                        const { data, error } = await supabase.from(table).select('*').limit(1);
                        results.push({ table, leaked: data && data.length > 0, error: error?.message || 'None' });
                    } catch (e) { results.push({ table, leaked: false, error: e.message }); }
                }
                return results;
            }""")
            for res in leak_check:
                status = "PROTEGIDO" if not res['leaked'] else "VAZAMENTO"
                print(f"{status}: Tabela '{res['table']}' (Erro: {res['error']})")

            # 5. TESTE DE RPC (ATOMIC ONBOARDING)
            print("\n[5/5] Testando Blindagem da RPC (Onboarding Atomico)...")
            rpc_check = page.evaluate("""async () => {
                const { supabase } = await import('/src/integrations/supabase/client.ts');
                const { error } = await supabase.rpc('complete_user_onboarding', {
                    p_home_name: 'Audit', p_user_name: 'Auditor', p_user_cpf: '000.000.000-00'
                });
                return { success: !error, error: error?.message || 'None' };
            }""")
            if rpc_check['success']: print("FALHA: RPC permitiu execucao anonima!")
            else: print(f"OK: RPC bloqueada com erro: {rpc_check['error']}")

        except Exception as e:
            print(f"\nERRO NA SUITE: {str(e)}")
        finally:
            page.screenshot(path="full_audit_screenshot.png")
            browser.close()
            print("-" * 50)
            print("AUDITORIA FINALIZADA")

if __name__ == "__main__":
    run_suite()
