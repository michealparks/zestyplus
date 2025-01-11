import{c as F,a as Q}from"./disclose-version.hHKxC-Jk.js";import{a0 as M,a6 as O,v as s,a2 as z,n as E,a1 as L}from"./runtime.BZbTZrfI.js";import{s as V}from"./snippet.BOLubvD_.js";import{a as j}from"./props.DC6YhwhV.js";import{o as S,a as _}from"./index-client.DPkCdMtJ.js";import{u as k,a as G,b as H,c as q,d as B,R as J,o as K,A as h,e as N,f as U,g as X,h as Y}from"./createCollidersFromChildren.ChtovUMO.js";import{O as Z,V as l,Q as f}from"./three.module.iKKkBh6O.js";import{u as p,d as $,e as ee,w as te}from"./T.DXVn7S3O.js";const ne=(i,e)=>{const t=Array.from(i);for(let o=0;o<i.length/3;o++)t[o*3]*=e.x,t[o*3+1]*=e.y,t[o*3+2]*=e.z;return t},oe=(i,e,t)=>{const o=e.slice();if(i==="heightfield")return o;if(i==="trimesh"||i==="convexHull")return o[0]=new Float32Array(ne(o[0],t)),o;const c=[t.x,t.y,t.z];return o.map((a,r)=>(c[r]??1)*a)};function me(i,e){M(e,!0);let t=j(e,"collider",15);const o=new Z,{updateRef:c}=k(e.oncreate),a=G(),r=H(),u=!!a,d=q(),{world:g}=d,C=B(),y={oncollisionenter:e.oncollisionenter,oncollisionexit:e.oncollisionexit,oncontact:e.oncontact,onsensorenter:e.onsensorenter,onsensorexit:e.onsensorexit};S(async()=>{await O();const n=o.getWorldScale(new l),b=oe(e.shape,e.args,n),I=J[e.shape](...b);if(t(g.createCollider(I,a)),t().setActiveCollisionTypes(K.ALL),c(t()),d.addColliderToContext(t(),o,y),C.registerColliders([t()]),u){const w=new l,m=new f;r==null||r.getWorldPosition(w),r==null||r.getWorldQuaternion(m),m.invert();const T=o.getWorldPosition(new l).sub(w),D=o.getWorldQuaternion(new f).premultiply(m);t().setTranslationWrtParent(T),t().setRotationWrtParent(D)}else t().setTranslation(o.getWorldPosition(new l)),t().setRotation(o.getWorldQuaternion(new f))}),s(()=>{var n;(n=t())==null||n.setRestitution(e.restitution??0)}),s(()=>{var n;(n=t())==null||n.setRestitutionCombineRule(e.restitutionCombineRule??h.Average)}),s(()=>{var n;(n=t())==null||n.setFriction(e.friction??.7)}),s(()=>{var n;(n=t())==null||n.setFrictionCombineRule(e.frictionCombineRule??h.Average)}),s(()=>{var n;return(n=t())==null?void 0:n.setSensor(e.sensor??!1)}),s(()=>{var n;return(n=t())==null?void 0:n.setContactForceEventThreshold(e.contactForceEventThreshold??0)}),s(()=>{var n;e.density!==void 0&&((n=t())==null||n.setDensity(e.density))}),s(()=>{t()&&e.mass&&(e.centerOfMass&&e.principalAngularInertia&&e.angularInertiaLocalFrame?t().setMassProperties(e.mass,{x:e.centerOfMass[0],y:e.centerOfMass[1],z:e.centerOfMass[2]},{x:e.principalAngularInertia[0],y:e.principalAngularInertia[1],z:e.principalAngularInertia[2]},N(e.angularInertiaLocalFrame)):t().setMass(e.mass))}),s(()=>{var n;t()&&U(t(),y,(n=a==null?void 0:a.userData)==null?void 0:n.events)});const v=()=>{t()&&(t().setTranslation(X(o)),t().setRotation(Y(o)))},{start:x,stop:R}=p(()=>{v()},{autoStart:!u&&e.type==="dynamic"});s(()=>{!u&&e.type==="dynamic"?x():R()}),_(()=>{t()&&(d.removeColliderFromContext(t()),C.removeColliders([t()]),g.removeCollider(t(),!0),t(void 0))});const P=$();ee(o),te(P,n=>(n==null||n.add(o),()=>{n==null||n.remove(o)}));var A=F(),W=z(A);return V(W,()=>e.children??E,()=>({collider:t()})),Q(i,A),L({refresh:v})}export{me as C};
