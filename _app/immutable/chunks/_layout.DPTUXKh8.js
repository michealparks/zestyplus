import{c as p,a as l}from"./disclose-version.hHKxC-Jk.js";import{w as s,a0 as c,a2 as u,a1 as m}from"./runtime.BZbTZrfI.js";import{s as d}from"./snippet.BOLubvD_.js";import{a as f}from"./types.CRfJXUP2.js";import{p as v,u as g,K as y}from"./keybindings.svelte.Cya8E9T1.js";const h=()=>{const t=[...v],e=o=>{f(o);const n=t.pop();n!==void 0&&setTimeout(e,1e3,n)};setTimeout(e,1e3,t.pop())},j=()=>{s(()=>{let t=0;const e="_______________".split(""),o="_____zesty_____".split(""),n="____p_l_u_s____".split(""),a=[()=>{const i=o.pop();o.unshift(i),document.title=o.join("")},()=>{document.title=document.title===e.join("")?n.join(""):e.join("")}],_=setInterval(()=>{a[t]()},300),r=setInterval(()=>{t=t===0?1:0},2e3);return()=>{clearInterval(_),clearInterval(r)}})};function q(t,e){c(e,!0),s(()=>h()),g(y.Fullscreen,()=>document.body.requestFullscreen()),j();var o=p(),n=u(o);d(n,()=>e.children),l(t,o),m()}export{q as default};
