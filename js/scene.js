'use strict';
const rd=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});rd.setPixelRatio(Math.min(devicePixelRatio||1,2));
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(58,1,.05,400);cam.position.set(0,1.65,0);sc.add(cam);sc.fog=new THREE.Fog(0xe8a263,15,85);
function resize(){rd.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',resize);resize();
const M=c=>new THREE.MeshLambertMaterial({color:c}),V3=(x,y,z)=>new THREE.Vector3(x,y,z),wp=o=>o.getWorldPosition(new THREE.Vector3());
const bx=(w,h,d,m,x,y,z,p)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);(p||sc).add(o);return o};
sc.add(new THREE.HemisphereLight(0xffd9a8,0x7a4a2a,.95));const dl=new THREE.DirectionalLight(0xffb070,.9);dl.position.set(8,9,6);sc.add(dl);
const fl=new THREE.PointLight(0xffc060,0,14);sc.add(fl);
{const c=document.createElement('canvas');c.width=2;c.height=256;const x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,256);
 g.addColorStop(0,'#2d3a6b');g.addColorStop(.3,'#d8664a');g.addColorStop(.5,'#f7bd72');g.addColorStop(1,'#f7bd72');x.fillStyle=g;x.fillRect(0,0,2,256);
 sc.add(new THREE.Mesh(new THREE.SphereGeometry(250,16,16),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),side:THREE.BackSide,fog:false})));
 const sun=new THREE.Mesh(new THREE.SphereGeometry(14,16,16),new THREE.MeshBasicMaterial({color:0xfff0b8,fog:false}));sun.position.set(-40,22,-200);sc.add(sun);
 const g1=new THREE.Mesh(new THREE.PlaneGeometry(500,500),M(0xc68e55));g1.rotation.x=-Math.PI/2;sc.add(g1);
 const st=new THREE.Mesh(new THREE.PlaneGeometry(7,120),M(0xb37a44));st.rotation.x=-Math.PI/2;st.position.set(0,.01,-40);sc.add(st)}
const tm=M(0x6b3f1f),cm=M(0x3f7a3a);
function cactus(x,z,s){const g=new THREE.Group();bx(.35,2,.35,cm,0,1,0,g);bx(.7,.2,.2,cm,.4,1.1,0,g);bx(.2,.7,.2,cm,.7,1.4,0,g);bx(.7,.2,.2,cm,-.4,.8,0,g);bx(.2,.6,.2,cm,-.7,1.05,0,g);g.position.set(x,0,z);g.scale.setScalar(s);sc.add(g)}
[[-60,-120,30,20],[50,-140,40,28],[0,-170,50,16],[-110,-150,40,24]].forEach(a=>bx(a[2],a[3],20,M(0xb5532e),a[0],a[3]/2,a[1]));
const dp=new Float32Array(300);for(let i=0;i<300;i+=3){dp[i]=R(-12,12);dp[i+1]=R(.2,4);dp[i+2]=R(-14,2)}
const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(dp,3));sc.add(new THREE.Points(dg,new THREE.PointsMaterial({color:0xffe2b0,size:.07,transparent:true,opacity:.6})));

function cowboy(){const g=new THREE.Group(),sk=M(0xe0a878),sh=M(0xb33a2a),vs=M(0x5a3418),pn=M(0x34507a),ht=M(0x7a4a22),bl=M(0x222222);
 bx(.24,.85,.26,pn,-.16,.5,0,g);bx(.24,.85,.26,pn,.16,.5,0,g);bx(.27,.18,.38,bl,-.16,.09,.05,g);bx(.27,.18,.38,bl,.16,.09,.05,g);
 bx(.62,.72,.36,sh,0,1.22,0,g);bx(.64,.5,.38,vs,0,1.12,0,g);bx(.7,.1,.4,bl,0,.9,0,g);
 bx(.34,.36,.34,sk,0,1.77,0,g);bx(.34,.12,.35,M(0xcc3333),0,1.66,.01,g);bx(.05,.05,.02,bl,-.08,1.8,.18,g);bx(.05,.05,.02,bl,.08,1.8,.18,g);
 const hat=new THREE.Group();bx(.8,.04,.8,ht,0,0,0,hat);bx(.38,.24,.38,ht,0,.14,0,hat);hat.position.set(0,1.95,0);g.add(hat);
 bx(.14,.6,.14,sh,-.4,1.2,0,g);
 const arm=new THREE.Group();arm.position.set(.4,1.42,0);g.add(arm);bx(.14,.14,.6,sh,0,0,.3,arm);bx(.12,.12,.12,sk,0,0,.64,arm);
 const gn=new THREE.Group();gn.position.set(0,.02,.66);arm.add(gn);bx(.05,.05,.32,M(0x999999),0,.03,.14,gn);bx(.06,.14,.07,M(0x4a2a10),0,-.06,-.02,gn);
 const mz=new THREE.Object3D();mz.position.set(0,.03,.32);gn.add(mz);g.userData={arm,hat,mz,h0:hat.position.clone()};return g}
const opp=cowboy();opp.position.set(0,0,-6.5);sc.add(opp);const OU=opp.userData;
const fg=new THREE.Group();cam.add(fg);fg.position.set(.12,-.17,-.45);
bx(.045,.05,.3,M(0x999999),0,0,-.12,fg);bx(.07,.07,.1,M(0x777777),0,-.005,.02,fg);bx(.05,.12,.06,M(0x5a3418),0,-.09,.07,fg);bx(.09,.09,.3,M(0xb33a2a),.02,-.17,.2,fg);
const fm=new THREE.Object3D();fm.position.set(0,0,-.29);fg.add(fm);

/* эффекты */
const fx=[];let rec=0,shk=0,fa=0,oppDead=0,meDead=0;const hatV=V3(0,0,0);
function tracer(a,b,dur,cb){const m=new THREE.Mesh(new THREE.BoxGeometry(.04,.04,.6),new THREE.MeshBasicMaterial({color:0xfff2a0,fog:false}));m.position.copy(a);m.lookAt(b);sc.add(m);let t=0;
 fx.push(dt=>{t+=dt;const k=Math.min(t/dur,1);m.position.lerpVectors(a,b,k);if(k>=1){sc.remove(m);cb&&cb();return false}return true})}
function puff(p,col,s){const m=new THREE.Mesh(new THREE.SphereGeometry(.25*s,8,8),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.8}));m.position.copy(p);sc.add(m);let t=0;
 fx.push(dt=>{t+=dt;m.scale.setScalar(1+t*5);m.material.opacity=Math.max(.8-t*1.6,0);if(t>.5){sc.remove(m);return false}return true})}
function boom(p){fl.position.copy(p);fa=1;puff(p,0xffd060,.6)}
function missPt(c,r,toMe){const x=c==1?(Math.random()<.5?-1:1)*.9:(c-1)*1.4,y=r==0?2.6:r==2?.05:1.3;return toMe?V3(x*.6,y*.7+.3,0):V3(x,y,-6.7)}
function resetFx(){oppDead=0;meDead=0;opp.rotation.x=0;OU.hat.position.copy(OU.h0);OU.hat.rotation.set(0,0,0);hatV.set(0,0,0);$('red').classList.remove('on')}

[[-26,-10],[26,-5],[-27,12],[25,15],[-24,-28],[8,-26],[-9,27],[27,-24]].forEach(a=>cactus(a[0],a[1],R(.9,1.5)));
