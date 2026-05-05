from playwright.sync_api import sync_playwright
import time

def run_diag():
    with sync_playwright() as p:
        # Launch browser with notification permissions granted
        browser = p.chromium.launch(headless=False) # Headless=False para ver o que acontece se necessário
        context = browser.new_context(
            permissions=['notifications'],
            viewport={'width': 390, 'height': 844},
            is_mobile=True,
        )
        page = context.new_page()
        
        print("--- Iniciando Diagnóstico de Push ---")
        
        # Captura logs do console
        page.on("console", lambda msg: print(f"BROWSER LOG: {msg.text}"))
        page.on("pageerror", lambda err: print(f"BROWSER ERROR: {err}"))

        try:
            # Acessa o app local na porta 8080
            page.goto('http://localhost:8080/app/home')
            page.wait_for_load_state('networkidle')
            
            # Tenta verificar se o Service Worker está registrado
            sw_status = page.evaluate("""
                async () => {
                    if (!('serviceWorker' in navigator)) return 'SW not supported';
                    const regs = await navigator.serviceWorker.getRegistrations();
                    return regs.length > 0 ? 'SW Registered' : 'No SW found';
                }
            """)
            print(f"Status do Service Worker: {sw_status}")

            # Verifica permissão de notificação
            perm = page.evaluate("Notification.permission")
            print(f"Permissão de Notificação: {perm}")

            # Verifica se a VAPID key está sendo lida
            vapid_check = page.evaluate("import.meta.env.VITE_VAPID_PUBLIC_KEY")
            print(f"VAPID Key no Cliente: {vapid_check[:10]}...")

            # Tira um print da tela inicial com o novo design
            page.screenshot(path='artifacts/diag_screenshot.png')
            print("Screenshot salva em artifacts/diag_screenshot.png")

        except Exception as e:
            print(f"Erro durante execução: {e}")
        
        browser.close()

if __name__ == "__main__":
    run_diag()
