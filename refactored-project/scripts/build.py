from pathlib import Path
import re

# Inline locally installed Font Awesome 6 Free SVG paths into compiled HTML. This
# allows offline viewing without distributing font files or requiring a CDN.
import html as _html
_icon_root=Path('/opt/nvm/versions/node/v22.16.0/lib/node_modules/@fortawesome/fontawesome-free/svgs')
def inline_fontawesome(text):
    rx=re.compile(r'<i\b([^>]*\bclass=["\']([^"\']+)["\'][^>]*)>\s*</i>',re.I)
    def repl(m):
        attrs, classes=m.group(1),m.group(2).split()
        mode=next((x for x in ['solid','regular','brands'] if 'fa-'+x in classes),'solid')
        icon=next((x[3:] for x in classes if x.startswith('fa-') and x not in ['fa-solid','fa-regular','fa-brands','fa-fw','fa-lg','fa-xl','fa-2xl','fa-2x','fa-3x','fa-4x','fa-xs','fa-sm'] and re.match(r'^fa-[a-z][a-z0-9-]+$',x)),None)
        if not icon:return m.group(0)
        path=_icon_root/mode/(icon+'.svg')
        if not path.is_file():return m.group(0)
        original=path.read_text()
        vb=re.search(r'viewBox="([^"]+)"',original)
        body=re.search(r'<svg[^>]*>(.*)</svg>',original,re.S)
        if not vb or not body:return m.group(0)
        size='3em' if 'fa-3x' in classes else '2em' if 'fa-2x' in classes else '1.25em' if 'fa-lg' in classes else '1em'
        hidden='true'
        return '<svg class="'+_html.escape(' '.join(classes)+' edu-inline-icon',quote=True)+'" xmlns="http://www.w3.org/2000/svg" viewBox="'+vb.group(1)+'" fill="currentColor" width="'+size+'" height="'+size+'" aria-hidden="'+hidden+'" focusable="false" style="vertical-align:-.125em;display:inline-block">'+body.group(1)+'</svg>'
    return rx.sub(repl,text)

r=Path(__file__).resolve().parents[1]
for source in (r/'pages').rglob('*.html'):
    relative=source.relative_to(r)
    target=r/'dist'/relative
    target.parent.mkdir(parents=True,exist_ok=True)
    depth=len(relative.parts)-1  # relative to dist/, not to project root
    base='../'*depth
    text=source.read_text()
    def replace(match):
        path=match.group(1)
        part=r/path
        if not part.is_file():raise FileNotFoundError(part)
        return part.read_text()
    text=re.sub(r'<!--\s*INCLUDE:\s*(partials/[a-zA-Z0-9_-]+\.html)\s*-->',replace,text)
    target.write_text(inline_fontawesome(text.replace('{{BASE}}',base)))
    print(target)
# Compiled pages resolve {{BASE}} relative to dist/, so include assets there.
import shutil
shutil.copytree(r/'assets',r/'dist/assets',dirs_exist_ok=True)
