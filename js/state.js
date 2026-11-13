'use strict';
let peer,conn,role,rtts=[],rtt=80;
const G={me:0,phase:'menu',s:[0,0],rt:0};
const P={x:0,z:16,yaw:0,pit:0,hp:HP,ammo:AMMO0,cd:0,dead:false},O={x:0,z:-16,tx:0,tz:0,yaw:0,ty:0,hp:HP,dead:false};
const send=m=>{try{conn&&conn.open&&conn.send(m)}catch(e){}};
const big=t=>{const b=$('big');b.textContent=t;b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')},msg=t=>$('msg').textContent=t;
function show(id){['menu','lobby','game','rules'].forEach(x=>$(x).classList.toggle('on',x===id))}
const hearts=n=>'❤'.repeat(Math.max(n,0))+'♡'.repeat(HP-Math.max(n,0));
function ui(){$('hp0').textContent=hearts(P.hp);$('hp1').textContent=hearts(O.hp);$('s0').textContent=G.s[0];$('s1').textContent=G.s[1];$('ammo').textContent='🔸 '+P.ammo+' / '+AMMOMAX}
