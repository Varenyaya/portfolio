const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menu.textContent=open?'Close −':'Menu +';});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.textContent='Menu +';}));
document.querySelector('.project-toggle').addEventListener('click',event=>{const button=event.currentTarget;const panel=document.getElementById(button.getAttribute('aria-controls'));panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));button.innerHTML=panel.hidden?'View project notes <span>↗</span>':'Close project notes <span>−</span>';});

const motionButton=document.querySelector('.butterfly-motion');
const butterfly=document.querySelector('.flying-butterfly');
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
function setButterflyPaused(paused){
  butterfly.classList.toggle('paused',paused);
  motionButton.setAttribute('aria-pressed',String(paused));
  motionButton.textContent=paused?'Let butterfly fly':'Pause butterfly';
}
setButterflyPaused(motionPreference.matches);
motionButton.addEventListener('click',()=>setButterflyPaused(motionButton.getAttribute('aria-pressed')!=='true'));
motionPreference.addEventListener('change',event=>setButterflyPaused(event.matches));
