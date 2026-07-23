// ============================================================
// AiNTgreen — site interactivity
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Nav: scrolled state + mobile toggle ---------- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function onScroll(){
  nav.classList.toggle('scrolled', window.scrollY > 40);
  const toTop = document.getElementById('toTop');
  toTop.classList.toggle('show', window.scrollY > 700);
}
document.addEventListener('scroll', onScroll, { passive:true });
onScroll();

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

/* ---------- Back to top ---------- */
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top:0, behavior:'smooth' });
});

/* ---------- Reveal on scroll ---------- */
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('in'), (i % 6) * 70);
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });
  revealItems.forEach(el => io.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('in'));
}

/* ---------- Animated stat counters ---------- */
const counters = document.querySelectorAll('[data-count]');
function animateCounter(el){
  const target = parseInt(el.getAttribute('data-count'), 10);
  const prefix = el.getAttribute('data-count-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1600;
  const start = performance.now();

  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = prefix + value.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
  }
  requestAnimationFrame(tick);
}
.lifecycle-strip{
  border:1px solid var(--line); border-radius:20px; padding:32px; text-align:center;
}
.lifecycle-title{
  font-family:var(--font-mono); font-size:12.5px; letter-spacing:.1em; text-transform:uppercase;
  color:var(--green-deep); font-weight:600; margin-bottom:26px;
}
.lifecycle-steps{ display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap; }
.lifecycle-step{ display:flex; flex-direction:column; align-items:center; gap:10px; width:110px; }
.lifecycle-icon{
  width:52px; height:52px; border-radius:50%; background:var(--green-mist); color:var(--green-deep);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.lifecycle-icon svg{ width:26px; height:26px; }
.lifecycle-step span:last-child{ font-size:12.5px; font-weight:600; color:var(--ink); line-height:1.35; }
.lc-arrow{ width:20px; height:20px; color:var(--slate-soft); flex-shrink:0; }
}

/* ---------- Contact form (front-end only) ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    if (!name){
      formNote.textContent = 'Please enter your name to continue.';
      return;
    }
    formNote.textContent = `Thanks, ${name.split(' ')[0]} — your message is ready to send. Connect a form backend or mail service to deliver it to info@aintgreen.com.`;
    contactForm.reset();
  });
}
