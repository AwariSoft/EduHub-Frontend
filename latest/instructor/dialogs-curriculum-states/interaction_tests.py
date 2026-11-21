import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parent
HTML=(ROOT/'eduhub-instructor-dialogs-curriculum-states-standalone.html').read_text()
async def main():
  tests=[]
  async with async_playwright() as p:
    browser=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=await browser.new_page(viewport={'width':390,'height':850})
    errors=[]; page.on('pageerror',lambda e:errors.append(str(e)))
    await page.goto('about:blank');await page.set_content(HTML,wait_until='domcontentloaded')
    async def check(label, callback):
      await callback();tests.append({'test':label,'result':'passed'})
    async def course_cancel():
      await page.locator('#cancelDeleteCourse').click()
      assert 'course remains unchanged' in await page.locator('#deleteCourseMessage').inner_text()
    await check('Cancel deletion preserves course',course_cancel)
    async def course_delete():
      await page.locator('#confirmDeleteCourse').click()
      assert 'No course was deleted' in await page.locator('#deleteCourseMessage').inner_text()
    await check('Course delete remains preview only',course_delete)
    async def account_confirm():
      assert await page.locator('#confirmDeleteAccount').is_disabled()
      await page.locator('#deleteConfirm').fill('delete')
      assert await page.locator('#confirmDeleteAccount').is_disabled()
      await page.locator('#deleteConfirm').fill('DELETE')
      assert await page.locator('#confirmDeleteAccount').is_enabled()
      await page.locator('#confirmDeleteAccount').click()
      assert await page.locator('#confirmDeleteAccount').is_disabled()
    await check('Account deletion requires exact case-sensitive DELETE',account_confirm)
    async def add_section():
      await page.locator('#newSectionTitle').fill('A')
      await page.locator('#addSectionForm button[type=submit]').click()
      assert await page.locator('#newSectionTitle').get_attribute('aria-invalid')=='true'
      await page.locator('#newSectionTitle').fill('Working with Collections')
      await page.locator('#newSectionOrder').fill('4')
      await page.locator('#addSectionForm button[type=submit]').click()
      assert await page.get_by_text('0 lessons · New section').is_visible()
      assert 'Working with Collections' in await page.locator('#sectionList').inner_text()
    await check('Add section validation and local curriculum update',add_section)
    async def duplicate_order():
      await page.locator('#editSectionOrder').fill('4')
      await page.locator('#editSectionForm button[type=submit]').click()
      assert await page.locator('#editSectionOrder').get_attribute('aria-invalid')=='true'
      await page.locator('#editSectionOrder').fill('5')
      await page.locator('#editSectionName').fill('C# Essentials')
      await page.locator('#editSectionForm button[type=submit]').click()
      assert await page.locator('#curriculumSectionName').inner_text()=='C# Essentials'
    await check('Edit section prevents duplicate order and preserves lessons',duplicate_order)
    async def expand():
      assert await page.locator('#curriculumLessons').is_hidden()
      await page.locator('#curriculumToggle').click()
      assert await page.locator('#curriculumLessons').is_visible()
      assert 'Variables and Data Types' in await page.locator('#curriculumLessons').inner_text()
      assert await page.locator('#curriculumToggle').get_attribute('aria-expanded')=='true'
      await page.locator('#curriculumToggle').click()
      assert await page.locator('#curriculumLessons').is_hidden()
    await check('Curriculum expand/collapse accessibility and lesson preservation',expand)
    async def password():
      await page.locator('#currentPassword').fill('OldPassword12!')
      await page.locator('#newPassword').fill('short')
      await page.locator('#confirmPassword').fill('short')
      await page.locator('#passwordForm button[type=submit]').click()
      assert await page.locator('#newPassword').get_attribute('aria-invalid')=='true'
      await page.locator('#newPassword').fill('NewSecurePassword123!')
      await page.locator('#confirmPassword').fill('Mismatch12345!')
      await page.locator('#passwordForm button[type=submit]').click()
      assert await page.locator('#confirmPassword').get_attribute('aria-invalid')=='true'
      await page.locator('.ed-eye[data-target=newPassword]').click()
      assert await page.locator('#newPassword').get_attribute('type')=='text'
      await page.locator('.ed-eye[data-target=newPassword]').click()
      assert await page.locator('#newPassword').get_attribute('type')=='password'
      await page.locator('#confirmPassword').fill('NewSecurePassword123!')
      await page.locator('#passwordForm button[type=submit]').click()
      assert 'cannot change your password without' in await page.locator('#passwordMessage').inner_text()
      assert await page.locator('#newPassword').input_value()==''
    await check('Password strength, match, reveal and no backend submission',password)
    async def keep_and_discard():
      await page.locator('#editSectionName').fill('Unsaved Change')
      await page.locator('#keepEditing').click()
      assert await page.locator('#editSectionName').input_value()=='Unsaved Change'
      await page.locator('#discardChanges').click()
      assert await page.locator('#editSectionName').input_value()=='C# Essentials'
    await check('Keep editing and discard unsaved edits',keep_and_discard)
    async def delete_section():
      await page.locator('#deleteSection').click()
      assert await page.locator('#sectionDeleteModal').is_visible()
      await page.get_by_role('button',name='Keep Section').click()
      assert await page.locator('#sectionDeleteModal').is_hidden()
      await page.locator('#deleteSection').click()
      await page.locator('#confirmDeleteSection').click()
      assert await page.locator('#curriculumItem2').is_hidden()
      assert await page.locator('#deleteSection').is_disabled()
    await check('Delete section modal safe cancel and preview-only deletion',delete_section)
    assert not errors,errors
    await browser.close()
  summary={'passed':len(tests),'failed':0,'browserErrors':errors,'cases':tests}
  (ROOT/'interaction-results.json').write_text(json.dumps(summary,indent=2))
  print(json.dumps(summary,indent=2))
asyncio.run(main())
