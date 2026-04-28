from playwright.sync_api import sync_playwright
import sys

def test_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        # Log console messages
        page.on("console", lambda msg: print(f"CONSOLE: {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        try:
            print("Navigating to http://localhost:8080...")
            page.goto("http://localhost:8080")
            page.wait_for_load_state("networkidle")
            
            print(f"Title: {page.title()}")
            page.screenshot(path="app_home.png", full_page=True)
            
            # Check for specific elements to ensure it loaded correctly
            # Since I don't know the exact structure, I'll list some buttons/links
            buttons = page.locator("button").all()
            print(f"Found {len(buttons)} buttons")
            for i, btn in enumerate(buttons[:5]):
                print(f"Button {i}: {btn.inner_text()}")

        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    test_app()
