"""Creates a fully offline visual/interaction demo by embedding the existing EduHub vendor CSS snapshot.
The production file is intentionally modular and uses Bootstrap/Font Awesome CDN links."""
from pathlib import Path
import re
R=Path(__file__).resolve().parent
SOURCE=Path('/mnt/data/eduhub_menus_uploads_form_states/eduhub-instructor-menus-uploads-form-states-standalone.html')
prev=SOURCE.read_text(encoding='utf8')
base=prev.split('<style>',1)[1].split('</style>',1)[0]
cut=base.find('/* Menus/uploads/form-state refinements */')
assert cut>0
base=base[:cut]
html=(R/'eduhub-instructor-dialogs-curriculum-states.html').read_text()
css=(R/'assets/css/main.css').read_text()
js=(R/'assets/js/main.js').read_text()
html=re.sub(r'(?m)^\s*<link\b[^>]*href="(?:https:[^"]+|assets/css/main.css)"[^>]*>\s*$', '', html)
html=html.replace('</head>','<style>\n'+base+'\n/* EduHub instructor dialogs/curriculum */\n'+css+'\n</style>\n</head>')
html=re.sub(r'(?m)^\s*<script src="(?:https:[^"]+|assets/js/main.js)"></script>\s*$', '', html)
html=html.replace('</body>','<script>\n'+js+'\n</script>\n</body>')
out=R/'eduhub-instructor-dialogs-curriculum-states-standalone.html'
out.write_text(html,encoding='utf8')
print('Standalone built:',out,'size',out.stat().st_size)
