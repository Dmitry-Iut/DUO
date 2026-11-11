'use strict';
let AC,MG,muted=false;
function nb(s){const b=AC.createBuffer(1,AC.sampleRate*s,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b}
function aInit(){if(AC){AC.resume&&AC.resume();return}const C=window.AudioContext||window.webkitAudioContext;if(!C)return;AC=new C();MG=AC.createGain();MG.connect(AC.destination);
 const s=AC.createBufferSource();s.buffer=nb(2);s.loop=true;const f=AC.createBiquadFilter();f.type='bandpass';f.frequency.value=500;const g=AC.createGain();g.gain.value=.04;s.connect(f);f.connect(g);g.connect(MG);s.start()}
function beep(fq,du,ty='sine',v=.25){if(!AC)return;const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=ty;o.frequency.value=fq;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+du);o.connect(g);g.connect(MG);o.start(t);o.stop(t+du+.05)}
function bang(v=1){if(!AC)return;const t=AC.currentTime,s=AC.createBufferSource();s.buffer=nb(.6);const f=AC.createBiquadFilter();f.frequency.setValueAtTime(5000,t);f.frequency.exponentialRampToValueAtTime(150,t+.4);const g=AC.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+.5);s.connect(f);f.connect(g);g.connect(MG);s.start(t);
 const o=AC.createOscillator(),og=AC.createGain();o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(40,t+.25);og.gain.setValueAtTime(v,t);og.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(og);og.connect(MG);o.start(t);o.stop(t+.35)}
document.addEventListener('pointerdown',aInit);
