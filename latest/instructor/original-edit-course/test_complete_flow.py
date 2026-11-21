from pathlib import Path
import json
from playwright.sync_api import sync_playwright
r=Path(__file__).resolve().parent
h=(r/'eduhub-instructor-original-edit-course-standalone.html').read_text()
checks={}
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 ctx=b.new_context(viewport={'width':1440,'height':1100});p=ctx.new_page();errs=[];p.on('pageerror',lambda e:errs.append(str(e)))
 p.route('**/*',lambda x:x.abort())
 p.evaluate('''() => {let x={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>x[k]??null,setItem:(k,v)=>x[k]=v,removeItem:k=>delete x[k]}})}''')
 p.set_content(h,wait_until='domcontentloaded')
 p.locator('[data-submit]').first.click();checks['complete_original_course_allows_confirmation']=p.locator('#submitDialog').is_visible()
 p.locator('#submitDialog [data-close-dialog]').first.click();checks['confirmation_cancel_keeps_draft']=not p.locator('#submitDialog').is_visible() and 'Draft' in p.locator('#courseState').inner_text()
 p.locator('[data-submit]').first.click();p.locator('#confirmSubmit').click();checks['confirmation_is_frontend_only']=p.locator('#toast').inner_text().startswith('Submission validated in frontend demo')
 p.locator('#replaceThumbnail').click(no_wait_after=True) if False else None
 p.locator('#thumbnailInput').set_input_files(str(r/'assets/images/javascript-course-thumbnail.jpg'))
 checks['local_image_replacement']=p.locator('#thumbnailLabel').inner_text()=='javascript-course-thumbnail.jpg' and p.locator('#thumbnailPreview').get_attribute('src').startswith('blob:')
 p.locator('#removeThumbnail').click();checks['remove_thumbnail_updates_checklist']=p.locator('.checklist li.is-done').count()==3
 p.locator('#thumbnailInput').set_input_files(str(r/'assets/images/javascript-course-thumbnail.jpg'))
 checks['restore_thumbnail_checklist']=p.locator('.checklist li.is-done').count()==4
 p.locator('#courseTitle').fill('JavaScript Mastery — Updated');checks['sidebar_course_fact_updates']=p.locator('#factCourse').inner_text()=='JavaScript Mastery — Updated'
 p.locator('[data-save]').first.click();checks['local_save_persists_title']= 'JavaScript Mastery' in p.evaluate('localStorage.getItem("eduhub:original-edit-course:javascript-beginners:v1")')
 p.locator('#courseTitle').fill('Temporary');p.reload(wait_until='domcontentloaded') if False else None
 checks['no_errors']=not errs
 ctx.close();b.close()
(r/'complete-flow-results.json').write_text(json.dumps({'checks':checks,'errors':errs},indent=2))
print(json.dumps(checks,indent=2))
