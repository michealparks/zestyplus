import{c as w,b}from"./disclose-version.DFxnx1AN.js";import{B as N,u as S,T as c,a8 as R,D as q,aa as H,ab as L,W as j}from"./runtime.BxeNZxLl.js";import{e as Q,i as U}from"./each.Dtb_ZQQj.js";import{c as _}from"./svelte-component.C7V4StSs.js";import{p,a as D}from"./props.CvCzEa8T.js";import{V as f}from"./three.module.iKKkBh6O.js";import{i as X,u as Z,o as $,T as A}from"./T.BojAtv_L.js";import{c as tt,Y as et,i as rt}from"./createCollidersFromChildren.3deb0VN8.js";import{a as nt}from"./index-client.DixpdGuH.js";import{d as st,g as ot,w as I}from"./index.BNeNpGEZ.js";import{C as it}from"./Collider.Bc7fSUD2.js";const at=a=>{const t=I(void 0),m=I(void 0),u=tt(),s=st([t,m],([e,r])=>{if(e&&r)return[e,r]}),l=I(void 0),d=s.subscribe(e=>{e&&l.set(a(...e,u))});return nt(()=>{d();const e=ot(l);e&&(e instanceof et?u.world.removeMultibodyJoint(e,!0):u.world.removeImpulseJoint(e,!0))}),{joint:l,rigidBodyA:t,rigidBodyB:m}},T=a=>X(a,"Vector3"),dt=(a,t,m)=>at((u,s,{world:l,rapier:d})=>{const e=T(a)?a:new f(...a),r=T(t)?t:new f(...t),g=d.JointData.rope(m,e,r);return l.createImpulseJoint(g,u,s,!0)});function pt(a,t){N(t,!0);let m=p(t,"startRigidBody",15),u=p(t,"lastRigidBody",15),s=p(t,"positions",15),l=j(()=>t.length/(t.segments-1)),d=H(!1);const e=j(()=>Array.from({length:t.segments-1},()=>dt([0,0,0],[0,0,0],c(l))));s(new Float32Array(t.segments));const r=D([]);S(()=>{m(r.at(0)),u(r.at(-1))});const g=D([]),V=new f().fromArray(t.ropeStart),z=new f().fromArray(t.ropeEnd),E=o=>{const n=o/(t.segments-1);return V.clone().lerp(z,n)};S(()=>{r.length!==t.segments||g.length!==t.segments||c(d)||(c(e).forEach((o,n)=>{o.rigidBodyA.set(r[n]),o.rigidBodyB.set(r[n+1])}),L(d,!0))}),D(Array.from({length:t.segments},()=>new f(0,0,0)));const y=new f;Z(()=>{var o;if(c(d))for(let n=0,i=0,B=g.length;n<B;n+=1,i+=3)(o=g[n])==null||o.getWorldPosition(y),s(s()[i+0]=y.x,!0),s(s()[i+1]=y.y,!0),s(s()[i+2]=y.z,!0)}),$(()=>[c(d),t.ropeStart,t.ropeEnd],([o])=>{var n;o&&((n=m())==null||n.setNextKinematicTranslation({x:t.ropeStart[0],y:t.ropeStart[1],z:t.ropeStart[2]}))});var J=w(),k=R(J);Q(k,17,()=>({length:t.segments}),U,(o,n,i)=>{var B=w(),C=R(B);_(C,()=>A.Group,(O,W)=>{W(O,{oncreate:v=>{v.position.copy(E(i))},children:(v,mt)=>{rt(v,{get linearDamping(){return t.damping},get angularDamping(){return t.damping},type:i===0?"kinematicPosition":"dynamic",get rigidBody(){return r[i]},set rigidBody(h){r[i]=h},children:(h,ut)=>{var Y=j(()=>[t.ballRadius]);it(h,{shape:"ball",get args(){return c(Y)},children:(x,lt)=>{var P=w(),F=R(P);_(F,()=>A.Object3D,(G,K)=>{K(G,{get ref(){return g[i]},set ref(M){g[i]=M}})}),b(x,P)},$$slots:{default:!0}})},$$slots:{default:!0}})},$$slots:{default:!0}})}),b(o,B)}),b(a,J),q()}export{pt as default};
