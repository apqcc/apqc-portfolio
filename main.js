(()=>{
const d=document,r=d.documentElement,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,
wide=matchMedia('(min-width:768px)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches,
native='CSSViewTransitionRule' in window&&location.protocol!=='file:';
// Hero title: split words (original text kept in aria-label)
if(!reduce)d.querySelectorAll('[data-split]').forEach(el=>{const t=el.textContent.trim();el.setAttribute('aria-label',t);
el.innerHTML=t.split(/\s+/).map((w,i)=>`<span class="w" aria-hidden="true" style="--i:${i}"><span>${w}</span></span>`).join(' ')});
// Stagger groups
d.querySelectorAll('[data-stagger]').forEach(p=>[...p.children].forEach((c,i)=>{c.dataset.reveal=p.dataset.stagger;c.style.setProperty('--i',Math.min(i,6))}));
// Scroll reveals + counters (IntersectionObserver, 15% threshold)
const count=el=>{const end=+el.dataset.count,s=performance.now();el.style.minWidth=String(end).length+'ch';
const f=t=>{const p=Math.min((t-s)/1600,1);el.textContent=Math.round(end*(1-Math.pow(1-p,4)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const cs=[...d.querySelectorAll('[data-count]')];
if('IntersectionObserver' in window){
if(!reduce)cs.forEach(c=>c.textContent='0');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;
el.classList.add('is-in');if(el.dataset.stagger)[...el.children].forEach(c=>c.classList.add('is-in'));
if(el.dataset.count&&!reduce)count(el);io.unobserve(el)}),{threshold:.15});
d.querySelectorAll('[data-reveal],[data-stagger],[data-count]').forEach(el=>io.observe(el));
// Header shrink via sentinel (no scroll listener)
const hdr=d.querySelector('.hdr'),sn=d.querySelector('.sentinel');
if(hdr&&sn)new IntersectionObserver(([e])=>hdr.classList.toggle('is-small',!e.isIntersecting)).observe(sn);
// Active section highlight
const sp=d.querySelector('[data-spy]');
if(sp){const m=new Map([...sp.querySelectorAll('a[href^="#"]')].map(a=>[d.querySelector(a.hash),a]));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){m.forEach(a=>a.classList.remove('is-active'));m.get(e.target).classList.add('is-active')}}),{rootMargin:'-40% 0px -55% 0px'});
m.forEach((a,s)=>s&&so.observe(s))}
// Parallax: hero decor 0.5x / 0.3x, desktop only; rAF runs only while hero is visible
const hero=d.querySelector('.hero'),px=[...d.querySelectorAll('[data-parallax]')];
if(hero&&px.length&&wide&&!reduce){let run=false,raf=0;
const tick=()=>{px.forEach(e=>e.style.transform=`translate3d(0,${(scrollY*e.dataset.parallax).toFixed(1)}px,0)`);raf=run?requestAnimationFrame(tick):0};
new IntersectionObserver(([e])=>{run=e.isIntersecting;if(run&&!raf)tick()}).observe(hero)}
}else{d.querySelectorAll('[data-reveal],[data-stagger]>*').forEach(e=>e.classList.add('is-in'))}
// Card tilt (max 4deg), fine pointers on wide screens only
if(fine&&wide&&!reduce)d.querySelectorAll('.card').forEach(c=>{const t=c.querySelector('.tilt');let f=0;
c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;
cancelAnimationFrame(f);f=requestAnimationFrame(()=>{t.style.setProperty('--ry',x*8+'deg');t.style.setProperty('--rx',-y*8+'deg')})});
c.addEventListener('pointerleave',()=>{t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')})});
// Page-transition fallback: navy wipe where native View Transitions are unavailable
const wipe=d.querySelector('.wipe');
if(wipe&&!native&&!reduce){
if(r.classList.contains('arriving'))requestAnimationFrame(()=>{r.classList.remove('arriving');wipe.classList.add('exit');
setTimeout(()=>{wipe.style.transition='none';wipe.classList.remove('exit');wipe.offsetWidth;wipe.style.transition=''},800)});
d.addEventListener('click',e=>{const a=e.target.closest('a[href]');
if(!a||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.protocol!==location.protocol||a.host!==location.host||!a.pathname.endsWith('.html')||a.pathname===location.pathname)return;
e.preventDefault();wipe.classList.add('cover');try{sessionStorage.setItem('wipe','1')}catch(_){}
setTimeout(()=>location.href=a.href,550)});
addEventListener('pageshow',e=>{if(e.persisted)wipe.classList.remove('cover')})}
// Demo contact form
const fm=d.querySelector('form[data-demo]');
if(fm)fm.addEventListener('submit',e=>{e.preventDefault();fm.hidden=true;const t=d.querySelector('.thanks');t.hidden=false});
// Start the loading sequence
requestAnimationFrame(()=>requestAnimationFrame(()=>r.classList.add('is-loaded')));
})();
