document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.hidden = false;
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
const desktop = window.matchMedia('(min-width: 761px)');
function syncMenu() { toggle.hidden = desktop.matches; closeMenu(); }
desktop.addEventListener('change', syncMenu);
syncMenu();
document.querySelector('#year').textContent = new Date().getFullYear();

// Piñata and confetti have separate animation clocks, with shared user controls.
const hero = document.querySelector('.hero');
const canvas = document.querySelector('.hero-confetti');
const motionToggle = document.querySelector('.motion-toggle');
if (hero && canvas && motionToggle) {
  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const palette = ['#3b75fb', '#6824c3', '#fd3b69', '#fe7327', '#ffb63e'];
  let width = 0, height = 0, particles = [], frame = 0, previous = 0;
  let elapsed = 0, nextBurst = 2.5, paused = false, visible = true;
  let copyBounds = {left:0, right:0, top:0, bottom:0};
  let seed = 31;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const between = (min, max) => min + random() * (max - min);

  function particle(initial = false) {
    return {
      x:between(0, width), y:initial ? between(0, height) : -60,
      vx:between(-12, 12), vy:between(25, 65), size:between(5, 12),
      rotation:between(0, Math.PI*2), spin:between(-2.4, 2.4),
      phase:between(0, Math.PI*2), flutter:between(1.1, 2.5),
      kind:Math.floor(random()*5), color:palette[Math.floor(random()*palette.length)],
      opacity:between(.48, .9), burst:false
    };
  }
  function burst() {
    // Alternating corner cannons throw an arc across the entire hero.
    const fromLeft = Math.floor(nextBurst / 6) % 2 === 0;
    const count = width < 760 ? 15 : 28;
    for (let i=0; i<count; i++) {
      const p = particle();
      Object.assign(p, {x:fromLeft ? -8 : width+8, y:height*.94,
        vx:(fromLeft ? 1 : -1)*between(width*.19,width*.46),
        vy:between(-height*.87,-height*.6), burst:true, life:between(4,6), opacity:.95});
      particles.push(p);
    }
  }
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0,0,width,height);
    for (const p of particles) {
      ctx.save();
      const behindCopy = p.x>copyBounds.left-20 && p.x<copyBounds.right+20 && p.y>copyBounds.top-20 && p.y<copyBounds.bottom+20;
      ctx.globalAlpha = p.opacity * (behindCopy ? .22 : 1) * (p.burst ? Math.min(1,p.life) : 1);
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rotation);
      // Face-to-edge tumbling gives each paper piece its own depth and rhythm.
      ctx.scale(Math.cos(p.phase)*.85+.15, 1);
      ctx.fillStyle = p.color;
      if (p.kind === 0) {
        // A curling streamer, drawn as one continuous shaded ribbon.
        const length = p.size*4;
        ctx.beginPath();
        for(let j=0;j<=16;j++) {
          const y=j/16*length-length/2;
          const x=Math.sin(j/16*Math.PI*2+p.phase)*p.size*.55;
          if(j===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.strokeStyle=p.color;ctx.lineWidth=p.size*.4;ctx.lineCap='round';ctx.stroke();
        ctx.globalAlpha*=.3;ctx.strokeStyle='#ffffff';ctx.lineWidth=1;ctx.stroke();
      } else if (p.kind===1) {
        ctx.beginPath();ctx.ellipse(0,0,p.size*.6,p.size*.6,0,0,Math.PI*2);ctx.fill();
      } else {
        const h=p.kind===2 ? p.size*1.9 : p.size;
        ctx.fillRect(-p.size/2,-h/2,p.size,h);
        ctx.fillStyle='#ffffff';ctx.globalAlpha*=.28;ctx.fillRect(-p.size/2,-h/2,p.size,1.5);
      }
      ctx.restore();
    }
  }
  function tick(now) {
    frame=0;
    if (paused || !visible || document.hidden || reducedMotion.matches) { syncMotion(); return; }
    const dt=previous ? Math.min((now-previous)/1000,.035) : 0;
    previous=now;elapsed+=dt;
    if(elapsed>=nextBurst){burst();nextBurst=elapsed+6;}
    particles=particles.filter(p=>!p.burst || p.life>0);
    for(const p of particles){
      p.phase+=dt*p.flutter;p.rotation+=p.spin*dt;
      p.x+=(p.vx+Math.sin(p.phase)*17)*dt;p.y+=p.vy*dt;
      if(p.burst){p.vy+=height*.38*dt;p.vx*=Math.exp(-.18*dt);p.life-=dt;}
      else {
        if(p.y>height+60) Object.assign(p,particle());
        if(p.x < -45) p.x=width+40;
        if(p.x > width+45) p.x=-40;
      }
    }
    draw();frame=requestAnimationFrame(tick);
  }
  function syncMotion() {
    if(frame) cancelAnimationFrame(frame);
    frame=0;previous=0;
    const idle=!visible || document.hidden || reducedMotion.matches;
    hero.classList.toggle('motion-idle',idle);
    hero.classList.toggle('paused',paused);
    if(!idle && !paused && ctx) frame=requestAnimationFrame(tick);
    else draw();
  }
  function resize() {
    const bounds=hero.getBoundingClientRect();
    width=bounds.width;height=bounds.height;
    const scale=Math.min(window.devicePixelRatio||1,1.75);
    canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);
    if(ctx) ctx.setTransform(scale,0,0,scale,0,0);
    const copy=hero.querySelector('.hero-copy').getBoundingClientRect();
    copyBounds={left:copy.left-bounds.left,right:copy.right-bounds.left,top:copy.top-bounds.top,bottom:copy.bottom-bounds.top};
    seed=31;
    const count=Math.max(45,Math.min(165,Math.round(width*height/10500)));
    particles=Array.from({length:count},()=>particle(true));
    draw();
  }
  motionToggle.addEventListener('click',()=>{
    paused=!paused;
    motionToggle.setAttribute('aria-pressed',String(paused));
    motionToggle.textContent=paused?'Play motion':'Pause motion';
    syncMotion();
  });
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;syncMotion();}).observe(hero);
  reducedMotion.addEventListener('change',syncMotion);
  document.addEventListener('visibilitychange',syncMotion);
  resize();syncMotion();
}
