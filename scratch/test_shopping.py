from playwright.sync_api import sync_playwright
import time

def test_shopping_list():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Usando um viewport mobile já que o PWA é mobile-first
        context = browser.new_context(viewport={'width': 390, 'height': 844})
        page = context.new_page()
        
        print("Navegando para o app...")
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')
        
        # Tenta ir para a aba de compras
        print("Acessando aba de compras...")
        shopping_tab = page.locator('button:has-text("Compras"), [aria-label="Compras"]')
        if shopping_tab.count() > 0:
            shopping_tab.first.click()
            page.wait_for_timeout(1000)
        
        # 1. Testar Adição de Item Manual
        print("Testando adição de item manual...")
        input_item = page.locator('input[placeholder*="Adicionar item"]')
        if input_item.count() > 0:
            input_item.fill("Papel Toalha")
            page.keyboard.press("Enter")
            page.wait_for_timeout(500)
            print("Item 'Papel Toalha' adicionado.")
        else:
            print("ERRO: Campo de input não encontrado.")

        # 2. Verificar se o item apareceu na lista
        print("Verificando item na lista...")
        item_row = page.locator('text=Papel Toalha')
        if item_row.count() > 0:
            print("SUCESSO: Item encontrado na lista.")
        else:
            print("ERRO: Item não apareceu na lista.")
            page.screenshot(path='artifacts/shopping_test_error.png')

        # 3. Testar botão de sugestões
        print("Verificando botão de sugestões inteligentes...")
        smart_btn = page.locator('text=Gerar sugestões para hoje')
        if smart_btn.count() > 0:
            print("SUCESSO: Botão de sugestões encontrado.")
            # Verificar se o seletor de dias está lá
            if page.locator('text=Período de compras').count() > 0:
                print("SUCESSO: Seletor de período encontrado.")
        else:
            print("ERRO: Botão de sugestões não encontrado.")

        browser.close()

if __name__ == "__main__":
    test_shopping_list()
