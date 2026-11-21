import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
root=Path(__file__).parent
page_html=(root/'eduhub-admin-user-management-standalone.html').read_text()
results={'viewport_checks':[],'interaction_checks':[],'errors':[]}
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-web-security','--allow-file-access-from-files'])
  for width in [1440,834,390,320]:
   page=await browser.new_page(viewport={'width':width,'height':920},device_scale_factor=1)
   errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
   await page.set_content(page_html,wait_until='domcontentloaded',timeout=50000)
   await page.screenshot(path=str(root/'previews'/f'{width}px.png'),full_page=True,animations='disabled')
   box=await page.evaluate('''() => ({scrollWidth: document.documentElement.scrollWidth, viewport:window.innerWidth, height:document.documentElement.scrollHeight, panel:Math.round(document.querySelector('.users-panel').getBoundingClientRect().height), header:Math.round(document.querySelector('.admin-topbar').getBoundingClientRect().height), rows:document.querySelectorAll('.user-row:not([hidden])').length, active:document.querySelectorAll('.side-link.selected').length})''')
   box['width']=width;box['overflow']=box['scrollWidth']>width;box['errors']=errors;results['viewport_checks'].append(box)
   await page.close()
  page=await browser.new_page(viewport={'width':1440,'height':900})
  errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
  await page.set_content(page_html,wait_until='domcontentloaded')
  async def ck(name,fn):
   try:
    r=await fn();results['interaction_checks'].append({'name':name,'passed':bool(r)})
   except Exception as e:results['interaction_checks'].append({'name':name,'passed':False,'error':str(e)[:300]})
  async def search():
   await page.locator('#userSearch').fill('sarah');return await page.locator('.user-row:visible').count()==1 and await page.locator('.user-row:visible').inner_text() is not None
  await ck('search user name',search)
  async def clear_search():
   await page.locator('#userSearch').fill('');return await page.locator('.user-row:visible').count()==6
  await ck('restore unfiltered list',clear_search)
  async def role_filter():
   await page.locator('#roleFilter').select_option('instructor');return await page.locator('.user-row:visible').count()==2
  await ck('role filter',role_filter)
  async def filter_combo():
   await page.locator('#statusFilter').select_option('inactive');return await page.locator('.user-row:visible').count()==0 and await page.locator('#noRecords').is_visible()
  await ck('combined filters and no results',filter_combo)
  async def clear():
   await page.locator('#clearFilters').click();return await page.locator('.user-row:visible').count()==6
  await ck('clear filters',clear)
  async def active_filter():
   await page.locator('#statusFilter').select_option('active');return await page.locator('.user-row:visible').count()==5
  await ck('active status filter',active_filter)
  await page.locator('#statusFilter').select_option('all')
  async def detail():
   await page.locator('[data-user-view="warda.mahmoud@example.com"]').click();return await page.locator('#userBackdrop').is_visible() and 'Warda Mahmoud' in await page.locator('#dialogTitle').inner_text()
  await ck('user details preview',detail)
  async def escape_close():
   await page.keyboard.press('Escape');return await page.locator('#userBackdrop').is_hidden()
  await ck('modal Escape closes',escape_close)
  async def cancel_deactivation():
   await page.locator('[data-toggle-user="warda.mahmoud@example.com"]').click();await page.locator('#cancelDialog').click();return await page.locator('[data-name="warda mahmoud"]').get_attribute('data-status')=='active'
  await ck('deactivation cancellation',cancel_deactivation)
  async def deactivate():
   await page.locator('[data-toggle-user="warda.mahmoud@example.com"]').click();await page.locator('#confirmAccount').click();return await page.locator('[data-name="warda mahmoud"]').get_attribute('data-status')=='inactive' and 'Activate' in await page.locator('[data-toggle-user="warda.mahmoud@example.com"]').inner_text()
  await ck('deactivate account preview',deactivate)
  async def activate():
   await page.locator('[data-toggle-user="warda.mahmoud@example.com"]').click();await page.locator('#confirmAccount').click();return await page.locator('[data-name="warda mahmoud"]').get_attribute('data-status')=='active'
  await ck('reactivate account preview',activate)
  async def admin_protected():
   return await page.locator('[data-name="nour hassan"] [data-toggle-user]').count()==0
  await ck('current admin protected',admin_protected)
  async def pagination():
   await page.locator('#nextPage').click();return await page.locator('#unavailablePage').is_visible() and await page.locator('#pageNumber').inner_text()=='2'
  await ck('page 2 unavailable guard',pagination)
  async def page_return():
   await page.locator('#previousPage').click();return await page.locator('.user-row:visible').count()==6
  await ck('return to sample page',page_return)
  async def menu():
   await page.locator('#notificationToggle').click();return await page.locator('#notificationMenu').is_visible()
  await ck('notification menu',menu)
  async def notification_filter():
   await page.locator('#showInactiveNotifications').click();return await page.locator('#statusFilter').input_value()=='inactive' and await page.locator('.user-row:visible').count()==1
  await ck('notification inactive filter',notification_filter)
  await page.locator('#statusFilter').select_option('all')
  async def account():
   await page.locator('#accountToggle').click();return await page.locator('#accountMenu').is_visible()
  await ck('account menu',account)
  await page.close()
  phone=await browser.new_page(viewport={'width':390,'height':844});phone.on('pageerror',lambda err:errors.append(str(err)))
  await phone.set_content(page_html,wait_until='domcontentloaded')
  async def mobile_drawer():
   await phone.locator('#openMobileNav').click();return await phone.locator('#adminSidebar').evaluate('(el)=>el.classList.contains("is-open")')
  await ck('mobile menu opens',mobile_drawer)
  async def mobile_close():
   await phone.locator('#sidebarBackdrop').click(position={'x':350,'y':500});return not await phone.locator('#adminSidebar').evaluate('(el)=>el.classList.contains("is-open")')
  await ck('mobile menu backdrop closes',mobile_close)
  async def mobile_search():
   await phone.locator('#openMobileSearch').click();return await phone.locator('#workspaceSearch').is_visible()
  await ck('mobile topbar search opens',mobile_search)
  results['errors']=errors
  await browser.close()
 (root/'validation-results.json').write_text(json.dumps(results,indent=2))
 print(json.dumps({'viewport_checks':results['viewport_checks'],'checks_total':len(results['interaction_checks']),'passed':sum(x['passed'] for x in results['interaction_checks']),'failed':[x for x in results['interaction_checks'] if not x['passed']],'js_errors':results['errors']},indent=2))
asyncio.run(main())
