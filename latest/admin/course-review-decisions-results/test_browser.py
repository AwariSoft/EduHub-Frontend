from pathlib import Path
from playwright.sync_api import sync_playwright
import json
R=Path(__file__).resolve().parent
html=(R/'eduhub-admin-course-review-decisions-results-standalone.html').read_text()
res=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for w,h in [(1120,840),(1440,900),(834,900),(390,850),(320,700)]:
  page=b.new_page(viewport={'width':w,'height':h},device_scale_factor=1)
  errors=[]
  page.on('pageerror',lambda exc:errors.append(str(exc)))
  page.goto('about:blank');page.set_content(html,wait_until='load')
  page.wait_for_timeout(70)
  dims=page.evaluate('''() => {const rect=s=>{let n=document.querySelector(s);if(!n)return null;const r=n.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}};return {scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,fullHeight:document.body.scrollHeight,brand:rect('.brand'),intro:rect('.page-introduction'),approval:rect('.approval-states'),approvalDialog:rect('.approval-dialog'),approvalSuccess:rect('.success-card'),rejection:rect('.rejection-states'),rejectDialog:rect('.reject-dialog'),validation:rect('.validation-card'),saved:rect('.saved-result'),courseImg:document.querySelector('.success-image').naturalWidth}}''')
  res.append({'kind':'viewport','width':w,'pass':dims['scroll']<=dims['client'] and not errors and dims['courseImg']>0,'details':dims,'errors':errors})
  if w in [1120,1440,834,390]:page.screenshot(path=str(R/'previews'/f'{w}px.png'),full_page=True,animations='disabled')
  page.close()
 page=b.new_page(viewport={'width':1120,'height':900});page.goto('about:blank');page.set_content(html);page.set_default_timeout(2000)
 def test(name,fn):
  try:fn();res.append({'kind':'interaction','test':name,'pass':True})
  except Exception as e:res.append({'kind':'interaction','test':name,'pass':False,'error':str(e)[:450]})
 def required():
  assert page.locator('#rejectEmptyButton').is_disabled();assert page.locator('#rejectReasonEmpty').get_attribute('aria-invalid')=='true'
 test('Empty rejection reason blocks decision',required)
 def empty_input():
  page.locator('#rejectReasonEmpty').fill('  ');assert page.locator('#rejectEmptyButton').is_disabled()
 test('Whitespace-only reason remains invalid',empty_input)
 def fill():
  page.locator('#rejectReasonEmpty').fill('Course needs more detailed transaction examples');assert page.locator('#rejectEmptyButton').is_enabled();assert page.locator('#rejectReasonEmpty').get_attribute('aria-invalid')=='false'
 test('Entering reason enables rejection',fill)
 def save():
  page.locator('#rejectEmptyButton').click();assert page.evaluate('EduHubReviewDecisionStates.getDecision()')=='rejected';assert page.locator('#savedReason').inner_text()=='Course needs more detailed transaction examples';assert page.locator('#feedback').is_visible()
 test('Reject from validation panel updates saved result',save)
 def reset():
  page.locator('#resetDemo').click();assert page.evaluate('EduHubReviewDecisionStates.getDecision()')=='pending';assert page.locator('#rejectEmptyButton').is_disabled();assert page.locator('#savedReason').inner_text().startswith('Add a guided exercise')
 test('Reset demo restores Figma sample',reset)
 def reject_entered():
  page.locator('#rejectReasonEntered').fill('Improve the final project');page.locator('#rejectButton').click();assert page.evaluate('EduHubReviewDecisionStates.getDecision()')=='rejected';assert page.locator('#savedReason').inner_text()=='Improve the final project'
 test('Rejection with populated reason updates saved result',reject_entered)
 def approve():
  page.locator('#approveButton').click();assert page.evaluate('EduHubReviewDecisionStates.getDecision()')=='approved';assert 'not published' in page.locator('#feedbackText').inner_text()
 test('Approve shows listing eligibility without publishing',approve)
 def cancel():
  page.locator('[data-cancel="approve"]').first.click();assert 'canceled' in page.locator('#feedbackText').inner_text();assert page.evaluate('EduHubReviewDecisionStates.getDecision()')=='approved';page.keyboard.press('Escape');assert page.locator('#feedback').is_hidden()
 test('Cancel is safe and Escape dismisses feedback',cancel)
 def close_reject():
  page.locator('[data-cancel="reject"]').first.click();assert page.locator('#rejectEmptyButton').is_disabled();assert page.locator('#rejectReasonEntered').input_value().startswith('Add a guided')
 test('Reject cancel resets entered values',close_reject)
 def links():
  href=page.locator('.back-link').first.get_attribute('href');assert (R/href).is_file();assert page.locator('.back-link').count()==2
 test('Back-to-Course-Approvals links resolve in bundle',links)
 def no_mutation():
  assert page.locator('#savedReason').inner_text()=='Improve the final project'
 test('Cancel preserves already saved local reason',no_mutation)
 page.close();b.close()
(R/'validation-results.json').write_text(json.dumps(res,indent=2))
print(json.dumps({'passes':sum(x['pass'] for x in res),'total':len(res),'failures':[x for x in res if not x['pass']],'viewports':[x for x in res if x['kind']=='viewport']},indent=2))
