import"./disclose-version.Bg9kRutz.js";import{A as N,aF as O,B as ne,p as J,u as d,f as M,$ as oe,a as K,aE as ie,aD as Ce,n as H,x as B,a5 as xe,a6 as we,z}from"./index-client.DDUn5bf5.js";import{c as V,a as j}from"./template.DXGbSFUO.js";import{e as De,i as Te}from"./each.BRtJwWNB.js";import{c as U}from"./svelte-component.BQYC_p_3.js";import{a as f,p as G}from"./props.Hru3xw41.js";import{j as Ae,V as v,O as se,Y as re,Z as ae,_ as le,s as ce,Q,u as de,$ as Be,T as Z}from"./T.6-q_PtqM.js";import{u as Y,Y as Se,i as Pe,p as q,g as Ie,a as ue,b as ge,s as Ee,E as X,R as Me,o as Ve,A as p,e as je}from"./createCollidersFromChildren.BSSDzg8b.js";import{g as fe,d as Oe,w as L}from"./index.CL_F-KcT.js";const $=(i,e)=>{i.forEach(t=>{t&&t.collider&&t.collider.isValid()&&t.collider.setCollisionGroups(e)})},We=()=>{const i=new Map,e=N("threlte-rapier-collision-group");if(!e)return{registerColliders:s=>{},removeColliders:s=>{}};let t=fe(e);const n=e.subscribe(s=>{t=s,$(i,s)});return O(n),{registerColliders:s=>{s.forEach(r=>{i.has(r.handle)||i.set(r.handle,{collider:r,initialCollisionGroup:r.collisionGroups()})}),$(i,t)},removeColliders:s=>{s.forEach(r=>{const u=i.get(r.handle);u&&r&&r.isValid()&&r.setCollisionGroups(u.initialCollisionGroup),i.delete(r.handle)})}}},ke=()=>N("threlte-rapier-rigidbody"),_e=i=>{const e=L(void 0),t=L(void 0),n=Y(),c=Oe([e,t],([r,u])=>{if(r&&u)return[r,u]}),l=L(void 0),s=c.subscribe(r=>{r&&l.set(i(...r,n))});return O(()=>{s();const r=fe(l);r&&(r instanceof Se?n.world.removeMultibodyJoint(r,!0):n.world.removeImpulseJoint(r,!0))}),{joint:l,rigidBodyA:e,rigidBodyB:t}},ee=i=>Ae(i,"Vector3"),Fe=(i,e,t)=>_e((n,c,{world:l,rapier:s})=>{const r=ee(i)?i:new v(...i),u=ee(e)?e:new v(...e),R=s.JointData.rope(t,r,u);return l.createImpulseJoint(R,n,c,!0)}),me=Symbol("threlte-rapier-rigidbody-object3d"),ze=()=>N(me),Ge=i=>{ne(me,i)},ye=i=>{const e=[];let t;const n=()=>{if(e.forEach(s=>s()),e.length=0,t===void 0)return;const l=i==null?void 0:i(t);l&&e.push(l)},c=l=>{t=l,n()};return O(()=>{e.forEach(l=>l())}),{updateRef:c}},te={position:["setTranslation","setNextKinematicTranslation"],rotation:["setRotation","setNextKinematicRotation"]},Qe=(i,e)=>{const t={};te.position.forEach(n=>{t[n]=i[n].bind(i);const c=(...l)=>(e.userData.physics.resetPosition=!0,t[n](...l));i[n]=c}),te.rotation.forEach(n=>{t[n]=i[n].bind(i);const c=(...l)=>(e.userData.physics.resetRotation=!0,t[n](...l));i[n]=c})};function Le(i,e){J(e,!0);const{world:t,rapier:n,addRigidBodyToContext:c,removeRigidBodyFromContext:l}=Y();let s=f(e,"type",3,"dynamic"),r=f(e,"canSleep",3,!0),u=f(e,"gravityScale",3,1),R=f(e,"ccd",3,!1),w=f(e,"angularDamping",3,0),D=f(e,"linearDamping",3,0),T=f(e,"lockRotations",3,!1),h=f(e,"lockTranslations",3,!1),A=f(e,"enabledRotations",19,()=>[!0,!0,!0]),S=f(e,"enabledTranslations",19,()=>[!0,!0,!0]),m=f(e,"dominance",3,0),y=f(e,"enabled",3,!0),o=f(e,"userData",19,()=>({})),C=f(e,"rigidBody",15);const{updateRef:P}=ye(e.oncreate),g=new se;Pe(g),g.userData.isSleeping=!1;const x=new n.RigidBodyDesc(q(s())).setCanSleep(r());let a=t.createRigidBody(x);Qe(a,g),C(a),(async()=>{await ie(),g.updateMatrix(),g.updateWorldMatrix(!0,!1);const b=g.parent?Ie(g.parent):new v(1,1,1),F=ue(g).multiply(b),E=ge(g);Ee(g,F,E),a.setTranslation(F,!0),a.setRotation(E,!0),P(a)})(),g.userData.rigidBody=a,d(()=>a.setBodyType(q(s()),!0)),d(()=>{e.linearVelocity&&a.setLinvel({x:e.linearVelocity[0],y:e.linearVelocity[1],z:e.linearVelocity[2]},!0)}),d(()=>{e.angularVelocity&&a.setAngvel({x:e.angularVelocity[0],y:e.angularVelocity[1],z:e.angularVelocity[2]},!0)}),d(()=>a.setGravityScale(u(),!0)),d(()=>a.enableCcd(R())),d(()=>a.setDominanceGroup(m())),d(()=>a.lockRotations(T(),!0)),d(()=>a.lockTranslations(h(),!0)),d(()=>a.setEnabledRotations(...A(),!0)),d(()=>a.setEnabledTranslations(...S(),!0)),d(()=>a.setAngularDamping(w())),d(()=>a.setLinearDamping(D())),d(()=>a.setEnabled(y())),d(()=>{a.userData={events:{oncollisionenter:e.oncollisionenter,oncollisionexit:e.oncollisionexit,oncontact:e.oncontact,onsensorenter:e.onsensorenter,onsensorexit:e.onsensorexit,onsleep:e.onsleep,onwake:e.onwake},...o()}}),ne("threlte-rapier-rigidbody",a),Ge(g),c(a,g,{oncollisionenter:e.oncollisionenter,oncollisionexit:e.oncollisionexit,oncontact:e.oncontact,onsensorenter:e.onsensorenter,onsensorexit:e.onsensorexit,onsleep:e.onsleep,onwake:e.onwake}),O(()=>{l(a),t.removeRigidBody(a)});const I=re();ae(g),le(I,b=>(b==null||b.add(g),()=>{b==null||b.remove(g)}));var k=V(),_=M(k);ce(_,()=>e.children??oe,()=>({rigidBody:a})),j(i,k),K()}const Ne=(i,e={},t={})=>{let n=0;(e.oncollisionenter||e.oncollisionexit||t.oncollisionenter||t.oncollisionexit||e.onsensorenter||e.onsensorexit||t.onsensorenter||t.onsensorexit)&&(n=n|X.COLLISION_EVENTS),(e.oncontact||t.oncontact)&&(n=n|X.CONTACT_FORCE_EVENTS),n>0&&i.setActiveEvents(n)},Je=(i,e)=>{const t=Array.from(i);for(let n=0;n<i.length/3;n++)t[n*3]*=e.x,t[n*3+1]*=e.y,t[n*3+2]*=e.z;return t},Ke=(i,e,t)=>{const n=e.slice();if(i==="heightfield")return n;if(i==="trimesh"||i==="convexHull")return n[0]=new Float32Array(Je(n[0],t)),n;const c=[t.x,t.y,t.z];return n.map((l,s)=>(c[s]??1)*l)};function Ye(i,e){J(e,!0);let t=f(e,"collider",15);const n=new se,{updateRef:c}=ye(e.oncreate),l=ke(),s=ze(),r=!!l,u=Y(),{world:R}=u,w=We(),D={oncollisionenter:e.oncollisionenter,oncollisionexit:e.oncollisionexit,oncontact:e.oncontact,onsensorenter:e.onsensorenter,onsensorexit:e.onsensorexit};Ce(async()=>{await ie();const o=n.getWorldScale(new v),C=Ke(e.shape,e.args,o),P=Me[e.shape](...C);if(t(R.createCollider(P,l)),t().setActiveCollisionTypes(Ve.ALL),c(t()),u.addColliderToContext(t(),n,D),w.registerColliders([t()]),r){const g=new v,x=new Q;s==null||s.getWorldPosition(g),s==null||s.getWorldQuaternion(x),x.invert();const a=n.getWorldPosition(new v).sub(g),W=n.getWorldQuaternion(new Q).premultiply(x);t().setTranslationWrtParent(a),t().setRotationWrtParent(W)}else t().setTranslation(n.getWorldPosition(new v)),t().setRotation(n.getWorldQuaternion(new Q))}),d(()=>{var o;(o=t())==null||o.setRestitution(e.restitution??0)}),d(()=>{var o;(o=t())==null||o.setRestitutionCombineRule(e.restitutionCombineRule??p.Average)}),d(()=>{var o;(o=t())==null||o.setFriction(e.friction??.7)}),d(()=>{var o;(o=t())==null||o.setFrictionCombineRule(e.frictionCombineRule??p.Average)}),d(()=>{var o;return(o=t())==null?void 0:o.setSensor(e.sensor??!1)}),d(()=>{var o;return(o=t())==null?void 0:o.setContactForceEventThreshold(e.contactForceEventThreshold??0)}),d(()=>{var o;e.density!==void 0&&((o=t())==null||o.setDensity(e.density))}),d(()=>{t()&&e.mass&&(e.centerOfMass&&e.principalAngularInertia&&e.angularInertiaLocalFrame?t().setMassProperties(e.mass,{x:e.centerOfMass[0],y:e.centerOfMass[1],z:e.centerOfMass[2]},{x:e.principalAngularInertia[0],y:e.principalAngularInertia[1],z:e.principalAngularInertia[2]},je(e.angularInertiaLocalFrame)):t().setMass(e.mass))}),d(()=>{var o;t()&&Ne(t(),D,(o=l==null?void 0:l.userData)==null?void 0:o.events)});const T=()=>{t()&&(t().setTranslation(ue(n)),t().setRotation(ge(n)))},{start:h,stop:A}=de(()=>{T()},{autoStart:!r&&e.type==="dynamic"});d(()=>{!r&&e.type==="dynamic"?h():A()}),O(()=>{t()&&(u.removeColliderFromContext(t()),w.removeColliders([t()]),R.removeCollider(t(),!0),t(void 0))});const S=re();ae(n),le(S,o=>(o==null||o.add(n),()=>{o==null||o.remove(n)}));var m=V(),y=M(m);return ce(y,()=>e.children??oe,()=>({collider:t()})),j(i,m),K({refresh:T})}function He(i,e){J(e,!0);let t=f(e,"startRigidBody",15),n=f(e,"lastRigidBody",15),c=f(e,"positions",15),l=z(()=>e.length/(e.segments-1)),s=xe(!1);const r=z(()=>Array.from({length:e.segments-1},()=>Fe([0,0,0],[0,0,0],B(l))));c(new Float32Array(e.segments));const u=G([]);H(()=>{t(u.at(0)),n(u.at(-1))});const R=G([]),w=new v().fromArray(e.ropeStart),D=new v().fromArray(e.ropeEnd),T=m=>{const y=m/(e.segments-1);return w.clone().lerp(D,y)};H(()=>{u.length!==e.segments||R.length!==e.segments||B(s)||(B(r).forEach((m,y)=>{m.rigidBodyA.set(u[y]),m.rigidBodyB.set(u[y+1])}),we(s,!0))}),G(Array.from({length:e.segments},()=>new v(0,0,0)));const h=new v;de(()=>{var m;if(B(s))for(let y=0,o=0,C=R.length;y<C;y+=1,o+=3)(m=R[y])==null||m.getWorldPosition(h),c(c()[o+0]=h.x,!0),c(c()[o+1]=h.y,!0),c(c()[o+2]=h.z,!0)}),Be(()=>[B(s),e.ropeStart,e.ropeEnd],([m])=>{var y;m&&((y=t())==null||y.setNextKinematicTranslation({x:e.ropeStart[0],y:e.ropeStart[1],z:e.ropeStart[2]}))});var A=V(),S=M(A);De(S,17,()=>({length:e.segments}),Te,(m,y,o)=>{var C=V(),P=M(C);U(P,()=>Z.Group,(g,x)=>{x(g,{oncreate:a=>{a.position.copy(T(o))},children:(a,W)=>{Le(a,{get linearDamping(){return e.damping},get angularDamping(){return e.damping},type:o===0?"kinematicPosition":"dynamic",get rigidBody(){return u[o]},set rigidBody(I){u[o]=I},children:(I,k)=>{var _=z(()=>[e.ballRadius]);Ye(I,{shape:"ball",get args(){return B(_)},children:(b,F)=>{var E=V(),Re=M(E);U(Re,()=>Z.Object3D,(ve,be)=>{be(ve,{get ref(){return R[o]},set ref(he){R[o]=he}})}),j(b,E)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})}),j(m,C)}),j(i,A),K()}const ot=Object.freeze(Object.defineProperty({__proto__:null,default:He},Symbol.toStringTag,{value:"Module"}));export{Ye as C,He as R,ot as a};
