import"./disclose-version.Bg9kRutz.js";import{p as O,f as l,a as x,s}from"./index-client.DzQlphmH.js";import{a as d,t as u}from"./template.CgCchT00.js";import{c as i}from"./svelte-component.D0WKzo0g.js";import{i as L,aP as j,M as A,k as C,u as D,d as t}from"./T.D9_Xg1XW.js";import"./index.DsEVf3p4.js";import{O as G}from"./OrbitControls.BoM2N0lV.js";import"./legacy.CtaTdtmd.js";import{L as q}from"./Lightformer.DPT4bBXl.js";import{a as B}from"./auth.svelte.BAHdEbOi.js";import{l as I}from"./MathUtils.DS64O8Kj.js";import{a as K}from"./math.BF6GMVh4.js";import{vertexShader as U,fragmentShader as E}from"./shader.WnOi0MZ3.js";var F=u("<!> <!>",1),H=u("<!> <!>",1),J=u("<!>  <!> <!> <!> <!>",1);function N(M,w){O(w,!0);const{scene:P}=L(),{frequencyData:c}=B(),f=new j,v=new A,h={time:{value:1}},T=new C({uniforms:h,vertexShader:U,fragmentShader:E});D(r=>{v.rotation.y+=r,h.time.value+=r/3+c.current[32]/500;const e=K(c.current[16],0,100);f.intensity=I(e*10,0,r/2)});var _=J(),g=l(_);i(g,()=>t.PerspectiveCamera,(r,e)=>{e(r,{makeDefault:!0,"position.z":6,children:(o,m)=>{G(o,{})},$$slots:{default:!0}})});var $=s(g,2);t($,{is:f,castShadow:!0,intensity:1e3,position:[4,3,2],oncreate:r=>{r.lookAt(0,0,0),P.add(r.target),r.target.position.set(0,0,0)}});var S=s($,2);t(S,{is:v,castShadow:!0,receiveShadow:!0,children:(r,e)=>{var o=F(),m=l(o);i(m,()=>t.TorusKnotGeometry,(a,n)=>{n(a,{args:[1,.4,256,64]})});var p=s(m,2);i(p,()=>t.MeshStandardMaterial,(a,n)=>{n(a,{roughness:.1,metalness:1})}),d(r,o)},$$slots:{default:!0}});var y=s(S,2);i(y,()=>t.Mesh,(r,e)=>{e(r,{"position.z":-1,children:(o,m)=>{var p=H(),a=l(p);t(a,{is:T});var n=s(a,2);i(n,()=>t.BoxGeometry,(k,z)=>{z(k,{args:[12,3]})}),d(o,p)},$$slots:{default:!0}})});var b=s(y,2);q(b,{}),d(M,_),x()}const nr=Object.freeze(Object.defineProperty({__proto__:null,default:N},Symbol.toStringTag,{value:"Module"}));export{N as _,nr as a};