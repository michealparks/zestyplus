var Fn=Array.isArray,Ln=Array.from,Mn=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,Zt=Object.getOwnPropertyDescriptors,qn=Object.prototype,Hn=Array.prototype,zt=Object.getPrototypeOf;function Yn(t){return typeof t=="function"}const jn=()=>{};function Bn(t){return typeof(t==null?void 0:t.then)=="function"}function Un(t){return t()}function Jt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,dt=4,j=8,lt=16,T=32,z=64,tt=128,O=256,G=512,h=1024,R=2048,B=4096,P=8192,b=16384,Qt=32768,Et=65536,Vn=1<<17,Wt=1<<19,yt=1<<20,ct=Symbol("$state"),Gn=Symbol("legacy props"),Kn=Symbol("");function wt(t){return t===this.v}function Xt(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function mt(t){return!Xt(t,this.v)}function tn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function nn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function rn(t){throw new Error("https://svelte.dev/e/effect_orphan")}function en(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function $n(){throw new Error("https://svelte.dev/e/hydration_failed")}function Zn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function zn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Jn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function sn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function ln(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let J=!1;function Qn(){J=!0}const Wn=1,Xn=2,tr=4,nr=8,rr=16,er=1,sr=2,lr=4,ar=8,or=16,ur=1,ir=2,an="[",on="[!",un="]",Tt={},fr=Symbol();function at(t,n){var r={f:0,v:t,reactions:null,equals:wt,version:0};return r}function _r(t){return gt(at(t))}function fn(t,n=!1){var e;const r=at(t);return n||(r.equals=mt),J&&i!==null&&i.l!==null&&((e=i.l).s??(e.s=[])).push(r),r}function cr(t,n=!1){return gt(fn(t,n))}function gt(t){return u!==null&&u.f&y&&(m===null?xn([t]):m.push(t)),t}function vr(t,n){return _n(t,Nn(()=>Cn(t))),n}function _n(t,n){return u!==null&&it()&&u.f&(y|lt)&&(m===null||!m.includes(t))&&ln(),cn(t,n)}function cn(t,n){return t.equals(n)||(t.v=n,t.version=jt(),At(t,R),it()&&o!==null&&o.f&h&&!(o.f&T)&&(v!==null&&v.includes(t)?(g(o,R),X(o)):x===null?Rn([t]):x.push(t))),n}function At(t,n){var r=t.reactions;if(r!==null)for(var e=it(),s=r.length,l=0;l<s;l++){var a=r[l],f=a.f;f&R||!e&&a===o||(g(a,n),f&(h|O)&&(f&y?At(a,B):X(a)))}}function xt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let D=!1;function pr(t){D=t}let w;function M(t){if(t===null)throw xt(),Tt;return w=t}function hr(){return M(k(w))}function dr(t){if(D){if(k(w)!==null)throw xt(),Tt;w=t}}function Er(t=1){if(D){for(var n=t,r=w;n--;)r=k(r);w=r}}function yr(){for(var t=0,n=w;;){if(n.nodeType===8){var r=n.data;if(r===un){if(t===0)return n;t-=1}else(r===an||r===on)&&(t+=1)}var e=k(n);n.remove(),n=e}}var vt,Rt,St;function wr(){if(vt===void 0){vt=window;var t=Element.prototype,n=Node.prototype;Rt=_t(n,"firstChild").get,St=_t(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function nt(t=""){return document.createTextNode(t)}function rt(t){return Rt.call(t)}function k(t){return St.call(t)}function mr(t,n){if(!D)return rt(t);var r=rt(w);if(r===null)r=w.appendChild(nt());else if(n&&r.nodeType!==3){var e=nt();return r==null||r.before(e),M(e),e}return M(r),r}function Tr(t,n){if(!D){var r=rt(t);return r instanceof Comment&&r.data===""?k(r):r}return w}function gr(t,n=1,r=!1){let e=D?w:t;for(var s;n--;)s=e,e=k(e);if(!D)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var a=nt();return e===null?s==null||s.after(a):e.before(a),M(a),a}return M(e),e}function Ar(t){t.textContent=""}function vn(t){var n=y|R;o===null?n|=O:o.f|=yt;var r=u!==null&&u.f&y?u:null;const e={children:null,ctx:i,deps:null,equals:wt,f:n,fn:t,reactions:null,v:null,version:0,parent:r??o};return r!==null&&(r.children??(r.children=[])).push(e),e}function xr(t){const n=vn(t);return n.equals=mt,n}function Dt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ot(e):I(e)}}}function pn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function It(t){var n,r=o;Z(pn(t));try{Dt(t),n=Bt(t)}finally{Z(r)}return n}function Ot(t){var n=It(t),r=(A||t.f&O)&&t.deps!==null?B:h;g(t,r),t.equals(n)||(t.v=n,t.version=jt())}function ot(t){Dt(t),Y(t,0),g(t,b),t.v=t.children=t.deps=t.ctx=t.reactions=null}function kt(t){o===null&&u===null&&rn(),u!==null&&u.f&O&&nn(),ut&&tn()}function hn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function F(t,n,r,e=!0){var s=(t&z)!==0,l=o,a={ctx:i,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|R,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,version:0};if(r){var f=C;try{pt(!0),W(a),a.f|=Qt}catch(_){throw I(a),_}finally{pt(f)}}else n!==null&&X(a);var p=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&yt)===0;if(!p&&!s&&e&&(l!==null&&hn(a,l),u!==null&&u.f&y)){var d=u;(d.children??(d.children=[])).push(a)}return a}function Rr(){return u===null?!1:!A}function Sr(t){const n=F(j,null,!1);return g(n,h),n.teardown=t,n}function Dr(t){kt();var n=o!==null&&(o.f&T)!==0&&i!==null&&!i.m;if(n){var r=i;(r.e??(r.e=[])).push({fn:t,effect:o,reaction:u})}else{var e=Ct(t);return e}}function Ir(t){return kt(),dn(t)}function Or(t){const n=F(z,t,!0);return(r={})=>new Promise(e=>{r.outro?wn(n,()=>{I(n),e(void 0)}):(I(n),e(void 0))})}function Ct(t){return F(dt,t,!1)}function dn(t){return F(j,t,!0)}function kr(t){return En(t)}function En(t,n=0){return F(j|lt|n,t,!0)}function Cr(t,n=!0){return F(j|T,t,!0,n)}function Nt(t){var n=t.teardown;if(n!==null){const r=ut,e=u;ht(!0),$(null);try{n.call(null)}finally{ht(r),$(e)}}}function Pt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ot(n[r])}}function bt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;I(r,n),r=e}}function yn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&T||I(n),n=r}}function I(t,n=!0){var r=!1;if((n||t.f&Wt)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:k(e);e.remove(),e=l}r=!0}bt(t,n&&!r),Pt(t),Y(t,0),g(t,b);var a=t.transitions;if(a!==null)for(const p of a)p.stop();Nt(t);var f=t.parent;f!==null&&f.first!==null&&Ft(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Ft(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function wn(t,n){var r=[];Lt(t,r,!0),mn(r,()=>{I(t),n&&n()})}function mn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Lt(t,n,r){if(!(t.f&P)){if(t.f^=P,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&Et)!==0||(e.f&T)!==0;Lt(e,n,l?r:!1),e=s}}}function Nr(t){Mt(t,!0)}function Mt(t,n){if(t.f&P){U(t)&&W(t),t.f^=P;for(var r=t.first;r!==null;){var e=r.next,s=(r.f&Et)!==0||(r.f&T)!==0;Mt(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}let K=!1,et=[];function qt(){K=!1;const t=et.slice();et=[],Jt(t)}function Pr(t){K||(K=!0,queueMicrotask(qt)),et.push(t)}function Tn(){K&&qt()}function gn(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}const Ht=0,An=1;let L=!1,V=Ht,q=!1,H=null,C=!1,ut=!1;function pt(t){C=t}function ht(t){ut=t}let S=[],N=0;let u=null;function $(t){u=t}let o=null;function Z(t){o=t}let m=null;function xn(t){m=t}let v=null,E=0,x=null;function Rn(t){x=t}let Yt=1,A=!1,i=null;function br(t){i=t}function jt(){return++Yt}function it(){return!J||i!==null&&i.l===null}function U(t){var a,f;var n=t.f;if(n&R)return!0;if(n&B){var r=t.deps,e=(n&O)!==0;if(r!==null){var s;if(n&G){for(s=0;s<r.length;s++)((a=r[s]).reactions??(a.reactions=[])).push(t);t.f^=G}for(s=0;s<r.length;s++){var l=r[s];if(U(l)&&Ot(l),e&&o!==null&&!A&&!((f=l==null?void 0:l.reactions)!=null&&f.includes(t))&&(l.reactions??(l.reactions=[])).push(t),l.version>t.version)return!0}}(!e||o!==null&&!A)&&g(t,h)}return!1}function Sn(t,n){for(var r=n;r!==null;){if(r.f&tt)try{r.fn(t);return}catch{r.f^=tt}r=r.parent}throw L=!1,t}function Dn(t){return(t.f&b)===0&&(t.parent===null||(t.parent.f&tt)===0)}function Fr(){L=!1}function Q(t,n,r,e){if(L){if(r===null&&(L=!1),Dn(n))throw t;return}r!==null&&(L=!0);{Sn(t,n);return}}function Bt(t){var ft;var n=v,r=E,e=x,s=u,l=A,a=m,f=i,p=t.f;v=null,E=0,x=null,u=p&(T|z)?null:t,A=!C&&(p&O)!==0,m=null,i=t.ctx;try{var d=(0,t.fn)(),_=t.deps;if(v!==null){var c;if(Y(t,E),_!==null&&E>0)for(_.length=E+v.length,c=0;c<v.length;c++)_[E+c]=v[c];else t.deps=_=v;if(!A)for(c=E;c<_.length;c++)((ft=_[c]).reactions??(ft.reactions=[])).push(t)}else _!==null&&E<_.length&&(Y(t,E),_.length=E);return d}finally{v=n,E=r,x=e,u=s,A=l,m=a,i=f}}function In(t,n){let r=n.reactions;if(r!==null){var e=r.indexOf(t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(v===null||!v.includes(n))&&(g(n,B),n.f&(O|G)||(n.f^=G),Y(n,0))}function Y(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)In(t,r[e])}function W(t){var n=t.f;if(!(n&b)){g(t,h);var r=o,e=i;o=t;try{n&lt?yn(t):bt(t),Pt(t),Nt(t);var s=Bt(t);t.teardown=typeof s=="function"?s:null,t.version=Yt}catch(l){Q(l,t,r,e||t.ctx)}finally{o=r}}}function Ut(){if(N>1e3){N=0;try{en()}catch(t){if(H!==null)Q(t,H,null);else throw t}}N++}function Vt(t){var n=t.length;if(n!==0){Ut();var r=C;C=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&h||(s.f^=h);var l=[];Gt(s,l),On(l)}}finally{C=r}}}function On(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(b|P)))try{U(e)&&(W(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ft(e):e.fn=null))}catch(s){Q(s,e,null,e.ctx)}}}function kn(){if(q=!1,N>1001)return;const t=S;S=[],Vt(t),q||(N=0,H=null)}function X(t){V===Ht&&(q||(q=!0,queueMicrotask(kn))),H=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(z|T)){if(!(r&h))return;n.f^=h}}S.push(n)}function Gt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&T)!==0,a=l&&(s&h)!==0,f=r.next;if(!a&&!(s&P))if(s&j){if(l)r.f^=h;else try{U(r)&&W(r)}catch(c){Q(c,r,null,r.ctx)}var p=r.first;if(p!==null){r=p;continue}}else s&dt&&e.push(r);if(f===null){let c=r.parent;for(;c!==null;){if(t===c)break t;var d=c.next;if(d!==null){r=d;continue t}c=c.parent}}r=f}for(var _=0;_<e.length;_++)p=e[_],n.push(p),Gt(p,n)}function Kt(t){var n=V,r=S;try{Ut();const s=[];V=An,S=s,q=!1,Vt(r);var e=t==null?void 0:t();return Tn(),(S.length>0||s.length>0)&&Kt(),N=0,H=null,e}finally{V=n,S=r}}async function Lr(){await Promise.resolve(),Kt()}function Cn(t){var _;var n=t.f,r=(n&y)!==0;if(r&&n&b){var e=It(t);return ot(t),e}if(u!==null){m!==null&&m.includes(t)&&sn();var s=u.deps;v===null&&s!==null&&s[E]===t?E++:v===null?v=[t]:v.push(t),x!==null&&o!==null&&o.f&h&&!(o.f&T)&&x.includes(t)&&(g(o,R),X(o))}else if(r&&t.deps===null)for(var l=t,a=l.parent,f=l;a!==null;)if(a.f&y){var p=a;f=p,a=p.parent}else{var d=a;(_=d.deriveds)!=null&&_.includes(f)||(d.deriveds??(d.deriveds=[])).push(f);break}return r&&(l=t,U(l)&&Ot(l)),t.v}function Nn(t){const n=u;try{return u=null,t()}finally{u=n}}const Pn=~(R|B|h);function g(t,n){t.f=t.f&Pn|n}function Mr(t){return $t().get(t)}function qr(t,n){return $t().set(t,n),n}function $t(t){return i===null&&gn(),i.c??(i.c=new Map(bn(i)||void 0))}function bn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function Hr(t,n=!1,r){i={p:i,c:null,e:null,m:!1,s:t,x:null,l:null},J&&!n&&(i.l={s:null,u:null,r1:[],r2:at(!1)})}function Yr(t){const n=i;if(n!==null){const a=n.e;if(a!==null){var r=o,e=u;n.e=null;try{for(var s=0;s<a.length;s++){var l=a[s];Z(l.effect),$(l.reaction),Ct(l.fn)}}finally{Z(r),$(e)}}i=n.p,n.m=!0}return{}}function jr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ct in t)st(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ct in r&&st(r)}}}function st(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{st(t[e],n)}catch{}const r=zt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Zt(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}export{Vn as $,Ir as A,Dr as B,i as C,Un as D,Et as E,Jt as F,jr as G,on as H,vn as I,Xt as J,_r as K,_n as L,qn as M,Hn as N,at as O,zn as P,_t as Q,o as R,ct as S,Jn as T,fr as U,zt as V,Fn as W,Qn as X,Sr as Y,fn as Z,Zn as _,Yr as a,lr as a0,mt as a1,Yn as a2,Gn as a3,T as a4,z as a5,Z as a6,er as a7,J as a8,sr as a9,Kn as aA,Zt as aB,tt as aC,Er as aD,I as aE,Fr as aF,Q as aG,qr as aH,vt as aI,Rr as aJ,tr as aK,P as aL,Wn as aM,Xn as aN,Lt as aO,mn as aP,nr as aQ,rr as aR,Mr as aS,ar as aa,or as ab,gn as ac,$ as ad,u as ae,Mn as af,wr as ag,rt as ah,an as ai,k as aj,Tt as ak,un as al,xt as am,$n as an,Ar as ao,Ln as ap,Or as aq,nt as ar,ur as as,ir as at,Kt as au,Lr as av,it as aw,Bn as ax,cn as ay,br as az,dr as b,mr as c,xr as d,Ct as e,Tr as f,Cn as g,vr as h,En as i,D as j,hr as k,yr as l,cr as m,jn as n,M as o,Hr as p,Pr as q,dn as r,gr as s,kr as t,Nn as u,pr as v,Nr as w,Cr as x,wn as y,w as z};