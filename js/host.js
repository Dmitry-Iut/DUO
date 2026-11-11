'use strict';
const clearT=()=>{clearTimeout(H.T);clearTimeout(H.W);clearTimeout(H.D);H.W=0};
function hostStart(){H={phase:'idle',shots:[null,null],aims:[4,4],sc:[0,0]};send({t:'start'});beginMatch();H.T=setTimeout(hostRound,1800)}
function hostRound(){if(!conn)return;clearT();Object.assign(H,{phase:'count',shots:[null,null],aims:[4,4],missed:null});send({t:'round'});cRound();
 const seq=[];let l=0;for(let i=RI(3,6);i>0;i--){let v;do v=RI(1,10);while(v===l);l=v;seq.push({n:v,d:R(550,1050)})}seq.push({n:1,d:R(600,1500)});
 let i=0;const nx=()=>{if(i<seq.length){const s=seq[i++];send({t:'tick',n:s.n});cTick(s.n);H.T=setTimeout(nx,s.d)}
  else{H.phase='live';send({t:'go'});cGo();H.T=setTimeout(()=>fin('none'),GO_T)}};H.T=setTimeout(nx,1500)}
function hostAim(p,c){H.aims[p]=c;if(H.phase==='dodge'&&H.missed===p){p===0?send({t:'oaim',c}):oppAim(c)}}
function hostShoot(p,t,a){const o=1-p;
 if(H.phase==='dodge'){if(p===H.missed||H.shots[p])return;H.shots[p]={t,a};fin(a===H.aims[o]?'win':'draw',p,'finish');return}
 if(H.phase!=='live'||H.shots[p])return;H.aims[p]=a;H.shots[p]={t,a,s:H.aims[o]};clearTimeout(H.T);
 if(!H.W)H.W=setTimeout(resolve,SIM+Math.min(rtt,600)/2+90)}
function resolve(){H.W=0;const[a,b]=H.shots;
 if(a&&b&&Math.abs(a.t-b.t)<=SIM){fin(a.a===b.a?'both':'draw');return}
 const f=a&&b?(a.t<=b.t?0:1):(a?0:1),o=1-f,sf=H.shots[f];
 if(sf.a===sf.s){fin('win',f,'first');return}
 if(H.shots[o]){fin(H.shots[o].a===H.shots[o].s?'win':'draw',o,'finish');return}
 H.phase='dodge';H.missed=f;send({t:'miss',p:f,a:sf.a});cMiss({p:f,a:sf.a});H.D=setTimeout(()=>fin('none'),DODGE_T)}
function fin(k,w,why){if(H.phase==='over')return;clearT();H.phase='over';if(k==='win')H.sc[w]++;if(k==='both'){H.sc[0]++;H.sc[1]++}
 const r={t:'res',k,w,why,sh:H.shots.map(s=>s?s.a:null),sc:H.sc.slice()};send(r);cRes(r);H.T=setTimeout(hostRound,NEXT)}
