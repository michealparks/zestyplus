import{S as D,aj as Z,ak as $,a6 as y,al as H,ab as g,am as O,U as v,T as w,C,an as V,ao as W,Y as J,ap as Q,a5 as z,n as q,aq as X,ar as k,as as ee,at as re,g as K,au as A,av as G,aw as ne,ax as te,ah as U,ay as ie,f as ae,az as se,aA as fe,W as Y,aB as ue,aC as le}from"./runtime.D2gsQGmM.js";import{s as oe}from"./utils.bH5PDxBC.js";function R(e,r=null,s){if(typeof e!="object"||e===null||D in e)return e;const t=W(e);if(t!==Z&&t!==$)return e;var i=new Map,c=J(e),p=y(0);c&&i.set("length",y(e.length));var h;return new Proxy(e,{defineProperty(l,n,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&H();var u=i.get(n);return u===void 0?(u=y(a.value),i.set(n,u)):g(u,R(a.value,h)),!0},deleteProperty(l,n){var a=i.get(n);if(a===void 0)n in l&&i.set(n,y(v));else{if(c&&typeof n=="string"){var u=i.get("length"),f=Number(n);Number.isInteger(f)&&f<u.v&&g(u,f)}g(a,v),F(p)}return!0},get(l,n,a){var _;if(n===D)return e;var u=i.get(n),f=n in l;if(u===void 0&&(!f||(_=O(l,n))!=null&&_.writable)&&(u=y(R(f?l[n]:v,h)),i.set(n,u)),u!==void 0){var o=w(u);return o===v?void 0:o}return Reflect.get(l,n,a)},getOwnPropertyDescriptor(l,n){var a=Reflect.getOwnPropertyDescriptor(l,n);if(a&&"value"in a){var u=i.get(n);u&&(a.value=w(u))}else if(a===void 0){var f=i.get(n),o=f==null?void 0:f.v;if(f!==void 0&&o!==v)return{enumerable:!0,configurable:!0,value:o,writable:!0}}return a},has(l,n){var o;if(n===D)return!0;var a=i.get(n),u=a!==void 0&&a.v!==v||Reflect.has(l,n);if(a!==void 0||C!==null&&(!u||(o=O(l,n))!=null&&o.writable)){a===void 0&&(a=y(u?R(l[n],h):v),i.set(n,a));var f=w(a);if(f===v)return!1}return u},set(l,n,a,u){var m;var f=i.get(n),o=n in l;if(c&&n==="length")for(var _=a;_<f.v;_+=1){var P=i.get(_+"");P!==void 0?g(P,v):_ in l&&(P=y(v),i.set(_+"",P))}f===void 0?(!o||(m=O(l,n))!=null&&m.writable)&&(f=y(void 0),g(f,R(a,h)),i.set(n,f)):(o=f.v!==v,g(f,R(a,h)));var b=Reflect.getOwnPropertyDescriptor(l,n);if(b!=null&&b.set&&b.set.call(u,a),!o){if(c&&typeof n=="string"){var S=i.get("length"),x=Number(n);Number.isInteger(x)&&x>=S.v&&g(S,x+1)}F(p)}return!0},ownKeys(l){w(p);var n=Reflect.ownKeys(l).filter(f=>{var o=i.get(f);return o===void 0||o.v!==v});for(var[a,u]of i)u.v!==v&&!(a in l)&&n.push(a);return n},setPrototypeOf(){V()}})}function F(e,r=1){g(e,e.v+r)}let N=!1;function ge(e,r,s){const t=s[r]??(s[r]={store:null,source:z(void 0),unsubscribe:q});if(t.store!==e)if(t.unsubscribe(),t.store=e??null,e==null)t.source.v=void 0,t.unsubscribe=q;else{var i=!0;t.unsubscribe=oe(e,c=>{i?t.source.v=c:g(t.source,c)}),i=!1}return w(t.source)}function we(){const e={};return Q(()=>{for(var r in e)e[r].unsubscribe()}),e}function de(e){var r=N;try{return N=!1,[e(),N]}finally{N=r}}const ce={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function ye(e,r,s){return new Proxy({props:e,exclude:r},ce)}const ve={get(e,r){let s=e.props.length;for(;s--;){let t=e.props[s];if(A(t)&&(t=t()),typeof t=="object"&&t!==null&&r in t)return t[r]}},set(e,r,s){let t=e.props.length;for(;t--;){let i=e.props[t];A(i)&&(i=i());const c=O(i,r);if(c&&c.set)return c.set(s),!0}return!1},getOwnPropertyDescriptor(e,r){let s=e.props.length;for(;s--;){let t=e.props[s];if(A(t)&&(t=t()),typeof t=="object"&&t!==null&&r in t){const i=O(t,r);return i&&!i.configurable&&(i.configurable=!0),i}}},has(e,r){if(r===D||r===G)return!1;for(let s of e.props)if(A(s)&&(s=s()),s!=null&&r in s)return!0;return!1},ownKeys(e){const r=[];for(let s of e.props){A(s)&&(s=s());for(const t in s)r.includes(t)||r.push(t)}return r}};function pe(...e){return new Proxy({props:e},ve)}function M(e){for(var r=C,s=C;r!==null&&!(r.f&(ne|te));)r=r.parent;try{return U(r),e()}finally{U(s)}}function he(e,r,s,t){var j;var i=(s&ie)!==0,c=!ae||(s&se)!==0,p=(s&fe)!==0,h=(s&le)!==0,l=!1,n;p?[n,l]=de(()=>e[r]):n=e[r];var a=D in e||G in e,u=p&&(((j=O(e,r))==null?void 0:j.set)??(a&&r in e&&(d=>e[r]=d)))||void 0,f=t,o=!0,_=!1,P=()=>(_=!0,o&&(o=!1,h?f=K(t):f=t),f);n===void 0&&t!==void 0&&(u&&c&&X(),n=P(),u&&u(n));var b;if(c)b=()=>{var d=e[r];return d===void 0?P():(o=!0,_=!1,d)};else{var S=M(()=>(i?Y:ue)(()=>e[r]));S.f|=k,b=()=>{var d=w(S);return d!==void 0&&(f=void 0),d===void 0?f:d}}if(!(s&ee))return b;if(u){var x=e.$$legacy;return function(d,I){return arguments.length>0?((!c||!I||x||l)&&u(I?b():d),d):b()}}var m=!1,B=!1,T=z(n),E=M(()=>Y(()=>{var d=b(),I=w(T);return m?(m=!1,B=!0,I):(B=!1,T.v=d)}));return i||(E.equals=re),function(d,I){if(arguments.length>0){const L=I?w(E):c&&p?R(d):d;return E.equals(L)||(m=!0,g(T,L),_&&f!==void 0&&(f=L),K(()=>w(E))),d}return w(E)}}export{R as a,we as b,ge as c,he as p,ye as r,pe as s};
