// impression: small UI interactions + playful animations
const input = document.getElementById('q');
const suggestions = document.getElementById('suggestions');
const form = document.getElementById('search-form');
const btnLucky = document.getElementById('btn-lucky');
const btnSearch = document.getElementById('btn-search');

const sampleHints = [
  "Search for 'how to make the perfect coffee'",
  "Try: soogle web animations",
  "Search 'best pizza near me' (not actually searching)",
  "Type a URL like example.com",
  "Try pressing the lucky button 😉"
];

let hintIdx = 0;
let hintTimer = null;

function cycleHints(){
  suggestions.textContent = sampleHints[hintIdx];
  hintIdx = (hintIdx + 1) % sampleHints.length;
}

hintTimer = setInterval(cycleHints, 3000);
cycleHints();

// tiny keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // focus search on "/" like many sites
  if (e.key === '/' && document.activeElement !== input) {
    e.preventDefault();
    input.focus();
    input.select();
  }
  // press "l" to trigger lucky (playful)
  if (e.key === 'l' && !e.metaKey && !e.ctrlKey && document.activeElement.tagName !== 'INPUT'){
    triggerLucky();
  }
});

function pulseElem(el){
  el.animate([
    { transform: 'translateY(0) scale(1)' },
    { transform: 'translateY(-6px) scale(1.02)' },
    { transform: 'translateY(0) scale(1)' },
  ], { duration: 420, easing: 'cubic-bezier(.2,.9,.2,1)' });
}

btnSearch.addEventListener('click', () => {
  pulseElem(btnSearch);
  // playful mock response (no navigation)
  suggestions.textContent = `Searching for "${input.value || 'something great'}"... (demo only)`;
  setTimeout(cycleHints, 1600);
});

btnLucky.addEventListener('click', triggerLucky);

function triggerLucky(){
  pulseElem(btnLucky);
  // animated confetti-like mini particle using DOM (small, lightweight)
  createMiniConfetti();
  suggestions.textContent = "No network calls here — but good vibes unlocked ✨";
  setTimeout(cycleHints, 2200);
}

function createMiniConfetti(){
  const container = document.createElement('div');
  container.style.position='absolute';
  container.style.left='50%';
  container.style.top='40%';
  container.style.transform='translate(-50%,-50%)';
  container.style.pointerEvents='none';
  document.body.appendChild(container);

  const colors = ['#1a73e8','#34a853','#fbbc05','#ea4335','#7ce6d6','#ff7fae'];
  for(let i=0;i<12;i++){
    const el = document.createElement('div');
    el.style.position='absolute';
    el.style.width='8px';
    el.style.height='8px';
    el.style.borderRadius='2px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.left = Math.random()*60 - 30 + 'px';
    el.style.top = Math.random()*30 - 10 + 'px';
    el.style.opacity = '0';
    container.appendChild(el);

    const dx = Math.random()*220 - 110;
    const dy = Math.random()*120 - 20;
    el.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity:0 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${Math.random()*360}deg)`, opacity:1 },
      { transform: `translate(${dx*1.2}px, ${dy*1.6}px) rotate(${Math.random()*720}deg)`, opacity:0 }
    ], { duration: 900 + Math.random()*600, easing: 'cubic-bezier(.2,.9,.2,1)' });

    setTimeout(()=> el.remove(), 1700);
  }
  setTimeout(()=> container.remove(), 1900);
}

// Accessibility: announce when input cleared or typed quickly
input.addEventListener('input', () => {
  if (!input.value) {
    suggestions.textContent = "Search box cleared.";
    setTimeout(cycleHints, 1400);
  }
});

// make Enter do the same as Search button but don't navigate
form.addEventListener('submit', (e) => {
  e.preventDefault();
  btnSearch.click();
});
