(() => {
  const modal=document.getElementById('publicPreview');
  const trigger=document.querySelector('[data-action="public-preview"]');
  const close=document.getElementById('closePreview');
  let origin=null;
  const hide=()=>{if(modal.hidden)return;modal.hidden=true;document.body.style.overflow='';origin?.focus();};
  trigger?.addEventListener('click',()=>{origin=document.activeElement;modal.hidden=false;document.body.style.overflow='hidden';close?.focus();});
  close?.addEventListener('click',hide);
  modal?.addEventListener('click',e=>{if(e.target===modal)hide();});
  document.addEventListener('keydown',e=>{
    if(modal.hidden)return;
    if(e.key==='Escape'){e.preventDefault();hide();}
    if(e.key==='Tab'){
      const items=[...modal.querySelectorAll('button:not([disabled]),a[href]')];
      if(items.length){const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
    }
  });
})();