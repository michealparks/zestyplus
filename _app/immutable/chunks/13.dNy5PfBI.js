import{a as b,t as h}from"./disclose-version.hHKxC-Jk.js";import"./legacy.DAlpyf03.js";import{a0 as z,a2 as w,a1 as T,a3 as j,z as k}from"./runtime.BZbTZrfI.js";import{e as x,i as A}from"./each.BwHTd-Qj.js";import{i as M}from"./lifecycle.dIvfKtke.js";import{u as P}from"./analyser.svelte.ARxWFVcG.js";import"./auth.svelte.C3nh3yTw.js";import{n as D}from"./math.BF6GMVh4.js";import{u as I,T as y}from"./T.DXVn7S3O.js";import"./index.fMZ61YjE.js";import{a as O,b as S,L as q}from"./Line2.lc89Enda.js";var C=h("<!> <!>",1);function F(g,d){z(d,!1);const{frequencyData:_}=P(),v=80,l=256;let i=[],r=new Float32Array(l*3);for(let e=0;e<v;e+=1){const t=new O,a=new S;a.transparent=!0;const o=new q(t,a);i.push(o)}let n=0;setInterval(()=>{const e=_.current;let t=l/2,a=l*3/2,o=t,s=0;for(let p=0,m=0,f=0;p<t+1;p+=1,m+=3,f+=2)s=e[f]??0,o=a+m,r[o+0]=(t+p)/75,r[o+1]=s/400-1,r[o+2]=1e-4,s=e[f+1]??0,o=a-m,r[o+0]=(t-p)/75,r[o+1]=s/400-1,r[o+2]=1e-4;i[n].geometry.setPositions(r),i[n].position.set(-1.75,0,0),n+=1,n%=i.length},150),I(e=>{for(const t of i)t.position.y+=e/2,t.position.z-=e/3,t.material.opacity=1-D(t.position.y,0,2,100)}),M();var c=C(),u=w(c);y.PerspectiveCamera(u,{makeDefault:!0,"position.z":2.5,"position.y":0});var L=j(u,2);x(L,1,()=>i,A,(e,t)=>{y(e,{get is(){return k(t)}})}),b(g,c),T()}const R=Object.freeze(Object.defineProperty({__proto__:null,default:F},Symbol.toStringTag,{value:"Module"}));export{F as _,R as a};
