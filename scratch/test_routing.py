"""Test routing issues: /app redirect and settings tab navigation."""
from playwright.sync_api import sync_playwright
import os

SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})

    # Test 1: Navigate to /app - should go to home but currently hits NotFound
    print("=== TEST 1: /app route ===")
    page.goto("http://localhost:8080/app", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(2000)
    print(f"  URL after /app: {page.url}")
    title = page.title()
    print(f"  Title: {title}")
    # Check for NotFound page
    not_found = page.locator("text=404").count()
    not_found2 = page.locator("text=not found").count()
    not_found3 = page.locator("text=Não encontrada").count()
    print(f"  404 elements: {not_found}, 'not found': {not_found2}, 'Não encontrada': {not_found3}")
    page.screenshot(path=os.path.join(SCREENSHOT_DIR, "test1_app_route.png"))
    
    # Take body text to see what's displayed
    body_text = page.locator("body").inner_text()[:500]
    print(f"  Body text: {body_text[:200]}")

    # Test 2: Navigate to /app/home
    print("\n=== TEST 2: /app/home route ===")
    page.goto("http://localhost:8080/app/home", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(3000)
    print(f"  URL after /app/home: {page.url}")
    page.screenshot(path=os.path.join(SCREENSHOT_DIR, "test2_app_home.png"))
    
    # Test 3: Check if settings tab exists in bottom nav
    print("\n=== TEST 3: Settings bottom nav ===")
    settings_buttons = page.locator("text=Ajustes").all()
    print(f"  'Ajustes' buttons found: {len(settings_buttons)}")
    settings_buttons2 = page.locator("text=Settings").all()
    print(f"  'Settings' buttons found: {len(settings_buttons2)}")
    
    # Check bottom nav
    nav_buttons = page.locator("nav button").all()
    print(f"  Nav buttons count: {len(nav_buttons)}")
    for i, btn in enumerate(nav_buttons):
        txt = btn.inner_text().strip()
        print(f"    Button {i}: '{txt}'")

    browser.close()
    print("\nDone!")
