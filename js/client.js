'use strict';
function beginMatch(){G.me=role==='host'?0:1;G.scores=[0,0];resetFx();show('game');$('banner').classList.remove('on');big('');msg('Соперник найден!');G.phase='wait';ui();try{navigator.wakeLock&&navigator.wakeLock.request('screen')}catch(e){}}
function cRound(){Object.assign(G,{phase:'count',aim:4,ammo:1,oppAmmo:1,fired:false,missed:null,rev:[0,0]});resetFx();oppAim(-1);$('banner').classList.remove('on');big('ГОТОВЬСЯ');msg('Выбери клетку прицела. Соперник её не видит!');ui()}
function cTick(n){big(n);beep(420+n*35,.12,'triangle',.3)}
function cGo(){G.phase='live';G.goAt=performance.now();big('ОГОНЬ!');msg('Стреляй! Клетка должна совпасть с его клеткой');beep(1200,.35,'square',.2);ui()}
function setAim(i){const ok=((G.phase==='count'||G.phase==='live')&&!G.fired)||(G.phase==='dodge'&&(G.missed===G.me||!G.fired));if(!ok||i===G.aim)return;G.aim=i;ui();role==='host'?hostAim(0,i):send({t:'aim',c:i})}
function tryFire(){const can=(G.phase==='live'&&!G.fired)||(G.phase==='dodge'&&G.missed===1-G.me&&!G.fired);
 if(can){G.fired=true;G.ammo=0;bang(1);boom(wp(fm));rec=1;shk=.5;const f=$('flash');f.style.opacity=.5;setTimeout(()=>f.style.opacity=0,60);
  const rt=performance.now()-G.goAt;role==='host'?hostShoot(0,rt,G.aim):send({t:'shoot',rt,a:G.aim});msg('Выстрел! Ждём исход…');ui()}
 else if(G.phase==='count'){msg('Рано! Жди «ОГОНЬ!»');beep(150,.15,'sawtooth',.2)}}
$('fire').addEventListener('pointerdown',e=>{e.preventDefault();tryFire()});
addEventListener('keydown',e=>{if(e.key>='1'&&e.key<='9')setAim(+e.key-1);if(e.key===' '||e.key==='Enter')tryFire()});

function reveal(p,a,mode){if(G.rev[p])return;G.rev[p]=1;const me=p===G.me,c=a%3,r=a/3|0,from=me?wp(fm):wp(OU.mz);
 if(!me){bang(.7);boom(from);OU.arm.rotation.x=-.3;setTimeout(()=>OU.arm.rotation.x=0,250)}
 const to=mode==='hit'?(me?wp(opp).add(V3(0,1.3,.3)):V3(0,1.65,.1)):mode==='collide'?V3(0,1.5,-3.3):missPt(c,r,!me);
 tracer(from,to,.2,()=>puff(to,mode==='hit'?0xcc2222:mode==='collide'?0xffd060:0xd9b27c,mode==='collide'?3:1.3))}
function cMiss(m){const me=m.p===G.me;reveal(m.p,m.a,'miss');G.phase='dodge';G.missed=m.p;
 if(me){G.ammo=0;big('МИМО!');msg('Патроны кончились. Уклоняйся — меняй клетку!')}else{G.oppAmmo=0;big('ДОБЕЙ!');msg('Он промахнулся! Его клетка видна сверху — стреляй')}ui()}
function cRes(r){G.phase='over';G.scores=r.sc;const me=G.me,mode=p=>r.k==='both'?'collide':(r.k==='win'&&r.w===p)?'hit':'miss';
 [0,1].forEach(p=>{if(r.sh[p]!=null)reveal(p,r.sh[p],mode(p))});
 let T,S,cl,good=0;
 if(r.k==='win'){const iw=r.w===me;good=iw;T=iw?'ПОБЕДА!':'ПОРАЖЕНИЕ';cl=iw?'w':'l';
  S=r.why==='first'?(iw?'Выстрелил первым и попал — победа труса 😏':'Соперник выстрелил первым и попал — победа труса'):(iw?'Ты добил промахнувшегося соперника':'Ты промахнулся, и тебя добили');
  setTimeout(()=>{if(iw){oppDead=1;hatV.set(R(-1,1),5,R(-2,-1))}else{meDead=1;$('red').classList.add('on')}},230)}
 else if(r.k==='both'){good=1;T='ОБА ПОБЕДИЛИ!';cl='w';S='Клетки совпали, выстрелы одновременно. Уважение!'}
 else if(r.k==='draw'){T='ОБА ПРОМАХНУЛИСЬ';cl='d';S='Патроны кончились. Начинаем заново'}
 else{T='НИКТО НЕ СТРЕЛЯЛ';cl='d';S='Крепкие нервы… Новый отсчёт'}
 setTimeout(()=>{$('bt').textContent=T;$('bs').textContent=S;$('banner').className='on '+cl;big('');msg('');
  (good?[523,659,784]:cl==='l'?[330,260,196]:[392,392]).forEach((f,i)=>setTimeout(()=>beep(f,.25,'triangle',.25),i*140))},650);ui()}
