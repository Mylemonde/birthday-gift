// 全程背景粒子流星雨：从礼物封面一直持续到照片墙。
const meteorCanvas=document.querySelector('#meteorSky'),mc=meteorCanvas.getContext('2d');
let meteorW=0,meteorH=0,meteorLast=0;
const meteors=[];
function meteorResize() {
  meteorW=innerWidth;
  meteorH=innerHeight;
  let d=Math.min(devicePixelRatio||1,2);
  meteorCanvas.width=meteorW*d;
  meteorCanvas.height=meteorH*d;
  mc.setTransform(d,0,0,d,0,0)
}
meteorResize();
addEventListener('resize',meteorResize);
function newMeteor(initial=false) {
  let speed=90+Math.random()*140;
  return  {
    x:Math.random()*(meteorW+meteorH*.65),y:initial?Math.random()*meteorH:-80-Math.random()*meteorH*.5,vx:-speed*.58,vy:speed,len:35+Math.random()*75,r:.6+Math.random()*.85,a:.12+Math.random()*.23,h:Math.random()<.6?328:230
  }
}
for(let i=0;
i<METEOR_COUNT;
i++)meteors.push(newMeteor(true));
function meteorFrame(now) {
  let dt=meteorLast?Math.min((now-meteorLast)/1000,.05):0;
  meteorLast=now;
  mc.clearRect(0,0,meteorW,meteorH);
  meteorCanvas.classList.toggle('cover-weather',!document.body.classList.contains('opened'));
  for(let i=0;
  i<meteors.length;
  i++) {
    let m=meteors[i];
    m.x+=m.vx*dt;
    m.y+=m.vy*dt;
    if(m.y>meteorH+150||m.x< -150) {
      meteors[i]=newMeteor();
      continue
    }
    let tx=m.x+m.len*.5,ty=m.y-m.len,g=mc.createLinearGradient(m.x,m.y,tx,ty);
    g.addColorStop(0,`hsla(${m.h},75%,90%,${m.a})`);
    g.addColorStop(.28,`hsla(${m.h},65%,80%,${m.a*.55})`);
    g.addColorStop(1,`hsla(${m.h},60%,80%,0)`);
    mc.strokeStyle=g;
    mc.lineWidth=m.r;
    mc.beginPath();
    mc.moveTo(tx,ty);
    mc.lineTo(m.x,m.y);
    mc.stroke();
    mc.fillStyle=`rgba(255,235,247,${m.a*1.5})`;
    mc.shadowColor='#eab6dd';
    mc.shadowBlur=6;
    mc.beginPath();
    mc.arc(m.x,m.y,m.r,0,7);
    mc.fill();
    mc.shadowBlur=0;
    for(let j=1;
    j<6;
    j++) {
      let t=j/6;
      mc.globalAlpha=(1-t)*m.a;
      mc.fillStyle='#efc9e4';
      mc.fillRect(m.x+m.len*.5*t+Math.sin(i+j)*2,m.y-m.len*t,1,1)
    }
    mc.globalAlpha=1
  }
  requestAnimationFrame(meteorFrame)
}
requestAnimationFrame(meteorFrame);
