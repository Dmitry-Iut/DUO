'use strict';
const OB=[[0,0,6,1.2,2.2],[-8,-6,2,2,1.6],[8,-6,2,2,1.6],[-8,6,2,2,1.6],[8,6,2,2,1.6],[-14,0,1.2,6,2.4],[14,0,1.2,6,2.4],[0,-11,4,1.2,1.6],[0,11,4,1.2,1.6]];
const WL=[[0,-20.5,42,1],[0,20.5,42,1],[-20.5,0,1,42],[20.5,0,1,42]];
{const ar=new THREE.Mesh(new THREE.PlaneGeometry(40,40),M(0xd6a468));ar.rotation.x=-Math.PI/2;ar.position.y=.02;sc.add(ar)}
OB.forEach(o=>bx(o[2],o[4],o[3],M(0x8b5a2b),o[0],o[4]/2,o[1]));WL.forEach(w=>bx(w[2],3,w[3],M(0x5a3418),w[0],1.5,w[1]));
const box=(o,h)=>({x0:o[0]-o[2]/2,x1:o[0]+o[2]/2,z0:o[1]-o[3]/2,z1:o[1]+o[3]/2,y1:h||o[4]});
const B=OB.map(o=>box(o)).concat(WL.map(w=>box(w,3)));
const PK=[[-17,-17],[17,-17],[-17,17],[17,17],[-5,-14],[5,14],[-5,3],[5,-3],[-11,-11],[11,11],[-11,11],[11,-11],[0,-6],[0,6]];
const pkM=new THREE.MeshLambertMaterial({color:0xffd23a,emissive:0x7a5200}),pkT=PK.map(()=>0);
const pk=PK.map(p=>{const g=new THREE.Group();bx(.5,.3,.34,pkM,0,0,0,g);bx(.08,.34,.36,M(0x333333),0,0,0,g);g.position.set(p[0],.6,p[1]);sc.add(g);return g});
function collide(p){p.x=Math.max(-ARENA,Math.min(ARENA,p.x));p.z=Math.max(-ARENA,Math.min(ARENA,p.z));
 for(const b of B){const cx=Math.max(b.x0,Math.min(p.x,b.x1)),cz=Math.max(b.z0,Math.min(p.z,b.z1)),dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;
  if(d2<RAD*RAD){if(d2>1e-6){const d=Math.sqrt(d2),k=(RAD-d)/d;p.x+=dx*k;p.z+=dz*k}
   else{const l=p.x-b.x0,r=b.x1-p.x,t=p.z-b.z0,q=b.z1-p.z,m=Math.min(l,r,t,q);if(m===l)p.x=b.x0-RAD;else if(m===r)p.x=b.x1+RAD;else if(m===t)p.z=b.z0-RAD;else p.z=b.z1+RAD}}}}
function rayBox(o,d,b){let t0=0,t1=1e9;const mn=[b.x0,0,b.z0],mx=[b.x1,b.y1,b.z1];
 for(let i=0;i<3;i++){if(Math.abs(d[i])<1e-8){if(o[i]<mn[i]||o[i]>mx[i])return Infinity}
  else{let a=(mn[i]-o[i])/d[i],c=(mx[i]-o[i])/d[i];if(a>c){const x=a;a=c;c=x}t0=Math.max(t0,a);t1=Math.min(t1,c);if(t0>t1)return Infinity}}return t0}
function rayWorld(o,d){let t=60;for(const b of B)t=Math.min(t,rayBox(o,d,b));if(d[1]<-1e-4)t=Math.min(t,-o[1]/d[1]);return t}
function rayPlayer(o,d,px,pz){const ox=o[0]-px,oz=o[2]-pz,a=d[0]*d[0]+d[2]*d[2];if(a<1e-8)return Infinity;
 const b=ox*d[0]+oz*d[2],c=ox*ox+oz*oz-.55*.55,disc=b*b-a*c;if(disc<0)return Infinity;const t=(-b-Math.sqrt(disc))/a;if(t<0)return Infinity;const y=o[1]+d[1]*t;return y>=0&&y<=1.9?t:Infinity}
const dirOf=(yw,pt)=>{const c=Math.cos(pt);return[-Math.sin(yw)*c,Math.sin(pt),-Math.cos(yw)*c]};
