import"./disclose-version.Bg9kRutz.js";import{p as C,f as x,a as O,s as o,k as X}from"./index-client.D_7LkImg.js";import{a as k,t as w}from"./template.AcjnxTEE.js";import{e as q,i as B}from"./each.CPMWh782.js";import{c as r}from"./svelte-component.ClNcW8Uq.js";import{a as G}from"./auth.svelte.BGMa6fhg.js";import{u as Y,X as s,M as Z,e as E,T as a}from"./T.po24HVTg.js";import"./index.TNnlVa_5.js";import{R as F}from"./RoundedBoxGeometry.CbXKmbir.js";import"./legacy.CtaTdtmd.js";import H from"./Lightformer.BwLk9RQw.js";var I=w("<!> <!>",1),J=w("<!> <!> <!> <!> <!> <!> <!>",1);function K(T,$){C($,!0);const{camera:D}=Y(),{frequencyData:L}=G(),R=new s().makeRotationX(.005).multiply(new s().makeRotationY(.005)).multiply(new s().makeRotationZ(.005)),p=new s,S=27,m=[];let c=0;const l=(t,e)=>{const n=t%3*e-e,M=(t%9/3|0)*e-e,i=(t/9|0)*e-e;p.makeTranslation(n,M,i)};for(;c<S;){const t=new Z;t.castShadow=!0,t.receiveShadow=!0,m.push(t),l(c,1),t.applyMatrix4(p),c+=1}let u=0;E(()=>{u+=.05,D.current.applyMatrix4(R);for(const[t,e]of m.entries())l(t,Math.sin(u)*.01*L.current[32]/10),e.applyMatrix4(p)});var d=J(),f=x(d);r(f,()=>a.PerspectiveCamera,(t,e)=>{e(t,{makeDefault:!0,"position.y":1,"position.z":10,oncreate:n=>n.lookAt(0,0,0)})});var h=o(f,2);r(h,()=>a.AmbientLight,(t,e)=>{e(t,{intensity:.3})});var g=o(h,2);r(g,()=>a.DirectionalLight,(t,e)=>{e(t,{intensity:1,position:[0,3,0]})});var v=o(g,2);r(v,()=>a.DirectionalLight,(t,e)=>{e(t,{intensity:.5,position:[0,3,2]})});var y=o(v,2);r(y,()=>a.DirectionalLight,(t,e)=>{e(t,{intensity:.25,position:[2,1,2]})});var _=o(y,2);q(_,17,()=>m,B,(t,e)=>{a(t,{get is(){return X(e)},children:(n,M)=>{var i=I(),b=x(i);F(b,{smoothness:10,creaseAngle:1,radius:.2});var z=o(b,2);r(z,()=>a.MeshStandardMaterial,(P,j)=>{j(P,{roughness:.15})}),k(n,i)},$$slots:{default:!0}})});var A=o(_,2);H(A),k(T,d),O()}const it=Object.freeze(Object.defineProperty({__proto__:null,default:K},Symbol.toStringTag,{value:"Module"}));export{K as _,it as a};
