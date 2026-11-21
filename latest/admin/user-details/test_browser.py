from playwright.sync_api import sync_playwright
from pathlib import Path
import json
r=Path('/mnt/data/eduhub_admin_user_details')
url=(r/'eduhub-admin-user-details-standalone.html').read_text()
results={'responsive':[], 'interactions':[], 'errors':[],'geometry':{}}
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-web-security'])
 for width in (1440,834,390,320):
  page=browser.new_page(viewport={'width':width,'height':900},device_scale_factor=1)
  errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.set_content(url,wait_until='load',timeout=35000)
  page.wait_for_timeout(180)
  geometry=page.evaluate('''() => {const q=s=>{const n=document.querySelector(s);if(!n)return null;const r=n.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}};return {pageHeight:document.documentElement.scrollHeight,docWidth:document.documentElement.scrollWidth,viewport:innerWidth,topbar:q('.admin-topbar'),workspace:q('.user-workspace'),identity:q('.user-identity-card'),info:q('.account-info-card'),access:q('.account-access-card'),notice:q('.record-notice'),footer:q('.admin-footer'),brand:q('.brand'),menu:q('#openMobileNav')}}''')
  results['geometry'][width]=geometry
  assert geometry['docWidth']<=width,('overflow',width,geometry)
  assert not errors,(width,errors)
  assert page.get_by_role('heading',name='User Details').count()==1
  assert page.get_by_text('USR-1204 · Registered Oct 28, 2026').count()==1
  assert page.locator('[data-account-status]').count()==2
  page.screenshot(path=str(r/f'previews/{width}px.png'),full_page=True,animations='disabled')
  results['responsive'].append({'width':width,'pageHeight':geometry['pageHeight'],'overflow':False,'javascriptErrors':0})
  page.close()
 page=browser.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(url)
 def assert_eq(a,b):
  assert a==b, f'{a!r} != {b!r}'
 def test(name,func):
  try:func();results['interactions'].append({'name':name,'pass':True})
  except Exception as e:results['interactions'].append({'name':name,'pass':False,'error':str(e)[:250]})
 def btn(name):return page.get_by_role('button',name=name,exact=True)
 test('initial active status',lambda: (assert_eq(page.locator('#signInAccess').inner_text(),'Allowed'),assert_eq(btn('Deactivate Account').count(),1)))
 def confirm_open():
  btn('Deactivate Account').click();assert page.locator('#accessBackdrop').is_visible();assert page.get_by_text('Active → Inactive').count()==0;assert_eq(page.locator('#currentState').inner_text(),'Active');assert_eq(page.locator('#nextState').inner_text(),'Inactive')
 test('deactivate modal details',confirm_open)
 page.screenshot(path=str(r/'previews/deactivation-confirmation.png'),full_page=False,animations='disabled')
 test('escape cancels without state change',lambda:(page.keyboard.press('Escape'),assert_eq(page.locator('#signInAccess').inner_text(),'Allowed')))
 test('cancel preserves status',lambda:(btn('Deactivate Account').click(),btn('Cancel').click(),assert_eq(page.locator('#signInAccess').inner_text(),'Allowed')))
 test('confirm deactivation',lambda:(btn('Deactivate Account').click(),btn('Deactivate Account').last.click(),assert_eq(page.locator('#signInAccess').inner_text(),'Blocked'),assert_eq(page.locator('[data-account-status]').first.inner_text(),'Inactive')))
 test('activate modal details',lambda:(btn('Activate Account').click(),assert_eq(page.locator('#currentState').inner_text(),'Inactive'),assert_eq(page.locator('#nextState').inner_text(),'Active')))
 page.screenshot(path=str(r/'previews/activation-confirmation.png'),animations='disabled')
 test('confirm reactivation',lambda:(btn('Activate Account').last.click(),assert_eq(page.locator('#signInAccess').inner_text(),'Allowed'),assert_eq(page.locator('[data-account-status]').first.inner_text(),'Active')))
 test('notification dropdown opens',lambda:(btn('Notifications').click(),assert_eq(page.locator('#notificationMenu').is_visible(),True)))
 test('account dropdown closes notification',lambda:(page.locator('#accountToggle').click(),assert_eq(page.locator('#notificationMenu').is_visible(),False),assert_eq(page.locator('#accountMenu').is_visible(),True)))
 test('outside click closes menus',lambda:(page.evaluate("document.body.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))"),assert_eq(page.locator('#accountMenu').is_visible(),False)))
 def matches_search():
  page.locator('#workspaceSearch').fill('warda');page.locator('#workspaceSearch').press('Enter');assert page.locator('#feedbackToast').is_visible()
 test('search this sample profile',matches_search)
 test('back destination bundled',lambda:assert_eq((r/'eduhub-admin-user-management.html').exists(),True))
 assert not errors,errors
 page.close()
 mobile=browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1);mobile.set_content(url)
 test('mobile drawer opens',lambda:(mobile.locator('#openMobileNav').click(),assert_eq(mobile.locator('#adminSidebar').evaluate("el => el.classList.contains('is-open')"),True)))
 test('mobile drawer escape',lambda:(mobile.keyboard.press('Escape'),assert_eq(mobile.locator('#adminSidebar').evaluate("el => el.classList.contains('is-open')"),False)))
 test('mobile search expands',lambda:(mobile.locator('#openMobileSearch').click(),assert_eq(mobile.locator('#searchContainer').evaluate("el => el.classList.contains('is-open')"),True)))
 mobile.close();browser.close()
(r/'validation-results.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results,indent=2))
