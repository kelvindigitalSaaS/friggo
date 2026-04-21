from playwright.sync_api import sync_playwright
import time

def run_auth_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        url = "http://localhost:8080/auth"
        print(f"--- INICIANDO TESTE DE AUTENTICAÇÃO EM {url} ---")
        
        try:
            page.goto(url)
            page.wait_for_load_state('networkidle')
            
            # --- TESTE 1: Login com falha ---
            print("[TESTE 1] Tentando Login...")
            page.click("text=Entrar com email")
            
            # Espera o input aparecer (animação)
            page.wait_for_selector("input[type='email']", timeout=5000)
            page.fill("input[type='email']", "teste_falha@kaza.app")
            page.fill("input[type='password']", "senha_errada")
            page.click("button:has-text('Entrar')")
            
            page.wait_for_timeout(2000)
            print("Login processado.")
            
            # --- TESTE 2: Registro com falha 422 ---
            print("\n[TESTE 2] Tentando Registro...")
            # Volta para o início
            page.goto(url)
            page.wait_for_load_state('networkidle')
            page.click("text=Criar conta grátis")
            
            page.wait_for_selector("input[type='email']", timeout=5000)
            page.fill("input[type='email']", "novo_teste@kaza.app")
            # Procura por inputs de senha (pode haver mais de um no registro)
            passwords = page.locator("input[type='password']").all()
            if len(passwords) >= 2:
                passwords[0].fill("123456")
                passwords[1].fill("123456")
            
            page.click("button:has-text('Criar conta')")
            
            page.wait_for_timeout(3000)
            print("Registro processado.")
            
            page.screenshot(path="auth_test_result.png")
            print("\nScreenshot salva em auth_test_result.png")

        except Exception as e:
            print(f"Erro durante o teste: {str(e)}")
        finally:
            browser.close()
            print("--- TESTE DE AUTENTICAÇÃO FINALIZADO ---")

if __name__ == "__main__":
    run_auth_test()
