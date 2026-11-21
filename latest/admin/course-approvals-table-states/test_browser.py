from pathlib import Path
import json
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parent
html=(R/'eduhub-admin-course-approvals-table-states-standalone.html').read_text()
results=[]
def record(name,passed,details=None):
    results.append({'name':name,'passed':bool(passed),'details':details});print(('PASS' if passed else 'FAIL'),name,details or '')
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path="/usr/bin/chromium",args=["--no-sandbox"])
    for width in [1120,1440,834,390,320]:
        page=browser.new_page(viewport={'width':width,'height':900},device_scale_factor=1)
        page.route('https://**/*',lambda r:r.abort())
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.set_content(html,wait_until='domcontentloaded');page.wait_for_timeout(350)
        state=page.evaluate('''() => {const el=id=>document.getElementById(id);return {scroll:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,loading:el('loadingState').getBoundingClientRect().toJSON(),empty:el('emptyDatasetState').getBoundingClientRect().toJSON(),noresults:el('noResultsState').getBoundingClientRect().toJSON(),brand:document.querySelector('.brand').getBoundingClientRect().toJSON(),intro:document.querySelector('.page-intro').getBoundingClientRect().toJSON(),focusable:[...document.querySelectorAll('input,select,button')].filter(x=>!x.disabled).length,icons:document.querySelectorAll('svg.ed-fa-icon').length} }''')
        record(f'{width}px no horizontal overflow',state['scroll']<=width,f"content {state['scroll']}px")
        record(f'{width}px no JS errors',not errors,errors)
        record(f'{width}px all three states present',all(page.locator('#'+id).count() for id in ['loadingState','emptyDatasetState','noResultsState']))
        record(f'{width}px SVG icons rendered',state['icons']>=4,str(state['icons']))
        if width in [1120,834,390,1440]:
            page.screenshot(path=str(R/'previews'/f'{width}px.png'),full_page=True,animations='disabled')
        if width==1120:
            record('Figma 1120px support-sheet height',abs(state['height']-1881)<=3,str(state['height']))
            for key,targetY,targetH in [('loading',228,605),('empty',865,453),('noresults',1350,491)]:
                rect=state[key]
                record(f'Figma {key} panel position',abs(rect['y']-targetY)<=3,(rect['y'],targetY))
                record(f'Figma {key} panel height',abs(rect['height']-targetH)<=3,(rect['height'],targetH))
        page.close()
    page=browser.new_page(viewport={'width':1120,'height':920});page.route('https://**/*',lambda r:r.abort());errs=[];page.on('pageerror',lambda e:errs.append(str(e)));page.set_content(html,wait_until='domcontentloaded')
    record('Initial filtered query matches none',page.locator('#notFoundBody').is_visible() and page.locator('#activeSearch').input_value()=='Rust for Data Science')
    record('Four loading skeleton rows',page.locator('.loading-row').count()==4)
    record('Loading filters disabled',page.locator('#loadingSearch').is_disabled() and page.locator('#loadingDate').is_disabled() and page.locator('#loadingStatus').is_disabled())
    page.locator('#clearSearch').click()
    record('Clear Search keeps status',page.locator('#activeStatus').input_value()=='pending' and page.locator('#activeSearch').input_value()=='')
    record('Clear Search shows 3 grounded pending records',page.locator('.sample-row').count()==3 and page.locator('.sample-row .sample-status.pending').count()==3)
    page.screenshot(path=str(R/'previews'/'clear-search-results.png'),full_page=True,animations='disabled')
    page.locator('#activeSearch').fill('abcdef-no-match');page.wait_for_timeout(250)
    record('Different unmatched query restores no-results',page.locator('#notFoundBody').is_visible() and 'abcdef-no-match' in page.locator('#noResultsMessage').inner_text())
    page.locator('#resetFilters').click()
    record('Reset Filters clears search/status/date',page.locator('#activeSearch').input_value()=='' and page.locator('#activeStatus').input_value()=='all' and page.locator('#activeDate').input_value()=='all')
    record('Reset Filters shows six original sample records',page.locator('.sample-row').count()==6)
    record('Review navigation points to bundled related HTML',page.locator('.sample-review').first.get_attribute('href')=='related/eduhub-admin-course-approvals.html' and (R/'related/eduhub-admin-course-approvals.html').exists())
    page.screenshot(path=str(R/'previews'/'reset-filters-results.png'),full_page=True,animations='disabled')
    page.locator('#activeStatus').select_option('rejected')
    record('Status filter shows one rejected course',page.locator('.sample-row').count()==1 and 'REST APIs' in page.locator('.sample-row').inner_text())
    page.locator('#activeDate').select_option('oct01-15')
    record('Date range with no records returns no-results',page.locator('#notFoundBody').is_visible())
    page.locator('#emptySearch').fill('SQL Server');page.wait_for_timeout(100)
    record('Empty dataset stays empty when searched','no submitted courses' in page.locator('#emptyDatasetNote').inner_text().lower() and page.locator('#emptyDatasetState .sample-row').count()==0)
    record('No browser interaction JS errors',not errs,errs)
    page.close();browser.close()
(R/'validation-results.json').write_text(json.dumps({'results':results,'passed':sum(x['passed'] for x in results),'total':len(results)},indent=2))
print('SUMMARY',sum(x['passed'] for x in results),'/',len(results))
