import"./disclose-version.Bg9kRutz.js";import{p as C,f as x,a as O,s as a,k as q}from"./index-client.DzQlphmH.js";import{a as k,t as w}from"./template.CgCchT00.js";import{e as B,i as G}from"./each.C8O1i2N9.js";import{c as r}from"./svelte-component.D0WKzo0g.js";import{a as X}from"./auth.svelte.BAHdEbOi.js";import{i as Y,a3 as i,M as Z,u as E,d as o}from"./T.D9_Xg1XW.js";import"./index.DsEVf3p4.js";import{R as F}from"./RoundedBoxGeometry.zLLJIJyk.js";import"./legacy.CtaTdtmd.js";import{L as H}from"./Lightformer.DPT4bBXl.js";var I=w("<!> <!>",1),J=w("<!> <!> <!> <!> <!> <!> <!>",1);function K(L,T){C(T,!0);const{camera:$}=Y(),{frequencyData:D}=X(),R=new i().makeRotationX(.005).multiply(new i().makeRotationY(.005)).multiply(new i().makeRotationZ(.005)),p=new i,S=27,m=[];let c=0;const l=(t,e)=>{const n=t%3*e-e,M=(t%9/3|0)*e-e,s=(t/9|0)*e-e;p.makeTranslation(n,M,s)};for(;c<S;){const t=new Z;t.castShadow=!0,t.receiveShadow=!0,m.push(t),l(c,1),t.applyMatrix4(p),c+=1}let u=0;E(()=>{u+=.05,$.current.applyMatrix4(R);for(const[t,e]of m.entries())l(t,Math.sin(u)*.01*D.current[32]/10),e.applyMatrix4(p)});var d=J(),f=x(d);r(f,()=>o.PerspectiveCamera,(t,e)=>{e(t,{makeDefault:!0,"position.y":1,"position.z":10,oncreate:n=>n.lookAt(0,0,0)})});var h=a(f,2);r(h,()=>o.AmbientLight,(t,e)=>{e(t,{intensity:.3})});var g=a(h,2);r(g,()=>o.DirectionalLight,(t,e)=>{e(t,{intensity:1,position:[0,3,0]})});var v=a(g,2);r(v,()=>o.DirectionalLight,(t,e)=>{e(t,{intensity:.5,position:[0,3,2]})});var y=a(v,2);r(y,()=>o.DirectionalLight,(t,e)=>{e(t,{intensity:.25,position:[2,1,2]})});var _=a(y,2);B(_,17,()=>m,G,(t,e)=>{o(t,{get is(){return q(e)},children:(n,M)=>{var s=I(),b=x(s);F(b,{smoothness:10,creaseAngle:1,radius:.2});var z=a(b,2);r(z,()=>o.MeshStandardMaterial,(P,j)=>{j(P,{roughness:.15})}),k(n,s)},$$slots:{default:!0}})});var A=a(_,2);H(A,{}),k(L,d),O()}const st=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{K as _,st as a};