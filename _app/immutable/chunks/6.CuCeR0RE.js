import"./disclose-version.Bg9kRutz.js";import"./legacy.CtaTdtmd.js";import{p as U,k as a,f as C,a as X,s as f,aR as Y,aS as y,av as $}from"./index-client.DzQlphmH.js";import{a as F,t as k}from"./template.CgCchT00.js";import{e as B,i as E}from"./each.C8O1i2N9.js";import{i as J}from"./lifecycle.B297RwxD.js";import{i as K,C as N,u as Q,d as i,w as c,V as S,L as W}from"./T.D9_Xg1XW.js";import"./index.DsEVf3p4.js";import{a as Z}from"./auth.svelte.BAHdEbOi.js";import{h as tt}from"./color.D7bleQK4.js";import{L as at,a as ot,b as et}from"./Line2.BXgBZUFP.js";var nt=k("<!> <!>",1),st=k("<!> <!> <!> <!>",1);function rt(q,A){U(A,!1);const{camera:g}=K(),T=200,o=Y([]),d=1,x=c.randInt(2,3),_=c.randFloat(5,6),h=c.randFloat(2,10),z=c.randFloat(2,3),j=c.randFloat(2,3),D=c.randFloat(.5,2),v=2e3,I=new N("red").setHSL(Math.random(),.5,.5);for(let t=0;t<T;t+=1){const n=new S(Math.random()*d,Math.random()*d,Math.random()*d),s=[];for(let r=0;r<v;r++){const e=r/v*Math.PI*2*x,w=Math.sin(e*z)*(_+h*Math.sin(e)),m=Math.cos(e*j)*(_+h*Math.cos(e)),u=h*Math.sin(e*D);s.push(new S(w,m,u))}const l=new at;a(o).push({line:l,points:s,shift:n,opacity:0,animating:!1})}const O=Z();let p=0;const R=()=>{var s;const n=new W((s=a(o).at(0))==null?void 0:s.points).getPointAt(p);g.current.position.copy(n),g.current.lookAt(0,0,0),p+=1e-4,p>1&&(p=0)};Q(()=>{for(let t=0,n=a(o).length;t<n;t+=1){const{line:s,opacity:l,animating:r}=a(o)[t];r&&l>0?y(o,a(o)[t].opacity-=.005):O.frequencyData.current[t]>100&&(y(o,a(o)[t].opacity=.4),y(o,a(o)[t].animating=!0)),s.material.opacity=a(o)[t].opacity}R()}),J();var M=st(),L=C(M);i.PerspectiveCamera(L,{makeDefault:!0,"position.z":20});var P=f(L,2);i.AmbientLight(P,{intensity:.6});var b=f(P,2);i.PointLight(b,{intensity:1,position:[10,10,10]});var V=f(b,2);B(V,1,()=>a(o),E,(t,n)=>{let s=()=>a(n).line,l=()=>a(n).shift,r=()=>a(n).points;i(t,{get is(){return s()},oncreate:e=>{e.position.copy(l()),e.geometry.setFromPoints(r())},children:(e,w)=>{var m=nt(),u=C(m);i(u,{is:ot});var G=f(u,2),H=$(()=>tt(I,.0025));i(G,{is:et,transparent:!0,get color(){return a(H)}}),F(e,m)},$$slots:{default:!0}})}),F(q,M),X()}const _t=Object.freeze(Object.defineProperty({__proto__:null,default:rt},Symbol.toStringTag,{value:"Module"}));export{rt as _,_t as a};