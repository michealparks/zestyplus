import{a as s,t as h,b as z,c as m}from"./disclose-version.B1qbiK4R.js";import"./legacy.DkHaiiTp.js";import{p as C,a as D,c as k,f as d,b as y,t as E,n as g,g as _,d as x}from"./runtime.BAh1p-zl.js";import{d as F,s as G}from"./render.Bd381ucg.js";import{i as u}from"./if.CF-fdFUm.js";import{i as H}from"./lifecycle.BJYUvM6u.js";import{u as I}from"./auth.svelte.B99zoz8J.js";const b=(c,f=g,r=g)=>{var t=J();t.__click=function(...o){var i;(i=r())==null||i.apply(this,o)};var l=k(t,!0);y(t),E(()=>G(l,f())),s(c,t)};var J=h('<button class="bg-slate-600 px-2 py-0.5 text-xs text-slate-100"> </button>'),K=h("<div><!></div>");function V(c,f){C(f,!1);const{authenticated:r,login:t,logout:l}=I();H();var o=K(),i=k(o);{var L=a=>{var n=z("...");s(a,n)},M=a=>{var n=m(),q=d(n);{var A=e=>{var v=x(()=>()=>l());b(e,()=>"Logout",()=>_(v))},B=e=>{var v=m(),S=d(v);{var j=p=>{var w=x(()=>()=>t());b(p,()=>"Login",()=>_(w))};u(S,p=>{r.current==="logged-out"&&p(j)},!0)}s(e,v)};u(q,e=>{r.current==="logged-in"?e(A):e(B,!1)},!0)}s(a,n)};u(i,a=>{r.current==="pending"?a(L):a(M,!1)})}y(o),s(c,o),D()}F(["click"]);export{V as M};
