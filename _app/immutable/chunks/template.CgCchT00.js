import{G as i,W as u,M as f,a7 as v,a8 as p,w as d,F as o,x as h,z as E}from"./index-client.DzQlphmH.js";function T(r){var t=document.createElement("template");return t.innerHTML=r,t.content}function n(r,t){var e=f;e.nodes_start===null&&(e.nodes_start=r,e.nodes_end=t)}function M(r,t){var e=(t&v)!==0,_=(t&p)!==0,a,c=!r.startsWith("<!>");return()=>{if(d)return n(o,null),o;a===void 0&&(a=T(c?r:"<!>"+r),e||(a=u(a)));var s=_?document.importNode(a,!0):a.cloneNode(!0);if(e){var m=u(s),l=s.lastChild;n(m,l)}else n(s,s);return s}}function x(r=""){if(!d){var t=i(r+"");return n(t,t),t}var e=o;return e.nodeType!==3&&(e.before(e=i()),E(e)),n(e,e),e}function y(){if(d)return n(o,null),o;var r=document.createDocumentFragment(),t=document.createComment(""),e=i();return r.append(t,e),n(t,e),r}function N(r,t){if(d){f.nodes_end=o,h();return}r!==null&&r.before(t)}export{N as a,n as b,y as c,x as d,M as t};