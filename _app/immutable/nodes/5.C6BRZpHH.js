import{a as F,t as A}from"../chunks/disclose-version.CSeAfAtk.js";import"../chunks/legacy.U-anWqIC.js";import{p as Y,g as a,f as b,a as j,s as f,m as B,i as y,d as E}from"../chunks/runtime.BqyLU49m.js";import{e as J,i as K}from"../chunks/each.BBth11kl.js";import{i as N}from"../chunks/lifecycle.CWEQKXie.js";import{u as O,C as Q,a as W,T as i,d as c,V as q,b as Z,e as $}from"../chunks/analyser.WfzEoADr.js";import"../chunks/index.C_Hczehs.js";import"../chunks/auth.svelte.Q9lrfs7o.js";import{h as tt}from"../chunks/color.D7bleQK4.js";import{L as at,a as ot,b as nt}from"../chunks/Line2.TQ8w7T6d.js";var et=A("<!> <!>",1),st=A("<!> <!> <!> <!>",1);function yt(k,x){Y(x,!1);const{camera:g}=O(),S=200,o=B([]),d=1,T=c.randInt(2,3),v=c.randFloat(5,6),h=c.randFloat(2,10),z=c.randFloat(2,3),D=c.randFloat(2,3),I=c.randFloat(.5,2),_=2e3,V=new Q("red").setHSL(Math.random(),.5,.5);for(let t=0;t<S;t+=1){const e=new q(Math.random()*d,Math.random()*d,Math.random()*d),s=[];for(let r=0;r<_;r++){const n=r/_*Math.PI*2*T,C=Math.sin(n*z)*(v+h*Math.sin(n)),m=Math.cos(n*D)*(v+h*Math.cos(n)),u=h*Math.sin(n*I);s.push(new q(C,m,u))}const l=new at;a(o).push({line:l,points:s,shift:e,opacity:0,animating:!1})}const G=Z();let p=0;const H=()=>{var s;const e=new $((s=a(o).at(0))==null?void 0:s.points).getPointAt(p);g.current.position.copy(e),g.current.lookAt(0,0,0),p+=1e-4,p>1&&(p=0)};W(()=>{for(let t=0,e=a(o).length;t<e;t+=1){const{line:s,opacity:l,animating:r}=a(o)[t];r&&l>0?y(o,a(o)[t].opacity-=.005):G.frequencyData.current[t]>100&&(y(o,a(o)[t].opacity=.4),y(o,a(o)[t].animating=!0)),s.material.opacity=a(o)[t].opacity}H()}),N();var M=st(),L=b(M);i.PerspectiveCamera(L,{makeDefault:!0,"position.z":20});var P=f(L,2);i.AmbientLight(P,{intensity:.6});var w=f(P,2);i.PointLight(w,{intensity:1,position:[10,10,10]});var R=f(w,2);J(R,1,()=>a(o),K,(t,e)=>{let s=()=>a(e).line,l=()=>a(e).shift,r=()=>a(e).points;i(t,{get is(){return s()},oncreate:n=>{n.position.copy(l()),n.geometry.setFromPoints(r())},children:(n,C)=>{var m=et(),u=b(m);i(u,{is:ot});var U=f(u,2),X=E(()=>tt(V,.0025));i(U,{is:nt,transparent:!0,get color(){return a(X)}}),F(n,m)},$$slots:{default:!0}})}),F(k,M),j()}export{yt as component};
