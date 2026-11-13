'use strict';
const mv={x:0,y:0},pt={joy:null,look:null};let fireHeld=false;
function spawn(){const g=role==='host';P.x=0;P.z=g?16:-16;P.yaw=g?0:Math.PI;P.pit=0;O.x=O.tx=0;O.z=O.tz=g?-16:16;O.yaw=O.ty=g?Math.PI:0}
function roundReset(){clearTimeout(G.rt);Object.assign(P,{hp:HP,ammo:AMMO0,cd:0,dead:false});Object.assign(O,{hp:HP,dead:false});spawn();resetFx();
 pk.forEach((m,i)=>{m.visible=true;pkT[i]=0});$('banner').classList.remove('on');G.phase='play';big('ВПЕРЁД!');msg('Собирай ящики 🔸 с патронами, прячься за укрытиями');setTimeout(()=>msg(''),4000);ui()}
function beginMatch(){G.s=[0,0];show('game');roundReset();try{navigator.wakeLock&&navigator.wakeLock.request('screen')}catch(e){}}
function shoot(){if(P.dead||G.phase!=='play'||P.cd>0)return;
 if(P.ammo<=0){P.cd=.3;beep(150,.1,'sawtooth',.2);msg('Нет патронов! Найди ящик 🔸');return}
 P.ammo--;P.cd=CD;bang(1);rec=1;shk=.3;const o=[P.x,1.6,P.z],d=dirOf(P.yaw,P.pit);send({t:'f',o,d});
 const tw=rayWorld(o,d),tp=rayPlayer(o,d,O.x,O.z),e=Math.min(tw,tp),from=wp(fm),to=V3(o[0]+d[0]*e,o[1]+d[1]*e,o[2]+d[2]*e);
 boom(from);tracer(from,to,Math.max(.05,from.distanceTo(to)/90),()=>puff(to,tp<tw?0xcc2222:0xd9b27c,.8));ui()}
function hurt(){shk=1;beep(120,.25,'sawtooth',.35);const r=$('red');r.classList.add('on');setTimeout(()=>{if(!P.dead)r.classList.remove('on')},220)}
function onFire(m){const o=m.o,d=m.d,tw=rayWorld(o,d),tp=(P.dead||G.phase!=='play')?Infinity:rayPlayer(o,d,P.x,P.z),e=Math.min(tw,tp),from=wp(OU.mz),to=V3(o[0]+d[0]*e,o[1]+d[1]*e,o[2]+d[2]*e);
 bang(Math.max(.25,1-Math.hypot(o[0]-P.x,o[2]-P.z)/40));boom(from);OU.arm.rotation.x=-.3;setTimeout(()=>OU.arm.rotation.x=0,150);
 tracer(from,to,Math.max(.05,from.distanceTo(to)/90),()=>puff(to,tp<tw?0xcc2222:0xd9b27c,.8));
 if(tp<tw){P.hp--;hurt();send({t:'h',hp:P.hp});if(P.hp<=0)die();ui()}}
function onHit(m){O.hp=m.hp;const x=$('xh');x.classList.add('hit');setTimeout(()=>x.classList.remove('hit'),150);beep(900,.08,'square',.2);ui()}
const onState=m=>{O.tx=m.x;O.tz=m.z;O.ty=m.y};
const onPick=i=>{pk[i].visible=false;pkT[i]=PK_RESPAWN};
function die(){P.dead=true;meDead=1;G.s[1]++;$('red').classList.add('on');send({t:'d'});endRound()}
function onOppDead(){O.dead=true;O.hp=0;oppDead=1;hatV.set(R(-1,1),5,R(-2,-1));G.s[0]++;endRound();ui()}
function endRound(){if(G.phase==='play'){G.phase='over';G.rt=setTimeout(roundReset,NEXT)}
 const a=P.dead,b=O.dead;$('bt').textContent=a&&b?'НИЧЬЯ':b?'ПОБЕДА!':'ПОРАЖЕНИЕ';$('bs').textContent=a&&b?'Вы подстрелили друг друга':b?'Соперник повержен':'У тебя не осталось сердец';
 $('banner').className='on '+(a&&b?'d':b?'w':'l');big('');msg('');setTimeout(()=>(b&&!a?[523,659,784]:[330,260,196]).forEach((f,i)=>setTimeout(()=>beep(f,.25,'triangle',.25),i*140)),300);ui()}
/* управление: левая часть экрана — джойстик, правая — поворот, кнопка — огонь */
const G_=$('game'),joy=$('joy'),knob=$('knob');
G_.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;G_.setPointerCapture(e.pointerId);
 if(e.clientX<innerWidth*.45){if(!pt.joy){pt.joy={id:e.pointerId,x:e.clientX,y:e.clientY};joy.style.display='block';joy.style.left=e.clientX+'px';joy.style.top=e.clientY+'px'}}
 else if(!pt.look)pt.look={id:e.pointerId,x:e.clientX,y:e.clientY}});
G_.addEventListener('pointermove',e=>{const j=pt.joy,l=pt.look;
 if(j&&j.id===e.pointerId){let dx=(e.clientX-j.x)/45,dy=(e.clientY-j.y)/45;const n=Math.hypot(dx,dy);if(n>1){dx/=n;dy/=n}mv.x=dx;mv.y=dy;knob.style.transform=`translate(${dx*45}px,${dy*45}px)`}
 else if(l&&l.id===e.pointerId){P.yaw-=(e.clientX-l.x)*.006;P.pit=Math.max(-.6,Math.min(.6,P.pit-(e.clientY-l.y)*.005));l.x=e.clientX;l.y=e.clientY}});
const up=e=>{if(pt.joy&&pt.joy.id===e.pointerId){pt.joy=null;mv.x=mv.y=0;joy.style.display='none';knob.style.transform=''}if(pt.look&&pt.look.id===e.pointerId)pt.look=null};
G_.addEventListener('pointerup',up);G_.addEventListener('pointercancel',up);
const fb=$('fire');fb.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();fireHeld=true;shoot()});
['pointerup','pointercancel','pointerleave'].forEach(n=>fb.addEventListener(n,()=>fireHeld=false));
