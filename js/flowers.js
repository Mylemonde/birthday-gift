// 参考图采样：保留粉色花冠、绿叶和扎束花茎，过滤浅色背景。
const referenceImage=new Image();
let referencePoints=[];
referenceImage.onload=()=> {
  let cv=document.createElement('canvas');
  cv.width=537;
  cv.height=672;
  let cx=cv.getContext('2d');
  cx.drawImage(referenceImage,0,0,537,672);
  let d=cx.getImageData(0,0,537,672).data,points=[];
  for(let y=0;
  y<650;
  y++)for(let x=0;
  x<537;
  x++) {
    let k=(y*537+x)*4,r=d[k],g=d[k+1],b=d[k+2],dark=255-(r+g+b)/3,pink=r-g,green=g-r;
    let flower=y<335&&pink>15&&dark>33,foliage=y>230&&y<480&&((green>0&&dark>55)||dark>115),stem=y>420&&x>185&&x<345&&dark>78;
    if(!(flower||foliage||stem))continue;
    if(rnd(k+2)>.52)continue;
    points.push(point((x-268.5)*.86,(y-325)*.86,(rnd(k+7)-.5)*26,`rgb(${r},${g},${b})`))
  }
  referencePoints=points;
  roses=Array.from( {
    length:N
  }
  ,(_,i)=>points[Math.floor(rnd(i+109)*points.length)]);
}
;
referenceImage.src='./assets/flowers.webp';
function drawProvidedRose(now,sec) {
  if(!referencePoints.length)return;
  let opacity=ease((sec-9)/3)*(1-ease((sec-17)/1.5)),sway=Math.sin(now*.0006)*.035;
  ctx.save();
  ctx.globalCompositeOperation='source-over';
  for(let i=0;
  i<referencePoints.length;
  i++) {
    let p=referencePoints[i],x=p.x*Math.cos(sway)+p.z*Math.sin(sway),y=p.y+Math.sin(now*.0008)*2;
    ctx.globalAlpha=opacity*(.64+.30*Math.pow(Math.sin(now*.001+i),2));
    ctx.fillStyle=p.col;
    let size=.65+rnd(i+7)*.65;
    ctx.fillRect(x,y,size,size)
  }
  // Sparse pink petal fragments drift around the bouquet.
  for(let i=0;
  i<26;
  i++) {
    let t=(now*.000022*(.6+rnd(i))+rnd(i+128))%1,x=(rnd(i+443)-.5)*560+Math.sin(t*7+i)*20,y=-300+t*610;
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(t*3+i);
    ctx.globalAlpha=opacity*Math.sin(t*Math.PI)*.48;
    ctx.fillStyle=i%3?'#e9b1c7':'#f6dce6';
    ctx.beginPath();
    ctx.roundRect(-2,-3,4+rnd(i)*3,6,1.4);
    ctx.fill();
    ctx.restore()
  }
  ctx.restore();
}
