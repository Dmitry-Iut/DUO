'use strict';
let last=performance.now(),T0=0;
function loop(now){requestAnimationFrame(loop);const dt=Math.min((now-last)/1000,.05);last=now;T0+=dt;
 const c=G.aim%3,r=G.aim/3|0,k=Math.min(dt*8,1);
 cam.rotation.y+=(-(c-1)*.05-cam.rotation.y)*k;
 if(meDead){cam.rotation.x+=(.9-cam.rotation.x)*dt*3;cam.rotation.z+=(.5-cam.rotation.z)*dt*3;cam.position.y+=(.45-cam.position.y)*dt*3}
 else{cam.rotation.x+=((1-r)*.035-cam.rotation.x)*k;cam.rotation.z+=(0-cam.rotation.z)*k;cam.position.y+=(1.65-cam.position.y)*k}
 shk=Math.max(0,shk-dt*3);cam.position.x=(Math.random()-.5)*shk*.12;
 rec=Math.max(0,rec-dt*5);fg.position.z=-.45+rec*.09;fg.rotation.x=rec*.35+(1-r)*.08;fg.rotation.y+=(-(c-1)*.1-fg.rotation.y)*k;
 opp.rotation.z=Math.sin(T0*1.5)*.02;OU.arm.rotation.z=Math.sin(T0*3)*.02;
 if(oppDead){opp.rotation.x=Math.max(opp.rotation.x-dt*4,-1.55);OU.hat.position.addScaledVector(hatV,dt);hatV.y-=12*dt;OU.hat.rotation.z+=dt*8;if(OU.hat.position.y<.05){OU.hat.position.y=.05;hatV.set(0,0,0)}}
 fl.intensity=fa*5;fa=Math.max(0,fa-dt*12);
 for(let i=fx.length-1;i>=0;i--)if(!fx[i](dt))fx.splice(i,1);
 tw.position.x+=dt*1.5;if(tw.position.x>12)tw.position.x=-12;tw.rotation.z-=dt*3;tw.position.y=.4+Math.abs(Math.sin(T0*4))*.15;
 for(let i=0;i<300;i+=3){dp[i]+=dt*.6;if(dp[i]>12)dp[i]=-12}dg.attributes.position.needsUpdate=true;
 rd.render(sc,cam)}
requestAnimationFrame(loop);ui();
