from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:8081/auth')
    page.wait_for_load_state('networkidle')
    
    print("Page Title:", page.title())
    
    # Check for Google login button
    google_btns = page.locator('button', has_text="Google").count()
    print("Google Login Button found:", google_btns > 0)
    
    browser.close()
