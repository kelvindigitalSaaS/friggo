"""Quick verification: /app should now redirect to /app/home (and then to /auth since we're not logged in)."""
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    
    # Test: /app should redirect to /app/home → /auth (since not logged in)
    print("=== Verifying /app redirect ===")
    response = page.goto("http://localhost:8080/app", wait_until="networkidle", timeout=15000)
    page.wait_for_timeout(2000)
    final_url = page.url
    print(f"  Final URL: {final_url}")
    
    # The redirect chain should be: /app → /app/home → /auth (not logged in)
    # Previously it was: /app → NotFound or /auth directly
    # Both end at /auth, but now /app has a proper route
    
    # Check page content - should be auth page, not 404
    body = page.locator("body").inner_text()[:300]
    print(f"  Body: {body[:200]}")
    has_404 = "404" in body or "not found" in body.lower()
    print(f"  Has 404: {has_404}")
    
    browser.close()
    print("\n✓ Test complete!")
