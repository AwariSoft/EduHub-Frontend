(()=>{'use strict';
const originalReason='Add a guided exercise and solution for transactions. The final project also needs setup instructions and a sample enrollment dataset.';
const byId=id=>document.getElementById(id);
const entered=byId('rejectReasonEntered'),empty=byId('rejectReasonEmpty'),btnEntered=byId('rejectButton'),btnEmpty=byId('rejectEmptyButton'),error=byId('reasonMessageEmpty'),advisory=byId('validationAdvisory'),feedback=byId('feedback'),feedbackText=byId('feedbackText');
let decision='pending';
function announce(message){feedbackText.textContent=message;feedback.hidden=false;}
function choose(name,source){decision=name;const result=byId(name==='approved'?'approvalResult':'rejectedResult');result.classList.add('highlight-result');if(source){source.blur();}result.scrollIntoView({behavior:'smooth',block:'center'});announce(name==='approved'?'Frontend demo: course marked Approved for listing eligibility, but it is not published. No backend changes were made.':'Frontend demo: course marked Rejected and the reason saved locally. No backend changes were made.');}
function reject(raw,source){const value=raw.trim();if(!value){announce('A rejection reason is required before the demo can save a decision.');return false;}byId('savedReason').textContent=value;choose('rejected',source);return true;}
function syncEmpty(){const valid=empty.value.trim().length>0;btnEmpty.disabled=!valid;btnEmpty.setAttribute('aria-disabled',String(!valid));empty.setAttribute('aria-invalid',String(!valid));error.textContent=valid?'Required · This reason will be saved with the review decision.':'Enter a rejection reason before continuing.';error.classList.toggle('error',!valid);advisory.textContent=valid?'Reason entered; Reject Course is now available.':'Reject Course is unavailable until a reason is provided.';advisory.style.color=valid?'#15803d':'#b91c1c';}
function reset(){decision='pending';entered.value=originalReason;empty.value='';byId('savedReason').textContent=originalReason;syncEmpty();document.querySelectorAll('.highlight-result').forEach(e=>e.classList.remove('highlight-result'));feedback.hidden=true;}
byId('approveButton').addEventListener('click',e=>choose('approved',e.currentTarget));
btnEntered.addEventListener('click',e=>reject(entered.value,e.currentTarget));
empty.addEventListener('input',syncEmpty);btnEmpty.addEventListener('click',e=>reject(empty.value,e.currentTarget));
for(const button of document.querySelectorAll('[data-cancel]'))button.addEventListener('click',()=>{const kind=button.dataset.cancel;if(kind==='reject'){entered.value=originalReason;empty.value='';syncEmpty();}announce(`The ${kind} confirmation was canceled. No course status was changed.`);});
byId('dismissFeedback').addEventListener('click',()=>{feedback.hidden=true;});byId('resetDemo').addEventListener('click',reset);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!feedback.hidden){feedback.hidden=true;}});
syncEmpty();window.EduHubReviewDecisionStates={reset,getDecision:()=>decision,getSavedReason:()=>byId('savedReason').textContent};})();