from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parent
html=(R/'eduhub-admin-course-review-decisions-results-standalone.html').read_text()
with sync_playwright() as p:
    b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    pg=b.new_page(viewport={'width':1120,'height':900},device_scale_factor=1,reduced_motion='reduce')
    pg.goto('about:blank');pg.set_content(html,wait_until='load')
    pg.locator('.approval-dialog').screenshot(path=str(R/'previews/approval-confirmation.png'),animations='disabled')
    pg.locator('.success-card').screenshot(path=str(R/'previews/approval-success.png'),animations='disabled')
    pg.locator('.validation-card').screenshot(path=str(R/'previews/rejection-required-validation.png'),animations='disabled')
    pg.locator('.reject-dialog:not(.validation-card)').screenshot(path=str(R/'previews/rejection-reason-entered.png'),animations='disabled')
    pg.locator('.saved-result').screenshot(path=str(R/'previews/rejected-saved-decision.png'),animations='disabled')
    pg.locator('#rejectReasonEmpty').fill('Explain the transaction rollback process and include a complete database seed script.')
    pg.locator('#rejectEmptyButton').click()
    pg.locator('#feedback').evaluate('e => e.hidden = true')
    pg.locator('.saved-result').screenshot(path=str(R/'previews/rejection-after-interaction.png'),animations='disabled')
    pg.close();b.close()
print('Created interactive and static state previews')
