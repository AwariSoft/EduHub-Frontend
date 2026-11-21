(()=>{'use strict';
const find=id=>document.getElementById(id);
const feedback=find('feedback'),feedbackText=find('feedbackText');
let status='Active';let lastAction=null;
function announce(message){feedbackText.textContent=message;feedback.hidden=false;}
function emphasize(kind){for(const x of document.querySelectorAll('.highlight-result'))x.classList.remove('highlight-result');const el=find(`result-${kind}`);el.classList.add('highlight-result');el.scrollIntoView({behavior:'smooth',block:'center'});}
function change(kind){const next=kind==='deactivate'?'Inactive':'Active';if(status===next){announce(`Demo: Warda Mahmoud’s account is already ${next}. No changes were made.`);return;}status=next;lastAction=kind;emphasize(kind);announce(kind==='deactivate'?'Demo only: Warda’s sign-in access is now Inactive; her account and Student role are retained.':'Demo only: Warda’s sign-in access is now Active again; her account and Student role are unchanged.');}
for(const kind of ['deactivate','activate'])find('confirm-'+kind).addEventListener('click',()=>change(kind));
for(const button of document.querySelectorAll('[data-cancel]'))button.addEventListener('click',()=>{announce(`The ${button.dataset.cancel} confirmation was canceled. Account status remains ${status}.`);});
for(const button of document.querySelectorAll('[data-open-confirm]'))button.addEventListener('click',()=>{const el=find(button.dataset.openConfirm+'-confirmation');el.scrollIntoView({behavior:'smooth',block:'center'});el.querySelector('.btn-primary-action').focus({preventScroll:true});announce(`Review the ${button.dataset.openConfirm} confirmation before applying a change. Current demo status: ${status}.`);});
find('dismissFeedback').addEventListener('click',()=>feedback.hidden=true);
function reset(){status='Active';lastAction=null;feedback.hidden=true;document.querySelectorAll('.highlight-result').forEach(x=>x.classList.remove('highlight-result'));}
find('resetDemo').addEventListener('click',reset);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){feedback.hidden=true;}});
window.EduHubAccountAccessStates={getStatus:()=>status,getLastAction:()=>lastAction,reset};})();