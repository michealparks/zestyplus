import{ad as E,a6 as b,ae as D,R as k,Y as j,q as C,af as H,W as M,ag as L,ah as P,ai as B,aj as $,ak as T,v as w,o as A,k as z,z as p,al as x,am as F,an as G,ao as J,ap as K,aq as Q,ar as U,x as X,p as Z,j as R,a as rr,C as ar}from"./runtime.BAh1p-zl.js";import{d as tr}from"./disclose-version.B1qbiK4R.js";const er=["touchstart","touchmove"];function nr(r){return er.includes(r)}function ir(r){var a=D,e=k;E(null),b(null);try{return r()}finally{E(a),b(e)}}const q=new Set,S=new Set;function I(r,a,e,s){function n(t){if(s.capture||g.call(a,t),!t.cancelBubble)return ir(()=>e.call(this,t))}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?C(()=>{a.addEventListener(r,n,s)}):a.addEventListener(r,n,s),n}function fr(r,a,e,s={}){var n=I(a,r,e,s);return()=>{r.removeEventListener(a,n,s)}}function lr(r,a,e,s,n){var t={capture:s,passive:n},u=I(r,a,e,t);(a===document.body||a===window||a===document)&&j(()=>{a.removeEventListener(r,u,t)})}function dr(r){for(var a=0;a<r.length;a++)q.add(r[a]);for(var e of S)e(r)}function g(r){var O;var a=this,e=a.ownerDocument,s=r.type,n=((O=r.composedPath)==null?void 0:O.call(r))||[],t=n[0]||r.target,u=0,_=r.__root;if(_){var d=n.indexOf(_);if(d!==-1&&(a===document||a===window)){r.__root=a;return}var h=n.indexOf(a);if(h===-1)return;d<=h&&(u=d)}if(t=n[u]||r.target,t!==a){H(r,"currentTarget",{configurable:!0,get(){return t||e}});var m=D,f=k;E(null),b(null);try{for(var i,o=[];t!==null;){var l=t.assignedSlot||t.parentNode||t.host||null;try{var c=t["__"+s];if(c!==void 0&&!t.disabled)if(M(c)){var[W,...Y]=c;W.apply(t,[r,...Y])}else c.call(t,r)}catch(y){i?o.push(y):i=y}if(r.cancelBubble||l===a||l===null)break;t=l}if(i){for(let y of o)queueMicrotask(()=>{throw y});throw i}}finally{r.__root=a,delete r.currentTarget,E(m),b(f)}}}function cr(r,a){var e=a==null?"":typeof a=="object"?a+"":a;e!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=e,r.nodeValue=e==null?"":e+"")}function sr(r,a){return V(r,a)}function _r(r,a){L(),a.intro=a.intro??!1;const e=a.target,s=R,n=p;try{for(var t=P(e);t&&(t.nodeType!==8||t.data!==B);)t=$(t);if(!t)throw T;w(!0),A(t),z();const u=V(r,{...a,anchor:t});if(p===null||p.nodeType!==8||p.data!==x)throw F(),T;return w(!1),u}catch(u){if(u===T)return a.recover===!1&&G(),L(),J(e),w(!1),sr(r,a);throw u}finally{w(s),A(n)}}const v=new Map;function V(r,{target:a,anchor:e,props:s={},events:n,context:t,intro:u=!0}){L();var _=new Set,d=f=>{for(var i=0;i<f.length;i++){var o=f[i];if(!_.has(o)){_.add(o);var l=nr(o);a.addEventListener(o,g,{passive:l});var c=v.get(o);c===void 0?(document.addEventListener(o,g,{passive:l}),v.set(o,1)):v.set(o,c+1)}}};d(K(q)),S.add(d);var h=void 0,m=Q(()=>{var f=e??a.appendChild(U());return X(()=>{if(t){Z({});var i=ar;i.c=t}n&&(s.$$events=n),R&&tr(f,null),h=r(f,s)||{},R&&(k.nodes_end=p),t&&rr()}),()=>{var l;for(var i of _){a.removeEventListener(i,g);var o=v.get(i);--o===0?(document.removeEventListener(i,g),v.delete(i)):v.set(i,o)}S.delete(d),f!==e&&((l=f.parentNode)==null||l.removeChild(f))}});return N.set(h,m),h}let N=new WeakMap;function hr(r,a){const e=N.get(r);return e?(N.delete(r),e(a)):Promise.resolve()}export{dr as d,lr as e,_r as h,sr as m,fr as o,cr as s,hr as u};