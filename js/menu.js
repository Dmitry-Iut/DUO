'use strict';
$('create').onclick=()=>{aInit();role='host';$('note').textContent='';host(0)};
$('join').onclick=()=>{aInit();const c=$('code').value.trim().toUpperCase();if(c.length<4){$('note').textContent='Введи 4 символа кода';return}joinRoom(c)};
$('cancel').onclick=()=>leave('');$('exit').onclick=()=>leave('Ты вышел из комнаты');
$('rb').onclick=()=>show('rules');$('rclose').onclick=()=>show('menu');
$('mute').onclick=()=>{muted=!muted;if(MG)MG.gain.value=muted?0:1;$('mute').textContent=muted?'🔇':'🔊'};
$('share').onclick=async()=>{const u=location.origin+location.pathname+'?room='+code;try{if(navigator.share)await navigator.share({title:'Дуэль',text:'Заходи в дуэль! Код: '+code,url:u});else{await navigator.clipboard.writeText(u);$('share').textContent='ССЫЛКА СКОПИРОВАНА'}}catch(e){}};
{const q=new URLSearchParams(location.search).get('room');if(q){$('code').value=q.slice(0,4).toUpperCase();setTimeout(()=>joinRoom($('code').value),300)}}
