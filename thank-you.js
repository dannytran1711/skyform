'use strict';
document.querySelector('.year').textContent = new Date().getFullYear();
let result;
try { result = JSON.parse(sessionStorage.getItem('skyform-result')); } catch {}
const recent = result && Date.now() - result.time < 10 * 60 * 1000;
const demo = new URLSearchParams(location.search).has('demo') || (recent && result.mode === 'demo');
const sent = recent && result.mode === 'sent';
if (demo || sent) {
  document.querySelector('#result-label').textContent = demo ? 'PREVIEW COMPLETE' : 'MESSAGE DELIVERED';
  document.querySelector('#receipt').textContent = demo ? 'That’s how your thank-you page will feel. A little celebration for a little hello.' : 'Your message has been sent successfully. Thank you for taking a moment to say hello.';
  document.querySelector('#delivery-note').textContent = demo ? 'Demo mode · No message was sent or stored.' : 'You can return to the form whenever you like.';
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const container = document.querySelector('.confetti');
    for (let i=0;i<32;i++) { const item=document.createElement('i');item.style.setProperty('--x',Math.random()*100+'%');item.style.setProperty('--delay',Math.random()*.6+'s');item.style.setProperty('--color',['#138bd5','#73c8fa','#b0e7ff'][i%3]);container.append(item); }
    setTimeout(()=>container.replaceChildren(),3600);
  }
}
