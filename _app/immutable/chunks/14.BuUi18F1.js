import{b as c,t as h}from"./disclose-version.n6tle2S8.js";import"./legacy.CeuyfEhk.js";import{B as k,aP as d,a8 as f,T as a,D as x,a9 as o,aQ as v}from"./runtime.D2gsQGmM.js";import{i as C}from"./lifecycle.C_irUZP-.js";import{aC as D,M as L,h as j,aN as A}from"./three.module.iKKkBh6O.js";import{a as G,u as q,T as e}from"./T.CjKvhq6h.js";import"./index.APQ6yQwS.js";import{O as B}from"./OrbitControls.DeejCEcE.js";import{L as I}from"./Lightformer.BOUtFJIc.js";import{a as K}from"./auth.svelte.PzAXiTwv.js";import{l as b}from"./MathUtils.DS64O8Kj.js";import{a as N}from"./math.BF6GMVh4.js";import{vertexShader as Q,fragmentShader as U}from"./shader.WnOi0MZ3.js";var E=h("<!> <!>",1),F=h("<!> <!>",1),H=h("<!> <!> <!> <!> <!>",1);function J(w,P){k(P,!1);const{scene:T}=G(),{frequencyData:m}=K(),p=d(new D),l=d(new L),_={time:{value:1}},z=new j({uniforms:_,vertexShader:Q,fragmentShader:U}),n=d(new A);q(t=>{v(l,a(l).rotation.y+=t);const i=b(a(n).opacity,m.current[64]/50,t);v(n,a(n).opacity=Math.max(.1,i)),_.time.value+=t/3+m.current[32]/500;const r=N(m.current[16],0,100);v(p,a(p).intensity=b(r*10,0,t/2))}),C();var g=H(),$=f(g);e.PerspectiveCamera($,{makeDefault:!0,"position.z":6,children:(t,i)=>{B(t,{})},$$slots:{default:!0}});var y=o($,2);e(y,{get is(){return a(p)},castShadow:!0,intensity:1e3,position:[4,3,2],oncreate:t=>{t.lookAt(0,0,0),T.add(t.target),t.target.position.set(0,0,0)}});var M=o(y,2);e(M,{get is(){return a(l)},castShadow:!0,receiveShadow:!0,children:(t,i)=>{var r=E(),s=f(r);e(s,{get is(){return a(n)},roughness:.1,metalness:1,transparent:!0});var u=o(s,2);e.TorusKnotGeometry(u,{args:[1,.4,256,64]}),c(t,r)},$$slots:{default:!0}});var S=o(M,2);e.Mesh(S,{"position.z":-1,children:(t,i)=>{var r=F(),s=f(r);e(s,{is:z});var u=o(s,2);e.PlaneGeometry(u,{args:[12,3]}),c(t,r)},$$slots:{default:!0}});var O=o(S,2);I(O,{}),c(w,g),x()}const it=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));export{J as _,it as a};
