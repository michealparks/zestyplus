import{b as C,t as T}from"./disclose-version.DFxnx1AN.js";import"./legacy.u_OnCUt7.js";import{B as Q,T as a,a8 as F,D as R,a9 as f,aP as U,aQ as y,aB as X}from"./runtime.BxeNZxLl.js";import{e as Y,i as $}from"./each.Dtb_ZQQj.js";import{i as E}from"./lifecycle.CD7hXnw5.js";import{C as J,k as i,V as S,t as K}from"./three.module.iKKkBh6O.js";import{a as N,u as W,T as c}from"./T.BojAtv_L.js";import"./index.B_O87gS3.js";import{a as Z}from"./auth.svelte.CMqokhwd.js";import{h as tt}from"./color.D7bleQK4.js";import{L as at,a as ot,b as et}from"./Line2.lc89Enda.js";var nt=T("<!> <!>",1),st=T("<!> <!> <!> <!>",1);function rt(k,q){Q(q,!1);const{camera:g}=N(),A=200,o=U([]),d=1,x=i.randInt(2,3),_=i.randFloat(5,6),h=i.randFloat(2,10),z=i.randFloat(2,3),D=i.randFloat(2,3),j=i.randFloat(.5,2),v=2e3,B=new J("red").setHSL(Math.random(),.5,.5);for(let t=0;t<A;t+=1){const n=new S(Math.random()*d,Math.random()*d,Math.random()*d),s=[];for(let r=0;r<v;r+=1){const e=r/v*Math.PI*2*x,w=Math.sin(e*z)*(_+h*Math.sin(e)),m=Math.cos(e*D)*(_+h*Math.cos(e)),u=h*Math.sin(e*j);s.push(new S(w,m,u))}const l=new at;a(o).push({line:l,points:s,shift:n,opacity:0,animating:!1})}const I=Z();let p=0;const O=()=>{var s;const n=new K((s=a(o).at(0))==null?void 0:s.points).getPointAt(p);g.current.position.copy(n),g.current.lookAt(0,0,0),p+=1e-4,p>1&&(p=0)};W(()=>{for(let t=0,n=a(o).length;t<n;t+=1){const{line:s,opacity:l,animating:r}=a(o)[t];r&&l>0?y(o,a(o)[t].opacity-=.005):I.frequencyData.current[t]>100&&(y(o,a(o)[t].opacity=.4),y(o,a(o)[t].animating=!0)),s.material.opacity=a(o)[t].opacity}O()}),E();var M=st(),P=F(M);c.PerspectiveCamera(P,{makeDefault:!0,"position.z":20});var b=f(P,2);c.AmbientLight(b,{intensity:.6});var L=f(b,2);c.PointLight(L,{intensity:1,position:[10,10,10]});var V=f(L,2);Y(V,1,()=>a(o),$,(t,n)=>{let s=()=>a(n).line,l=()=>a(n).shift,r=()=>a(n).points;c(t,{get is(){return s()},oncreate:e=>{e.position.copy(l()),e.geometry.setFromPoints(r())},children:(e,w)=>{var m=nt(),u=F(m);c(u,{is:ot});var G=f(u,2),H=X(()=>tt(B,.0025));c(G,{is:et,transparent:!0,get color(){return a(H)}}),C(e,m)},$$slots:{default:!0}})}),C(k,M),R()}const _t=Object.freeze(Object.defineProperty({__proto__:null,default:rt},Symbol.toStringTag,{value:"Module"}));export{rt as _,_t as a};
