from pathlib import Path
import base64,re
root=Path(__file__).resolve().parent
html=(root/'eduhub-admin-dashboard.html').read_text()
for name in ['sql-server-essentials','javascript-for-beginners','git-and-github-essentials']:
 path=root/'assets'/'images'/f'{name}.jpg'
 assert path.is_file()
 html=html.replace(f'assets/images/{name}.jpg','data:image/jpeg;base64,'+base64.b64encode(path.read_bytes()).decode())
html=re.sub(r'<link rel="stylesheet" href="https://[^\"]+">','',html)
html=html.replace('<link rel="stylesheet" href="assets/css/vendor-offline.css">', '<style>\n'+(root/'assets/css/vendor-offline.css').read_text()+'\n</style>')
html=html.replace('<link rel="stylesheet" href="assets/css/admin-dashboard.css">','<style>\n'+(root/'assets/css/admin-dashboard.css').read_text()+'\n</style>')
html=html.replace('<script src="assets/js/admin-dashboard.js" defer></script>','<script>\n'+(root/'assets/js/admin-dashboard.js').read_text()+'\n</script>')
assert 'assets/images/' not in html
assert 'assets/css/' not in html
assert 'assets/js/' not in html
(root/'eduhub-admin-dashboard-standalone.html').write_text(html)
print('Standalone bytes',len(html.encode()))
