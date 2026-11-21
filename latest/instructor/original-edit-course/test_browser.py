from playwright.sync_api import sync_playwright
from pathlib import Path
import json
root=Path(__file__).resolve().parent
markup=(root/'eduhub-instructor-original-edit-course-standalone.html').read_text()
results=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-gpu','--disable-dev-shm-usage'])
 for width,height in [(1440,2000),(834,1500),(390,900),(320,900)]:
  ctx=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1)
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.route('**/*',lambda r:r.abort());page.set_content(markup,wait_until='domcontentloaded');page.wait_for_timeout(50)
  geo=page.evaluate('''() => ({scrollWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,heading:Math.round(document.querySelector('.editor-header').getBoundingClientRect().top),details:Math.round(document.querySelector('.details-panel').getBoundingClientRect().top),media:Math.round(document.querySelector('.media-panel').getBoundingClientRect().top),curriculum:Math.round(document.querySelector('.curriculum-panel').getBoundingClientRect().top),detailsHeight:Math.round(document.querySelector('.details-panel').getBoundingClientRect().height),mediaHeight:Math.round(document.querySelector('.media-panel').getBoundingClientRect().height),curriculumHeight:Math.round(document.querySelector('.curriculum-panel').getBoundingClientRect().height),sections:document.querySelectorAll('.curriculum-section').length,lessons:document.querySelectorAll('.lesson-row').length})''')
  page.screenshot(path=str(root/'previews'/f'{width}px.png'),full_page=True)
  results.append({'width':width,'horizontalOverflow':geo['scrollWidth']>geo['viewportWidth']+1,'errors':errors,'geometry':geo})
  ctx.close()
 ctx=browser.new_context(viewport={'width':1440,'height':1100});p=ctx.new_page();errs=[];p.on('pageerror',lambda e:errs.append(str(e)))
 # about:blank has sandboxed origin; shim storage for deterministic local draft testing
 p.evaluate('''() => {const mem={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>mem[k]??null,setItem:(k,v)=>{mem[k]=String(v)},removeItem:k=>delete mem[k]}})}''')
 p.route('**/*',lambda r:r.abort());p.set_content(markup,wait_until='domcontentloaded');p.wait_for_timeout(50)
 tests={};tests['initial_sections_and_lessons']=p.locator('.curriculum-section').count()==3 and p.locator('.lesson-row').count()==6
 tests['prefilled_course']=p.locator('#courseTitle').input_value()=='JavaScript for Beginners' and p.locator('#coursePrice').input_value()=='35'
 tests['checklist_initial']=p.locator('.checklist li.is-done').count()==4
 p.locator('[data-toggle-section]').first.click();tests['collapse_section']=p.locator('.curriculum-section').first.locator('.section-body').is_hidden();p.locator('[data-toggle-section]').first.click();tests['expand_section']=p.locator('.lesson-row').count()==6
 p.locator('[data-edit-section]').first.click();p.locator('#sectionTitleInput').fill('JavaScript Foundations');p.locator('#sectionForm button[type=submit]').click();tests['edit_section_preserves_lessons']=p.locator('.curriculum-section').first.locator('.section-name').inner_text()=='JavaScript Foundations' and p.locator('.lesson-row').count()==6
 p.locator('[data-lesson-menu]').first.click();tests['lesson_menu_open']=p.locator('.lesson-dropdown').first.is_visible();p.locator('[data-edit-lesson]').first.click();p.locator('#lessonNameInput').fill('Updated welcome');p.locator('#lessonForm button[type=submit]').click();tests['edit_lesson_preserves_video']=p.get_by_text('Updated welcome').count()>=1 and p.locator('.checklist li.is-done').count()==4
 p.locator('#addSectionButton').click();p.locator('#sectionTitleInput').fill('Extra Exercises');p.locator('#sectionForm button[type=submit]').click();tests['add_section']=p.locator('.curriculum-section').count()==4
 p.locator('[data-submit]').first.click();tests['incomplete_section_prevents_submit']=p.locator('#lessonsError').is_visible() and not p.locator('#submitDialog').is_visible()
 p.locator('[data-add-lesson]').last.click();p.locator('#lessonNameInput').fill('Intro to practice');p.locator('#lessonDurationInput').fill('10:00');p.locator('#lessonForm button[type=submit]').click();tests['new_lesson']=p.locator('.lesson-row').count()==7
 p.locator('#addSectionButton').scroll_into_view_if_needed();p.locator('[data-save]').first.click();tests['save_changes']=p.locator('#toast').inner_text().startswith('Changes saved')
 tests['saved_sections']=bool(p.evaluate('localStorage.getItem("eduhub:original-edit-course:javascript-beginners:v1")'))
 p.locator('#accountToggle').click();tests['account_dropdown']=p.locator('#accountPopover').is_visible()
 p.locator('#notificationToggle').click();tests['notification_dropdown']=p.locator('#notificationPopover').is_visible() and not p.locator('#accountPopover').is_visible()
 p.locator('#collapseSidebar').click();tests['sidebar_collapse']='sidebar-collapsed' in (p.locator('#workspace').get_attribute('class') or '')
 tests['no_errors']=not errs
 results.append({'interactionTests':tests,'errors':errs})
 ctx.close();browser.close()
(root/'validation-results.json').write_text(json.dumps(results,indent=2))
print(json.dumps(results,indent=2))
