'use strict';
function onData(m){switch(m.t){
 case'p':send({t:'q',s:m.s});break;
 case'q':{rtts.push(performance.now()-m.s);if(rtts.length>6)rtts.shift();rtt=[...rtts].sort((a,b)=>a-b)[rtts.length>>1];$('ping').textContent=Math.round(rtt)+' мс';break}
 case'start':beginMatch();break;case's':onState(m);break;case'f':onFire(m);break;case'h':onHit(m);break;case'k':onPick(m.i);break;case'd':onOppDead();break}}
function setupConn(){conn.on('open',()=>{const ping=()=>send({t:'p',s:performance.now()});ping();G.pi=setInterval(ping,1500);clearTimeout(G.jt);if(role==='host'){send({t:'start'});beginMatch()}});
 conn.on('data',onData);conn.on('close',gone);conn.on('error',gone)}
const gone=()=>{if(G.phase!=='menu')leave('Соперник отключился')};
function leave(t){const was=G.phase;G.phase='menu';clearTimeout(G.rt);clearInterval(G.pi);clearTimeout(G.jt);try{conn&&conn.close()}catch(e){}try{peer&&peer.destroy()}catch(e){}conn=peer=null;rtts=[];show('menu');$('note').textContent=t||''}
function genCode(){const a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<4;i++)s+=a[Math.random()*a.length|0];return s}
let code='';
function host(n){code=genCode();peer=new Peer(PFX+code);
 peer.on('open',()=>{$('rc').textContent=code;G.phase='lobby';show('lobby')});
 peer.on('connection',c=>{if(conn&&conn.open){c.close();return}conn=c;setupConn()});
 peer.on('disconnected',()=>{try{peer.reconnect()}catch(e){}});
 peer.on('error',e=>{if(e.type==='unavailable-id'&&n<5){try{peer.destroy()}catch(_){}host(n+1);return}if(conn&&conn.open)return;leave('Нет связи с сервером комнат ('+e.type+')')})}
function joinRoom(c){code=c;role='guest';$('note').textContent='Подключаемся…';peer=new Peer();
 peer.on('open',()=>{conn=peer.connect(PFX+code,{reliable:true});setupConn();G.jt=setTimeout(()=>{if(!conn||!conn.open)leave('Не удалось соединиться. Попробуйте одну Wi-Fi сеть')},15000)});
 peer.on('error',e=>{if(conn&&conn.open)return;leave(e.type==='peer-unavailable'?'Комната не найдена. Проверь код':'Ошибка сети ('+e.type+')')})}
