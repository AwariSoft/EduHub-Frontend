from pathlib import Path
import base64,re
r=Path(__file__).resolve().parent
h=(r/'eduhub-instructor-original-edit-course.html').read_text()
css=(r/'assets/css/vendor-offline.css').read_text()+'\n'+(r/'assets/css/main.css').read_text()
js=(r/'assets/js/main.js').read_text()
img=base64.b64encode((r/'assets/images/javascript-course-thumbnail.jpg').read_bytes()).decode()
h=h.replace('<link href="assets/css/vendor-offline.css" rel="stylesheet"/>','')
h=h.replace('<link href="assets/css/main.css" rel="stylesheet"/>','')
h=h.replace('<script src="assets/js/main.js"></script>','')
h=h.replace('assets/images/javascript-course-thumbnail.jpg','data:image/jpeg;base64,'+img)
h=h.replace('</head>','<style>'+css+'</style></head>')
h=h.replace('</body>','<script>'+js+'</script></body>')
(r/'eduhub-instructor-original-edit-course-standalone.html').write_text(h,encoding='utf8')
print('standalone bytes',len(h))
