'use strict';
let peer,conn,role,H={},rtts=[],rtt=80;
const G={me:0,phase:'menu',aim:4,ammo:1,oppAmmo:1,fired:false,missed:null,goAt:0,scores:[0,0],rev:[0,0]};
const send=m=>{try{conn&&conn.open&&conn.send(m)}catch(e){}};
const big=t=>{const b=$('big');b.textContent=t;b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')},msg=t=>$('msg').textContent=t;
function show(id){['menu','lobby','game','rules'].forEach(x=>$(x).classList.toggle('on',x===id))}
function ui(){const can=(G.phase==='live'&&!G.fired)||(G.phase==='dodge'&&G.missed===1-G.me&&!G.fired),f=$('fire');
 f.className=can?'ready':G.phase==='count'?'':'off';f.textContent=can?'ОГОНЬ!':G.phase==='count'?'ЖДИ':'—';
 [...$('pad').children].forEach((c,i)=>c.classList.toggle('on',i===G.aim));
 const s=Math.min(innerWidth*.16,74);$('xh').style.transform=`translate(calc(-50% + ${(G.aim%3-1)*s}px),calc(-50% + ${((G.aim/3|0)-1)*s*.8}px))`;
 $('am').textContent=G.ammo?'●':'○';$('ao').textContent=G.oppAmmo?'●':'○';$('s0').textContent=G.scores[G.me];$('s1').textContent=G.scores[1-G.me];
 $('og').style.display=G.phase==='dodge'?'grid':'none'}
const GL=['↖','↑','↗','←','●','→','↙','↓','↘'];
for(let i=0;i<9;i++){const b=document.createElement('button');b.textContent=GL[i];b.addEventListener('pointerdown',e=>{e.preventDefault();setAim(i)});$('pad').appendChild(b);$('og').appendChild(document.createElement('i'))}
const oppAim=c=>[...$('og').children].forEach((e,i)=>e.classList.toggle('on',i===c));
