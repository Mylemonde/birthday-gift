// 照片墙43.5秒开始，预留3.2秒展开，完整停留15秒，61.7秒淡出，63.2秒显示最终生日照片。
// 背景音乐：将格格《生日祝福歌》音频放在 HTML 同目录，并命名为 birthday-music.mp3。
const birthdayMusic = new Audio(MUSIC_URL);
birthdayMusic.loop = true;
birthdayMusic.volume = MUSIC_VOLUME;
birthdayMusic.preload = 'none';
function startBirthdayMusic() {
  birthdayMusic.currentTime=0;
  birthdayMusic.play().catch(()=> {
  }
  );
}
// 爱心照片墙：按顺序填写24张照片的路径，图片与HTML放在同一文件夹。
// 4 + 6 + 6 + 4 + 3 + 1 = 24 张。
const heartColumns=[[1,2,4,5],[.5,1.5,2.5,3.5,4.5,5.5],[.5,1.5,2.5,3.5,4.5,5.5],[1.5,2.5,3.5,4.5],[2,3,4],[3]];
const wall=document.querySelector('#wall');
let photoIndex=0;
heartColumns.forEach((columns,row)=>columns.forEach(col=> {
  let i=photoIndex++,src=PHOTO_WALL[i],el=document.createElement('div');
  el.className='memory heart-memory'+(src?'':' empty');
  el.style.setProperty('--x',(col/7*100)+'%');
  el.style.setProperty('--y',(row/6*100)+'%');
  el.style.setProperty('--w','13.3%');
  el.style.setProperty('--h','15.8%');
  el.style.setProperty('--r',((i%5-2)*1.2)+'deg');
  el.style.setProperty('--delay',(.1+row*.16+(i%4)*.06)+'s');
  if(src) {
    let img=document.createElement('img');
    img.src=src;
    img.alt='我们的回忆 '+(i+1);
    el.appendChild(img)
  }
  else {
    let heart=document.createElement('span');
    heart.textContent='♡';
    el.appendChild(heart);
    let num=document.createElement('small');
    num.textContent=String(i+1).padStart(2,'0');
    el.appendChild(num)
  }
  wall.appendChild(el)
}
));
// 文字与场景在同一帧更新，无等待、无错峰延迟。
let textAnimations = [];
function texts(heading, description) {
  textAnimations.forEach(animation => animation.cancel());
  textAnimations = [];
  title.textContent = heading;
  sub.textContent = description;
  const copy = document.querySelector('.copy');
  copy.style.transition = 'none';
  copy.style.opacity = heading ? '1' : '0';
  if (!heading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  textAnimations = [title, sub].map(element => element.animate([
    { opacity: 0.5, transform: 'translateY(6px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], {
    duration: 400,
    easing: 'ease-out',
    fill: 'both'
  }));
}
function go() {
  startBirthdayMusic();
  running=true;
  start=performance.now();
  scene='';
  lastDigit='';
  photo.classList.remove('show');
  document.body.className='opened playing'
}
document.querySelector('#replay').onclick=go;
document.querySelector('#gift').onclick=()=> {
  startBirthdayMusic();
  document.querySelector('#gift').disabled=true;
  document.body.classList.add('unwrapping');
  setTimeout(go,750)
}
;
function render(now) {
  ctx.globalAlpha=1;
  ctx.globalCompositeOperation='source-over';
  ctx.fillStyle='#030207';
  ctx.fillRect(0,0,W,H);
  let sec=running?(now-start)/1000:-1,black=false;
  if(!black) {
    let glow=ctx.createRadialGradient(W/2,H*.55,0,W/2,H*.55,Math.max(W,H)*.65);
    glow.addColorStop(0,'#291126');
    glow.addColorStop(.6,'#0c0713');
    glow.addColorStop(1,'#030207');
    ctx.fillStyle=glow;
    ctx.fillRect(0,0,W,H);
    for(let i=0;
    i<stars.length;
    i++) {
      let s=stars[i];
      ctx.globalAlpha=.15+.25*Math.pow(Math.sin(now*.0006+i),2);
      ctx.fillStyle='#ebc8df';
      ctx.fillRect(s.x*W,s.y*H,1,1)
    }
  }
  ctx.globalAlpha=1;
  if(sec<0) {
    ctx.textAlign='center';
    ctx.font='110px Georgia';
    ctx.fillStyle='#e8b6d0';
    ctx.shadowColor='#df8db8';
    ctx.shadowBlur=30;
    ctx.fillText('♡',W/2,H*.57);
    ctx.shadowBlur=0;
    requestAnimationFrame(render);
    return
  }
  let next=sec<5?'heart':sec<12?'fall':sec<28.5?'flowers':sec<29.5?'black':sec<33.5?'count':sec<43.5?'cake':sec<61.7?'photo':sec<63.2?'wall-exit':'finale';
  if(next!==scene) {
    scene=next;
    if(scene==='heart')texts('让所有心动，在此刻绽放','这一场烟火，只为你');
    if(scene==='fall')texts('烟火落下，爱意成花','把每一缕喜欢，都送给你');
    if(scene==='flowers')texts('这一束花，永远为你盛开','愿你被温柔与偏爱包围');
    if(scene==='black'||scene==='count')texts('','');
    if(scene==='cake')texts('22岁，生日快乐','闭上眼睛，许一个甜甜的愿望');
    if (scene === 'wall-exit') texts('', '');
    if (scene === 'finale') texts('豆小雨生日快乐！', '愿你被爱包围，勇敢做自己，快乐不止今天。');
    if(scene==='photo') {
      texts('我的偏爱，永远是你','愿每一岁的你，都快乐、自由、闪闪发光');
      photo.classList.add('show');
      document.body.classList.add('wall-visible')
    }
  }
  if (scene === 'wall-exit') document.body.classList.add('wall-exit');
  if (scene === 'finale') document.body.classList.add('finale-visible');
  if(scene==='count') {
    let digit=String(3-Math.min(2,Math.floor((sec-29.5)/(4/3))));
    if(digit!==lastDigit) {
      lastDigit=digit;
      count.textContent=digit;
      count.classList.remove('pulse');
      void count.offsetWidth;
      count.classList.add('pulse')
    }
  }
  else {
    count.classList.remove('pulse');
    count.textContent=''
  }
  if(!black) {
    ctx.save();
    ctx.translate(W/2,H*.54);
    ctx.scale(S,S);
    ctx.globalCompositeOperation='lighter';
    let rot=Math.sin(now*.00035)*.22;
    if(sec<43.5) {
      for(let i=0;
      i<N;
      i++) {
        let h=heart[i],r=roses[i],p,x,y,z,col,alpha=1;
        if(sec<1.25) {
          let t=ease(sec/1.25);
          x=Math.sin(i)*(.7+rnd(i)*2);
          y=mix(400,-100,t)+(i%90)*.25;
          z=0;
          col='#ffe7b9';
          alpha=(i%25===0?1:.05)
        }
        else if(sec<5) {
          let age=sec-1.25,t=1-Math.exp(-age*2.6);
          x=h.x*t;
          y=-100+(h.y+100)*t+Math.max(0,age-1.6)**2*12;
          z=h.z;
          col=i%3?'#f5a6d0':'#fff0d8';
          alpha=.55+.4*rnd(i)
        }
        else if(sec<12) {
          let t=ease((sec-5)/7),swirl=Math.sin(t*Math.PI);
          x=mix(h.x,r.x,t)+Math.sin(i*2.4)*swirl*55;
          y=mix(h.y+38,r.y,t)+Math.sin(t*Math.PI)*85+rnd(i)*swirl*40;
          z=mix(h.z,r.z,t);
          col=t>.45?r.col:h.col;
          alpha=.65
        }
        else if(sec<28.5) {
          p=r;
          x=p.x;
          y=p.y;
          z=p.z;
          col=p.col;
          alpha=(.5+.5*Math.pow(Math.sin(now*.002+i*1.7),2))*(1-ease((sec-27)/1.5))
        }
        else if(sec>=33.5) {
          let t=ease((sec-33.5)/3.5);
          p=cake[(i*7)%cake.length];
          x=mix((rnd(i+6)-.5)*1000,p.x,t);
          y=mix((rnd(i+8)-.5)*850,p.y,t);
          z=p.z;
          col=p.col;
          alpha=t*(.65+.35*Math.pow(Math.sin(now*.0016+i),2))
        }
        else continue;
        let perspective=850/(850-z);
        let px=(x*Math.cos(rot)+z*Math.sin(rot))*perspective;
        y=(y+z*Math.sin(rot*.35))*perspective;
        let depth=1+(z/1000);
        ctx.globalAlpha=alpha*(sec>=9&&sec<28.5?1-ease((sec-9)/3):1);
        ctx.fillStyle=col;
        let dot=(.38+rnd(i+100)*.55)*depth;
        ctx.fillRect(px,y,dot,dot);
        if(i%83===0) {
          ctx.globalAlpha=alpha*.18;
          ctx.fillRect(px-2,y,5,.5);
          ctx.fillRect(px,y-2,.5,5)
        }
      }
      if(sec>=9&&sec<28.5)drawProvidedRose(now,sec);
      if(sec>=33.5) {
        let solid=ease((sec-35)/2.5);
        ctx.save();
        ctx.globalCompositeOperation='source-over';
        ctx.globalAlpha=solid*.94;
        if(cakeReference.complete&&cakeReference.naturalWidth)ctx.drawImage(cakeReference,-233,-280,466,560);
        ctx.restore();
        let a=ease((sec-33.5)/3.5);
        ctx.globalAlpha=a;
        ctx.shadowBlur=18;
        ctx.shadowColor='#ffb23f';
        ctx.fillStyle='#ffe5a2';
        for(let x of []) {
          ctx.beginPath();
          ctx.ellipse(x,-261,3.2,8+Math.sin(now*.014+x),0,0,7);
          ctx.fill()
        }
        ctx.shadowBlur=0
      }
    }
    else {
      let t=clamp((sec-43.5)/3);
      for(let i=0;
      i<1100;
      i++) {
        let p=cake[i*7%cake.length],x=p.x+(rnd(i)-.5)*t*650,y=p.y-t*100;
        ctx.globalAlpha=(1-t)*.6;
        ctx.fillStyle=p.col;
        ctx.fillRect(x,y,1,1)
      }
    }
    ctx.restore()
  }
  ctx.globalAlpha=1;
  document.querySelector('#bar').style.width=clamp(sec/65.7)*100+'%';
  if(sec>=65.7) {
    document.body.classList.add('done')
  }
  requestAnimationFrame(render)
}
requestAnimationFrame(render);
