import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parent
async def main():
  out=[]
  async with async_playwright() as p:
    browser=await p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    for width,height in [(1440,1700),(834,1050),(390,850)]:
      page=await browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
      errors=[]
      page.on('pageerror',lambda e:errors.append(str(e)))
      await page.goto('about:blank')
      await page.set_content((ROOT/'eduhub-instructor-dialogs-curriculum-states-standalone.html').read_text(encoding='utf8'),wait_until='domcontentloaded')
      await page.wait_for_timeout(550)
      await page.screenshot(path=str(ROOT/f'previews/{width}px.png'),full_page=True)
      data=await page.evaluate('''() => ({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,cardCount:document.querySelectorAll('.ed-card').length,regions:Array.from(document.querySelectorAll('.ed-section')).map(n=>({top:Math.round(n.getBoundingClientRect().top+scrollY),height:Math.round(n.getBoundingClientRect().height)})),h1:document.querySelector('h1').innerText,loadedFont:getComputedStyle(document.body).fontFamily})''')
      out.append(dict(width=width,overflow=max(data['scrollWidth'],data['bodyWidth'])>width,js_errors=errors,metrics=data))
      assert not out[-1]['overflow'],f'{width}px overflow'
      assert not errors,errors
      await page.close()
    await browser.close()
  (ROOT/'validation-results.json').write_text(json.dumps(out,indent=2))
  print(json.dumps(out,indent=2))
asyncio.run(main())
