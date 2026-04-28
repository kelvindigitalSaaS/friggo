from playwright.sync_api import sync_playwright
import sys
import traceback

def test_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        def handle_console(msg):
            try:
                print(f"CONSOLE: {msg.type}: {msg.text}")
            except Exception as e:
                print(f"DEBUG: Error in handle_console: {e}")

        # Log console messages
        page.on("console", handle_console)
        page.on("pageerror", lambda err: print(f"PAGE ERROR: {err}"))

        try:
            print("Navigating to http://localhost:8080/app/home...")
            page.goto("http://localhost:8080/app/home")
            
            # Wait for content to load
            page.wait_for_load_state("networkidle")
            
            # Wait a bit more for React hydration and demo mode setup
            page.wait_for_timeout(2000)
            
            print(f"Title: {page.title()}")
            print(f"URL: {page.url}")
            
            page.screenshot(path="app_home_view.png", full_page=True)
            
            # Check for specific elements
            content = page.content()
            print(f"Content length: {len(content)}")
            
            # Find all buttons and links
            buttons = page.locator("button").all()
            links = page.locator("a").all()
            print(f"Found {len(buttons)} buttons and {len(links)} links")
            
            for i, btn in enumerate(buttons[:10]):
                try:
                    text = btn.inner_text().strip()
                    print(f"Button {i}: '{text}'")
                except:
                    pass

        except Exception as e:
            print(f"Error during test: {e}")
            traceback.print_exc()
        finally:
            browser.close()

if __name__ == "__main__":
    test_app()
