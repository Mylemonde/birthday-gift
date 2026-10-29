// 高清奶油蛋糕与垂耳兔。粒子聚合后淡入完整素材。
const cakeReference=new Image();
let cakeGrains=[];
cakeReference.onload=()=> {
  let cv=document.createElement('canvas');
  cv.width=560;
  cv.height=560;
  let cc=cv.getContext('2d');
  cc.drawImage(cakeReference,47,0,466,560);
  let d=cc.getImageData(0,0,560,560).data,arr=[];
  for(let y=0;
  y<560;
  y+=2)for(let x=0;
  x<560;
  x+=2) {
    let k=(y*560+x)*4;
    if(d[k+3]>110)arr.push(point(x-280,y-280,0,`rgb(${d[k]},${d[k+1]},${d[k+2]})`))
  }
  cake=arr;
  cakeGrains=arr
}
;
cakeReference.src='./assets/cake.webp';
