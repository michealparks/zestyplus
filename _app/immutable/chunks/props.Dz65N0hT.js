import{S as D,an as Z,ao as $,a7 as y,ap as H,ai as g,aq as E,W as v,w,r as B,ar as V,as as W,Y as J,at as Q,a6 as z,E as q,au as X,av as k,aw as ee,ax as re,I as K,ay as A,az as G,aA as ne,aB as te,al as Y,aC as ie,ab as ae,aD as se,aE as fe,F as j,A as ue,aF as le}from"./runtime.XPaRurxh.js";import{s as oe}from"./utils.DZtLb5Up.js";function m(e,r=null,s){if(typeof e!="object"||e===null||D in e)return e;const t=W(e);if(t!==Z&&t!==$)return e;var i=new Map,c=J(e),p=y(0);c&&i.set("length",y(e.length));var P;return new Proxy(e,{defineProperty(l,n,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&H();var u=i.get(n);return u===void 0?(u=y(a.value),i.set(n,u)):g(u,m(a.value,P)),!0},deleteProperty(l,n){var a=i.get(n);if(a===void 0)n in l&&i.set(n,y(v));else{if(c&&typeof n=="string"){var u=i.get("length"),f=Number(n);Number.isInteger(f)&&f<u.v&&g(u,f)}g(a,v),M(p)}return!0},get(l,n,a){var _;if(n===D)return e;var u=i.get(n),f=n in l;if(u===void 0&&(!f||(_=E(l,n))!=null&&_.writable)&&(u=y(m(f?l[n]:v,P)),i.set(n,u)),u!==void 0){var o=w(u);return o===v?void 0:o}return Reflect.get(l,n,a)},getOwnPropertyDescriptor(l,n){var a=Reflect.getOwnPropertyDescriptor(l,n);if(a&&"value"in a){var u=i.get(n);u&&(a.value=w(u))}else if(a===void 0){var f=i.get(n),o=f==null?void 0:f.v;if(f!==void 0&&o!==v)return{enumerable:!0,configurable:!0,value:o,writable:!0}}return a},has(l,n){var o;if(n===D)return!0;var a=i.get(n),u=a!==void 0&&a.v!==v||Reflect.has(l,n);if(a!==void 0||B!==null&&(!u||(o=E(l,n))!=null&&o.writable)){a===void 0&&(a=y(u?m(l[n],P):v),i.set(n,a));var f=w(a);if(f===v)return!1}return u},set(l,n,a,u){var I;var f=i.get(n),o=n in l;if(c&&n==="length")for(var _=a;_<f.v;_+=1){var h=i.get(_+"");h!==void 0?g(h,v):_ in l&&(h=y(v),i.set(_+"",h))}f===void 0?(!o||(I=E(l,n))!=null&&I.writable)&&(f=y(void 0),g(f,m(a,P)),i.set(n,f)):(o=f.v!==v,g(f,m(a,P)));var b=Reflect.getOwnPropertyDescriptor(l,n);if(b!=null&&b.set&&b.set.call(u,a),!o){if(c&&typeof n=="string"){var O=i.get("length"),S=Number(n);Number.isInteger(S)&&S>=O.v&&g(O,S+1)}M(p)}return!0},ownKeys(l){w(p);var n=Reflect.ownKeys(l).filter(f=>{var o=i.get(f);return o===void 0||o.v!==v});for(var[a,u]of i)u.v!==v&&!(a in l)&&n.push(a);return n},setPrototypeOf(){V()}})}function M(e,r=1){g(e,e.v+r)}let N=!1;function ge(e,r,s){const t=s[r]??(s[r]={store:null,source:z(void 0),unsubscribe:q});if(t.store!==e)if(t.unsubscribe(),t.store=e??null,e==null)t.source.v=void 0,t.unsubscribe=q;else{var i=!0;t.unsubscribe=oe(e,c=>{i?t.source.v=c:g(t.source,c)}),i=!1}return w(t.source)}function we(){const e={};return Q(()=>{for(var r in e)e[r].unsubscribe()}),e}function de(e){var r=N;try{return N=!1,[e(),N]}finally{N=r}}const ce={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function ye(e,r,s){return new Proxy({props:e,exclude:r},ce)}const ve={get(e,r){let s=e.props.length;for(;s--;){let t=e.props[s];if(A(t)&&(t=t()),typeof t=="object"&&t!==null&&r in t)return t[r]}},set(e,r,s){let t=e.props.length;for(;t--;){let i=e.props[t];A(i)&&(i=i());const c=E(i,r);if(c&&c.set)return c.set(s),!0}return!1},getOwnPropertyDescriptor(e,r){let s=e.props.length;for(;s--;){let t=e.props[s];if(A(t)&&(t=t()),typeof t=="object"&&t!==null&&r in t){const i=E(t,r);return i&&!i.configurable&&(i.configurable=!0),i}}},has(e,r){if(r===D||r===G)return!1;for(let s of e.props)if(A(s)&&(s=s()),s!=null&&r in s)return!0;return!1},ownKeys(e){const r=[];for(let s of e.props){A(s)&&(s=s());for(const t in s)r.includes(t)||r.push(t)}return r}};function pe(...e){return new Proxy({props:e},ve)}function U(e){for(var r=B,s=B;r!==null&&!(r.f&(ne|te));)r=r.parent;try{return Y(r),e()}finally{Y(s)}}function Pe(e,r,s,t){var F;var i=(s&ie)!==0,c=!ae||(s&se)!==0,p=(s&fe)!==0,P=(s&le)!==0,l=!1,n;p?[n,l]=de(()=>e[r]):n=e[r];var a=D in e||G in e,u=p&&(((F=E(e,r))==null?void 0:F.set)??(a&&r in e&&(d=>e[r]=d)))||void 0,f=t,o=!0,_=!1,h=()=>(_=!0,o&&(o=!1,P?f=K(t):f=t),f);n===void 0&&t!==void 0&&(u&&c&&X(),n=h(),u&&u(n));var b;if(c)b=()=>{var d=e[r];return d===void 0?h():(o=!0,_=!1,d)};else{var O=U(()=>(i?j:ue)(()=>e[r]));O.f|=k,b=()=>{var d=w(O);return d!==void 0&&(f=void 0),d===void 0?f:d}}if(!(s&ee))return b;if(u){var S=e.$$legacy;return function(d,R){return arguments.length>0?((!c||!R||S||l)&&u(R?b():d),d):b()}}var I=!1,C=!1,T=z(n),x=U(()=>j(()=>{var d=b(),R=w(T);return I?(I=!1,C=!0,R):(C=!1,T.v=d)}));return i||(x.equals=re),function(d,R){if(arguments.length>0){const L=R?w(x):c&&p?m(d):d;return x.equals(L)||(I=!0,g(T,L),_&&f!==void 0&&(f=L),K(()=>w(x))),d}return w(x)}}export{ge as a,pe as b,m as c,Pe as p,ye as r,we as s};
