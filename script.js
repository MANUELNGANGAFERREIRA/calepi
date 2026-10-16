(function(){
  const preloader=document.querySelector('.preloader');
  const shell=document.querySelector('.site-shell');
  const number=document.getElementById('load-number');
  const fill=document.getElementById('loader-fill');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('loading');
  if(reduced){preloader?.remove();shell?.classList.add('is-ready');document.body.classList.remove('loading');}
  else{
    let progress=0;
    const tick=()=>{
      progress=Math.min(100,progress+Math.ceil(Math.random()*17));
      if(number) number.textContent=String(progress).padStart(2,'0');
      if(fill) fill.style.width=progress+'%';
      if(progress<100){window.setTimeout(tick,65+Math.random()*65);}
      else{window.setTimeout(()=>{preloader?.classList.add('done');shell?.classList.add('is-ready');document.body.classList.remove('loading');window.setTimeout(()=>preloader?.remove(),900);},180);}
    };
    window.setTimeout(tick,120);
  }
  const revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduced){
    const observer=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12,rootMargin:'0px 0px -35px 0px'});
    revealEls.forEach(el=>observer.observe(el));
  }else revealEls.forEach(el=>el.classList.add('visible'));
  const menuButton=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.main-nav');
  menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('open',!open);});
  nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));
  document.getElementById('year').textContent=new Date().getFullYear();
})();
