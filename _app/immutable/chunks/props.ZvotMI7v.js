import{Y as U,Z as C,n as x,L as Y,g as c,Q as E,_ as $,$ as j,a0 as G,a1 as Z,u as y,a2 as d,S as q,a3 as F,a4 as z,a5 as H,a6 as L,a7 as Q,a8 as V,a9 as J,aa as W,I as T,d as X,R as D,ab as k}from"./runtime.BAh1p-zl.js";import{p as ee}from"./proxy.DG7b0xtK.js";import{s as re}from"./index-client.8EITsIpT.js";let v=!1;function fe(e,r,s){const n=s[r]??(s[r]={store:null,source:C(void 0),unsubscribe:x});if(n.store!==e)if(n.unsubscribe(),n.store=e??null,e==null)n.source.v=void 0,n.unsubscribe=x;else{var t=!0;n.unsubscribe=re(e,i=>{t?n.source.v=i:Y(n.source,i)}),t=!1}return c(n.source)}function le(){const e={};return U(()=>{for(var r in e)e[r].unsubscribe()}),e}function ne(e){var r=v;try{return v=!1,[e(),v]}finally{v=r}}const se={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function oe(e,r,s){return new Proxy({props:e,exclude:r},se)}const ue={get(e,r){let s=e.props.length;for(;s--;){let n=e.props[s];if(d(n)&&(n=n()),typeof n=="object"&&n!==null&&r in n)return n[r]}},set(e,r,s){let n=e.props.length;for(;n--;){let t=e.props[n];d(t)&&(t=t());const i=E(t,r);if(i&&i.set)return i.set(s),!0}return!1},getOwnPropertyDescriptor(e,r){let s=e.props.length;for(;s--;){let n=e.props[s];if(d(n)&&(n=n()),typeof n=="object"&&n!==null&&r in n){const t=E(n,r);return t&&!t.configurable&&(t.configurable=!0),t}}},has(e,r){if(r===q||r===F)return!1;for(let s of e.props)if(d(s)&&(s=s()),s!=null&&r in s)return!0;return!1},ownKeys(e){const r=[];for(let s of e.props){d(s)&&(s=s());for(const n in s)r.includes(n)||r.push(n)}return r}};function ce(...e){return new Proxy({props:e},ue)}function B(e){for(var r=D,s=D;r!==null&&!(r.f&(z|H));)r=r.parent;try{return L(r),e()}finally{L(s)}}function _e(e,r,s,n){var A;var t=(s&Q)!==0,i=!V||(s&J)!==0,b=(s&W)!==0,N=(s&k)!==0,R=!1,f;b?[f,R]=ne(()=>e[r]):f=e[r];var K=q in e||F in e,_=((A=E(e,r))==null?void 0:A.set)??(K&&b&&r in e?u=>e[r]=u:void 0),a=n,P=!0,h=!1,I=()=>(h=!0,P&&(P=!1,N?a=y(n):a=n),a);f===void 0&&n!==void 0&&(_&&i&&$(),f=I(),_&&_(f));var l;if(i)l=()=>{var u=e[r];return u===void 0?I():(P=!0,h=!1,u)};else{var O=B(()=>(t?T:X)(()=>e[r]));O.f|=j,l=()=>{var u=c(O);return u!==void 0&&(a=void 0),u===void 0?a:u}}if(!(s&G))return l;if(_){var M=e.$$legacy;return function(u,o){return arguments.length>0?((!i||!o||M||R)&&_(o?l():u),u):l()}}var w=!1,m=!1,S=C(f),p=B(()=>T(()=>{var u=l(),o=c(S);return w?(w=!1,m=!0,o):(m=!1,S.v=u)}));return t||(p.equals=Z),function(u,o){if(arguments.length>0){const g=o?c(p):i&&b?ee(u):u;return p.equals(g)||(w=!0,Y(S,g),h&&a!==void 0&&(a=g),y(()=>c(p))),u}return c(p)}}export{le as a,fe as b,_e as p,oe as r,ce as s};
