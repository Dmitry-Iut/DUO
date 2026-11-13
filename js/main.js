'use strict';
let last=performance.now(),T0=0,sendT=0;cam.rotation.order='YXZ';
function loop(now){requestAnimationFrame(loop);const dt=Math.min((now-last)/1000,.05);last=now;T0+=dt;let mvn=0;
 if(G.phase==='play'&&!P.dead){const f=-mv.y,s=mv.x,c=Math.cos(P.yaw),n=Math.sin(P.yaw);mvn=Math.hypot(f,s);
  P.x+=(-n*f+c*s)*SPEED*dt;P.z+=(-c*f-n*s)*SPEED*dt;collide(P);P.cd=Math.max(0,P.cd-dt);if(fireHeld)shoot();
  pk.forEach((m,i)=>{if(m.visible&&Math.hypot(m.position.x-P.x,m.position.z-P.z)<.9){m.visible=false;pkT[i]=PK_RESPAWN;P.ammo=Math.min(AMMOMAX,P.ammo+AMMO_PICK);send({t:'k',i});beep(700,.12,'triangle',.3);ui()}})}
 pk.forEach((m,i)=>{if(!m.visible){pkT[i]-=dt;if(pkT[i]<=0)m.visible=true}else{m.rotation.y+=dt*2;m.position.y=.6+Math.sin(T0*3+i)*.08}});
 if(G.phase!=='menu'){sendT+=dt;if(sendT>.05){sendT=0;send({t:'s',x:+P.x.toFixed(2),z:+P.z.toFixed(2),y:+P.yaw.toFixed(3)})}}
 const k=Math.min(dt*14,1);let dy=O.ty-O.yaw;dy=Math.atan2(Math.sin(dy),Math.cos(dy));O.yaw+=dy*k;const ox=O.x;O.x+=(O.tx-O.x)*k;O.z+=(O.tz-O.z)*k;
 opp.position.set(O.x,Math.abs(Math.sin(T0*10))*Math.min(Math.hypot(O.x-ox,0)*30,.08),O.z);opp.rotation.y=O.yaw+Math.PI;
 if(meDead){cam.rotation.x+=(.9-cam.rotation.x)*dt*3;cam.rotation.z+=(.5-cam.rotation.z)*dt*3;cam.position.y+=(.45-cam.position.y)*dt*3}
 else{cam.rotation.x=P.pit;cam.rotation.z=0;cam.position.y=1.6+Math.sin(T0*10)*.035*Math.min(mvn,1)}
 cam.rotation.y=P.yaw;shk=Math.max(0,shk-dt*3);cam.position.x=P.x+(Math.random()-.5)*shk*.12;cam.position.z=P.z;
 rec=Math.max(0,rec-dt*5);fg.position.z=-.45+rec*.09;fg.rotation.x=rec*.35;
 if(oppDead){opp.rotation.x=Math.max(opp.rotation.x-dt*4,-1.55);OU.hat.position.addScaledVector(hatV,dt);hatV.y-=12*dt;OU.hat.rotation.z+=dt*8;if(OU.hat.position.y<.05){OU.hat.position.y=.05;hatV.set(0,0,0)}}
 OU.arm.rotation.z=Math.sin(T0*3)*.02;fl.intensity=fa*5;fa=Math.max(0,fa-dt*12);
 for(let i=fx.length-1;i>=0;i--)if(!fx[i](dt))fx.splice(i,1);
 for(let i=0;i<300;i+=3){dp[i]+=dt*.6;if(dp[i]>12)dp[i]=-12}dg.attributes.position.needsUpdate=true;
 rd.render(sc,cam)}
requestAnimationFrame(loop);ui();
