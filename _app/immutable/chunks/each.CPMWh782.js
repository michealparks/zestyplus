import{C as ee,n as ae,D as P,o as w,w as b,q as re,F as ne,G as Q,H as ie,v as z,x as k,B as H,I as S,y as U,z as W,A as fe,J as le,K as F,L,M as G,N as O,O as te,P as se,Q as ue,R as ve,S as de,T as _e,V as oe,W as ce,X as he,Y as J,Z as Ee,_ as pe}from"./index-client.D_7LkImg.js";function me(l,e){return e}function Ae(l,e,a,u){for(var v=[],d=e.length,t=0;t<d;t++)te(e[t].e,v,!0);var p=d>0&&v.length===0&&a!==null;if(p){var o=a.parentNode;se(o),o.append(a),u.clear(),C(l,e[0].prev,e[d-1].next)}ue(v,()=>{for(var T=0;T<d;T++){var _=e[T];p||(u.delete(_.k),C(l,_.prev,_.next)),ve(_.e,!p)}})}function Ce(l,e,a,u,v,d=null){var t=l,p={flags:e,items:new Map,first:null},o=(e&P)!==0;if(o){var T=l;t=w?b(de(T)):T.appendChild(ee())}w&&re();var _=null,I=!1;ae(()=>{var x=a(),r=ne(x)?x:x==null?[]:Q(x),i=r.length;if(I&&i===0)return;I=i===0;let s=!1;if(w){var N=t.data===ie;N!==(i===0)&&(t=z(),b(t),k(!1),s=!0)}if(w){for(var c=null,h,E=0;E<i;E++){if(H.nodeType===8&&H.data===_e){t=H,s=!0,k(!1);break}var A=r[E],n=u(A,E);h=Z(H,p,c,null,A,n,E,v,e),p.items.set(n,h),c=h}i>0&&b(z())}if(!w){var f=oe;Te(r,p,t,v,e,(f.f&S)!==0,u)}d!==null&&(i===0?_?U(_):_=W(()=>d(t)):_!==null&&fe(_,()=>{_=null})),s&&k(!0),a()}),w&&(t=H)}function Te(l,e,a,u,v,d,t,p){var V,Y,q,B;var o=(v&ce)!==0,T=(v&(L|O))!==0,_=l.length,I=e.items,x=e.first,r=x,i,s=null,N,c=[],h=[],E,A,n,f;if(o)for(f=0;f<_;f+=1)E=l[f],A=t(E,f),n=I.get(A),n!==void 0&&((V=n.a)==null||V.measure(),(N??(N=new Set)).add(n));for(f=0;f<_;f+=1){if(E=l[f],A=t(E,f),n=I.get(A),n===void 0){var $=r?r.e.nodes_start:a;s=Z($,e,s,s===null?e.first:s.next,E,A,f,u,v),I.set(A,s),c=[],h=[],r=s.next;continue}if(T&&Ie(n,E,f,v),n.e.f&S&&(U(n.e),o&&((Y=n.a)==null||Y.unfix(),(N??(N=new Set)).delete(n))),n!==r){if(i!==void 0&&i.has(n)){if(c.length<h.length){var R=h[0],m;s=R.prev;var y=c[0],D=c[c.length-1];for(m=0;m<c.length;m+=1)K(c[m],R,a);for(m=0;m<h.length;m+=1)i.delete(h[m]);C(e,y.prev,D.next),C(e,s,y),C(e,D,R),r=R,s=D,f-=1,c=[],h=[]}else i.delete(n),K(n,r,a),C(e,n.prev,n.next),C(e,n,s===null?e.first:s.next),C(e,s,n),s=n;continue}for(c=[],h=[];r!==null&&r.k!==A;)(d||!(r.e.f&S))&&(i??(i=new Set)).add(r),h.push(r),r=r.next;if(r===null)continue;n=r}c.push(n),s=n,r=n.next}if(r!==null||i!==void 0){for(var g=i===void 0?[]:Q(i);r!==null;)(d||!(r.e.f&S))&&g.push(r),r=r.next;var M=g.length;if(M>0){var j=v&P&&_===0?a:null;if(o){for(f=0;f<M;f+=1)(q=g[f].a)==null||q.measure();for(f=0;f<M;f+=1)(B=g[f].a)==null||B.fix()}Ae(e,g,j,I)}}o&&le(()=>{var X;if(N!==void 0)for(n of N)(X=n.a)==null||X.apply()}),F.first=e.first&&e.first.e,F.last=s&&s.e}function Ie(l,e,a,u){u&L&&G(l.v,e),u&O?G(l.i,a):l.i=a}function Z(l,e,a,u,v,d,t,p,o,T){var _=(o&L)!==0,I=(o&Ee)===0,x=_?I?he(v):J(v):v,r=o&O?J(t):t,i={i:r,v:x,k:d,a:null,e:null,prev:a,next:u};try{return i.e=W(()=>p(l,x,r),w),i.e.prev=a&&a.e,i.e.next=u&&u.e,a===null?e.first=i:(a.next=i,a.e.next=i.e),u!==null&&(u.prev=i,u.e.prev=i.e),i}finally{}}function K(l,e,a){for(var u=l.next?l.next.e.nodes_start:a,v=e?e.e.nodes_start:a,d=l.e.nodes_start;d!==u;){var t=pe(d);v.before(d),d=t}}function C(l,e,a){e===null?l.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}export{Ce as e,me as i};
