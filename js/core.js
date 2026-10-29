// 照片在这里修改：填写图片文件名或路径，与 HTML 放在同一文件夹即可。
document.querySelector('#photo').src = PHOTO_URL;
const c=document.querySelector('#c'),ctx=c.getContext('2d'),title=document.querySelector('#title'),sub=document.querySelector('#sub'),photo=document.querySelector('#photo'),count=document.querySelector('#count');
let W,H,S;
function size() {
  W=innerWidth;
  H=innerHeight;
  let d=Math.min(devicePixelRatio||1,2);
  c.width=W*d;
  c.height=H*d;
  ctx.setTransform(d,0,0,d,0,0);
  S=Math.min(W/780,H*.62/640)
}
addEventListener('resize',size);
size();
function rnd(i) {
  let v=Math.sin(i*127.1+74.7)*43758.5453;
  return v-Math.floor(v)
}
const mix=(a,b,t)=>a+(b-a)*t,clamp=x=>Math.max(0,Math.min(1,x)),ease=x=> {
  x=clamp(x);
  return x*x*(3-2*x)
}
;
let N=10500,roses=[],cake=[],heart=[],running=false,start=0,scene='',lastDigit='';
const stars=Array.from( {
  length:100
}
,(_,i)=>( {
  x:rnd(i+2),y:rnd(i+302),r:rnd(i+982)
}
));
function point(x,y,z,col) {
  return  {
    x,y,z,col
  }
}
// Rose surfaces are sampled as curled, overlapping petals in three dimensions.
const flowers=[[-115,-119,59],[0,-173,65],[111,-115,61],[-63,-40,64],[69,-35,63],[-155,-8,43],[153,-12,44],[0,37,53]];
for(let i=0;
i<N;
i++) {
  let q=rnd(i+10),a=rnd(i+20)*Math.PI*2,p;
  if(q<.77) {
    let f=flowers[i%flowers.length],layer=Math.floor(rnd(i+30)*9),petals=5+layer,petal=Math.floor(rnd(i+34)*petals),u=rnd(i+40),v=rnd(i+42),ang=petal*Math.PI*2/petals+layer*1.83+(u-.5)*Math.PI*2/petals*1.28;
    let radius=f[2]*(.10+layer*.102),cupping=Math.sin(v*Math.PI),rad=radius*(.67+v*.36)+cupping*5;
    let x=f[0]+Math.cos(ang)*rad,y=f[1]+Math.sin(ang)*rad*.72-v*f[2]*.15,z=30+(8-layer)*4+cupping*12+Math.cos(ang)*8;
    let edge=Math.pow(Math.abs(u-.5)*2,5),lum=70+v*17+edge*10+Math.cos(ang)*4;
    p=point(x,y,z,`hsl(${337+rnd(i+70)*13},${25+(1-v)*29}%,${lum}%)`)
  }
  else if(q<.87) {
    let v=rnd(i+90),x=(rnd(i+100)-.5)*(1-v)*350,y=70+v*160;
    p=point(x,y,-25+rnd(i+101)*30,`hsl(85,15%,${55+rnd(i+102)*30}%)`)
  }
  else if(q<.96) {
    let v=rnd(i+111),side=i%2?1:-1;
    p=point(side*(1-v)*175+(rnd(i+112)-.5)*28,35+v*230,rnd(i+113)*35-30,`hsl(330,18%,${68+rnd(i+114)*25}%)`)
  }
  else {
    let v=rnd(i+121),ang=rnd(i+122)*Math.PI*2;
    p=point(Math.sin(ang)*45,220+Math.cos(ang)*14+v*55,20,`hsl(338,40%,${55+v*25}%)`)
  }
  roses.push(p);
  let t=i/N*Math.PI*2;
  let hr=.65+.35*rnd(i+5);
  heart.push(point(16*Math.pow(Math.sin(t),3)*11*hr,-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*11*hr-90,rnd(i+7)*45,'#ffd2e6'));
}
// Sample a detailed three-tier cake illustration into particles.
const off=document.createElement('canvas');
off.width=700;
off.height=680;
const b=off.getContext('2d');
function el(x,y,rx,ry,color) {
  b.fillStyle=color;
  b.beginPath();
  b.ellipse(x,y,rx,ry,0,0,7);
  b.fill()
}
function tier(y,w,h) {
  let g=b.createLinearGradient(350-w,y,350+w,y);
  g.addColorStop(0,'#bd89a8');
  g.addColorStop(.4,'#ffe5e6');
  g.addColorStop(1,'#d4a1c0');
  b.fillStyle=g;
  b.fillRect(350-w,y,w*2,h);
  el(350,y+h,w,w*.19,'#d7a2bd');
  el(350,y,w,w*.22,'#fff0df');
  for(let x=350-w+8;
  x<350+w;
  x+=17) {
    el(x,y+h,7,5,'#ffe9e8');
    el(x,y+9,7,9,'#fff2e0')
  }
  for(let x=350-w+24;
  x<350+w-10;
  x+=30)el(x,y+h*.6,2.4,2.4,'#fff4e8')
}
el(350,583,192,26,'#e8c7da');
tier(474,170,96);
tier(391,132,80);
tier(315,94,73);
// A standing bunny, including body, paws, face, and tall pink ears.
el(350,280,31,42,'#fff0e1');
el(329,311,17,9,'#fff6e8');
el(371,311,17,9,'#fff6e8');
el(320,278,10,23,'#fff0e1');
el(380,278,10,23,'#fff0e1');
el(350,228,39,33,'#fff5e7');
el(330,184,11,38,'#fff6ea');
el(370,184,11,38,'#fff6ea');
el(330,184,5,29,'#efb7cc');
el(370,184,5,29,'#efb7cc');
el(336,228,3,4,'#603c51');
el(364,228,3,4,'#603c51');
el(326,238,7,4,'#f1b1c6');
el(374,238,7,4,'#f1b1c6');
el(350,237,3,2,'#b87890');
b.strokeStyle='#b87890';
b.lineWidth=1.8;
b.beginPath();
b.arc(347,239,3,0,Math.PI);
b.arc(353,239,3,0,Math.PI);
b.stroke();
b.textAlign='center';
b.font='bold 64px Georgia';
b.fillStyle='#f6cf92';
b.fillText('2',275,313);
b.fillText('2',425,313);
el(275,256,5,11,'#fff0b3');
el(425,256,5,11,'#fff0b3');
let data=b.getImageData(0,0,700,680).data;
for(let y=0;
y<680;
y+=2)for(let x=0;
x<700;
x+=2) {
  let j=(y*700+x)*4;
  if(data[j+3]>90)cake.push(point(x-350,y-330,(rnd(j)-.5)*22,`rgb(${data[j]},${data[j+1]},${data[j+2]})`))
}
