import os,json
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent
markup=(ROOT/'eduhub-admin-dashboard-standalone.html').read_text()
checks=[]
def check(name,result,details=None):
 checks.append({'check':name,'passed':bool(result),'details':details})
 try:
  assert result, f'FAIL: {name}: {details}'
 except AssertionError as e:
  print(e)
try:
 with sync_playwright() as pw:
  browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  for width in [1440,834,390,320]:
   page=browser.new_page(viewport={'width':width,'height':900},device_scale_factor=1)
   errors=[]
   page.on('pageerror',lambda e: errors.append(str(e)))
   page.route('**/*',lambda route:route.abort())
   page.set_content(markup,wait_until='domcontentloaded')
   page.wait_for_timeout(100)
   dims=page.evaluate('''() => ({sw:document.documentElement.scrollWidth,vw:window.innerWidth,bodyh:document.body.scrollHeight,nav:getComputedStyle(document.querySelector('.admin-sidebar')).display, imgs:[...document.images].map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0}))})''')
   check(f'{width}px no horizontal overflow',dims['sw']<=width,dims)
   check(f'{width}px no JavaScript errors',not errors,errors)
   check(f'{width}px images loaded',all(i['loaded'] for i in dims['imgs']),dims['imgs'])
   if width==1440:
    check('desktop six metric cards',page.locator('.metric-card').count()==6)
    check('desktop three approval rows',page.locator('.approval-item').count()==3)
    check('desktop three registration rows',page.locator('.user-row').count()==3)
    check('desktop three payment rows',page.locator('.payment-row').count()==3)
    page.locator('#notificationToggle').click(); check('notification menu opens',page.locator('#notificationMenu').is_visible());
    page.keyboard.press('Escape'); check('Escape closes notification',not page.locator('#notificationMenu').is_visible())
    page.locator('#accountToggle').click(); check('account menu opens',page.locator('#accountMenu').is_visible())
    page.locator('#notificationToggle').click(); check('switch menus closes previous',not page.locator('#accountMenu').is_visible())
    page.keyboard.press('Escape')
    page.locator('.review-course').first.click();check('review dialog opens',page.locator('#courseDialogBackdrop').is_visible());check('review dialog correct course',page.locator('#dialogFacts').inner_text().find('SQL Server Essentials')>=0)
    page.keyboard.press('Escape');check('Escape closes dialog',not page.locator('#courseDialogBackdrop').is_visible())
    page.locator('#dashboardSearch').fill('Sarah Ali');check('search filters approval rows',page.locator('#approvalList .approval-item:visible').count()==0);check('search filters users correctly',page.locator('#usersList .user-row:visible').count()==1);check('search filters payments correctly',page.locator('#paymentsList .payment-row:visible').count()==1)
    page.locator('#dashboardSearch').fill('');check('clearing search restores rows',page.locator('.approval-item:visible').count()==3)
   if width==390:
    page.locator('#openMobileNav').click();check('mobile drawer opens',page.locator('#adminSidebar').evaluate('e=>e.classList.contains("is-open")'))
    page.locator('#sidebarBackdrop').click(position={'x':370,'y':450},force=True);check('mobile drawer closes',not page.locator('#adminSidebar').evaluate('e=>e.classList.contains("is-open")'))
    page.locator('#openMobileSearch').click();check('mobile search opens',page.locator('#searchContainer').is_visible())
    page.locator('#dashboardSearch').fill('GIT');check('mobile search filters approval rows',page.locator('.approval-item:visible').count()==1)
    page.locator('#dashboardSearch').fill('')
    page.locator('#openMobileSearch').click()
   page.evaluate('document.activeElement?.blur()')
   page.screenshot(path=str(ROOT/'previews'/f'{width}px.png'),full_page=True,animations='disabled')
   print(width, dims['sw'],dims['bodyh'],len(errors))
   page.close()
  browser.close()
finally:
 pass
output={'checks':checks,'passed':sum(c['passed'] for c in checks),'total':len(checks),'failed':[c for c in checks if not c['passed']]}
(ROOT/'validation-results.json').write_text(json.dumps(output,indent=2))
print(json.dumps({'passed':output['passed'],'total':output['total'],'failed':output['failed']},indent=2)[:6000])
