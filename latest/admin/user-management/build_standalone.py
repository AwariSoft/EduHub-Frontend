from pathlib import Path
import re
r=Path(__file__).parent
html=(r/'eduhub-admin-user-management.html').read_text()
html=re.sub(r'<link rel="stylesheet" href="https://[^"]+">','',html)
for file in ('vendor-offline.css','admin-shell.css','admin-user-management.css'):
    html=html.replace(f'<link rel="stylesheet" href="assets/css/{file}">','<style>\n'+(r/'assets/css'/file).read_text()+'\n</style>')
for file in ('admin-user-management.js','fontawesome-svg-icons.js'):
    html=html.replace(f'<script src="assets/js/{file}" defer></script>','<script>\n'+(r/'assets/js'/file).read_text()+'\n</script>')
assert 'assets/css/' not in html and 'assets/js/' not in html
(r/'eduhub-admin-user-management-standalone.html').write_text(html)
print('Wrote',len(html),'characters')
