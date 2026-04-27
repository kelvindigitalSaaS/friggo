from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 390, "height": 844})
    
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    
    page.goto('http://localhost:8084/app')
    page.wait_for_load_state('networkidle')
    page.wait_for_timeout(3000)
    
    # Take initial screenshot
    page.screenshot(path='c:/Users/CAIO/Pictures/apps/KAZA/scratch/app_home.png', full_page=False)
    print("Screenshot 1: app home taken")
    
    # Try to find and click settings tab in bottom nav
    nav_buttons = page.locator('nav button, [role="tablist"] button, button').all()
    print(f"Found {len(nav_buttons)} buttons total")
    
    # Look for settings-related buttons
    for i, btn in enumerate(nav_buttons):
        try:
            txt = btn.inner_text(timeout=1000).strip()
            if txt and len(txt) < 30:
                print(f"  Button {i}: '{txt}'")
        except:
            pass
    
    # Try clicking "Ajustes" or settings gear icon
    settings_clicked = False
    for selector in ['text=Ajustes', 'text=Settings', '[aria-label="Ajustes"]', '[aria-label="Settings"]']:
        try:
            el = page.locator(selector).first
            if el.is_visible(timeout=1000):
                el.click()
                settings_clicked = True
                print(f"Clicked settings via: {selector}")
                break
        except:
            continue
    
    if settings_clicked:
        page.wait_for_timeout(2000)
        page.screenshot(path='c:/Users/CAIO/Pictures/apps/KAZA/scratch/app_settings.png', full_page=True)
        print("Screenshot 2: settings tab taken")
        
        # Scroll down to find notification section
        page.evaluate("window.scrollTo(0, 1500)")
        page.wait_for_timeout(500)
        page.screenshot(path='c:/Users/CAIO/Pictures/apps/KAZA/scratch/app_settings_notifs.png', full_page=False)
        print("Screenshot 3: settings scrolled to notifications")
        
        # Scroll more
        page.evaluate("window.scrollTo(0, 3000)")
        page.wait_for_timeout(500)
        page.screenshot(path='c:/Users/CAIO/Pictures/apps/KAZA/scratch/app_settings_bottom.png', full_page=False)
        print("Screenshot 4: settings bottom")
    else:
        print("Could not find settings button")
    
    if errors:
        print(f"\nConsole errors ({len(errors)}):")
        for e in errors[:10]:
            print(f"  ERROR: {e[:200]}")
    else:
        print("\nNo console errors!")
    
    browser.close()
    print("Done!")
