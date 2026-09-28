'use strict';
const form = document.querySelector('#contact-form');
const endpoint = window.SKYFORM_ENDPOINT || '';
const status = document.querySelector('#form-status');
const button = form.querySelector('button');
const label = document.querySelector('#button-label');
const message = document.querySelector('#message');
let sending = false;
document.querySelector('.year').textContent = new Date().getFullYear();
if (endpoint) status.textContent = 'Your details are used to respond to this message.';
message.addEventListener('input', () => document.querySelector('#count').textContent = message.value.length);
form.addEventListener('input', (event) => event.target.setCustomValidity?.(''));
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending) return;
  for (const id of ['full-name', 'email', 'message']) {
    const field = document.getElementById(id);
    field.value = field.value.trim();
    field.setCustomValidity(field.value ? '' : 'Please complete this field.');
  }
  if (!form.reportValidity() || form.elements._gotcha.value) return;
  sending = true; button.disabled = true; button.classList.add('busy');
  form.setAttribute('aria-busy', 'true');
  label.textContent = endpoint ? 'Sending your message' : 'Preparing your preview';
  status.classList.remove('error');
  status.textContent = endpoint ? 'Sending…' : 'Demo preview · No message is being sent.';
  try {
    const minimumAnimation = new Promise(resolve => setTimeout(resolve, 1100));
    if (endpoint) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      try {
        const response = await fetch(endpoint, {method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});
        if (!response.ok) throw new Error('Delivery failed');
      } finally { clearTimeout(timeout); }
    }
    await minimumAnimation;
    // Store only a short-lived delivery marker, never contact details.
    try { sessionStorage.setItem('skyform-result', JSON.stringify({mode:endpoint?'sent':'demo',time:Date.now()})); } catch {}
    location.assign('thank-you.html' + (endpoint ? '' : '?demo=1'));
  } catch {
    status.textContent = 'Your message could not be sent. Please try again.';
    status.classList.add('error');
    sending = false; button.disabled = false; button.classList.remove('busy');
    form.removeAttribute('aria-busy'); label.textContent = 'Try again';
  }
});
// Progressive enhancement: stage fields for agent-capable browsers; never auto-submit.
if (document.modelContext?.registerTool) {
  try { Promise.resolve(document.modelContext.registerTool({name:'stage_contact_message',description:'Fill the visible contact form for review without submitting it.',inputSchema:{type:'object',properties:{name:{type:'string',maxLength:100},email:{type:'string',maxLength:254},message:{type:'string',maxLength:3000}},required:['name','email','message'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){
    if (sending) throw new Error('Submission in progress');
    if (!input || typeof input.name!=='string' || !input.name.trim() || input.name.length>100 || typeof input.email!=='string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) || input.email.length>254 || typeof input.message!=='string' || !input.message.trim() || input.message.length>3000) throw new Error('Invalid contact fields');
    for(const [id,key] of [['full-name','name'],['email','email'],['message','message']]){const field=document.getElementById(id);field.value=input[key];field.dispatchEvent(new Event('input',{bubbles:true}));}
    return {status:'staged',submitted:false};
  }})).catch(()=>{}); } catch {}
}
