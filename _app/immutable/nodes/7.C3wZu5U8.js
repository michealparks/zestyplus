import{b as G,t as V}from"../chunks/disclose-version.CY5IDNoG.js";import{p as H,D as b,t as Q,y as I,E,z as m,G as W}from"../chunks/runtime.XPaRurxh.js";import{c as k}from"../chunks/svelte-component.De3lsk1i.js";import{A as J,V as T,C as R,B as x,a as Y,j as K,D as N,T as f,z as O,F as $,u as tt,I as et,H as ot,M as rt,Q as at}from"../chunks/T.y93Wq12a.js";import{u as nt}from"../chunks/auth.svelte.CNkesG8U.js";import{h as q}from"../chunks/color.D7bleQK4.js";import{f as st}from"../chunks/index.Cv2FY5Xh.js";import{R as it}from"../chunks/RoundedBoxGeometry.JTV2sq84.js";import"../chunks/legacy.PQa5ncrZ.js";import{s as ct}from"../chunks/snippet.CMdN7rSJ.js";import{p as c,b as lt,r as dt}from"../chunks/props.Dz65N0hT.js";import{L as ut}from"../chunks/Lightformer.Cq_qJzHd.js";const mt=`uniform float time;
attribute float size;
varying vec3 vColor;
void main() {
	vColor = color;
	vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
	gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
	gl_Position = projectionMatrix * mvPosition;
}`;var ft=V("<!> <!> <!>",1);function pt(D,r){H(r,!0);let a=c(r,"count",3,5e3),L=c(r,"radius",3,50),p=c(r,"depth",3,50),e=c(r,"factor",3,6),l=c(r,"saturation",3,1),w=c(r,"lightness",3,.8),h=c(r,"speed",3,1),d=c(r,"fade",3,!0),U=c(r,"opacity",3,1),z=c(r,"ref",15),P=dt(r,["$$slots","$$events","$$legacy","count","radius","depth","factor","saturation","lightness","speed","fade","opacity","ref","children"]);const C=new J,g=new T,y=new O,v=new R,F=s=>g.setFromSpherical(y.set(s,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI));let M=new x(new Float32Array(a()*3),3),_=new x(new Float32Array(a()*3),3),A=new x(new Float32Array(a()),1);b(()=>{M=new x(new Float32Array(a()*3),3),_=new x(new Float32Array(a()*3),3),A=new x(new Float32Array(a()),1)}),b(()=>{const s=p()/a();let S=L()+p();for(let i=0;i<a();i+=1){S-=s*Math.random();const u=F(S);M.setXYZ(i,u.x,u.y,u.z),v.setHSL(i/a(),l(),w()),_.setXYZ(i,v.r,v.g,v.b),A.setX(i,(.5+.5*Math.random())*e())}});const{stop:B,start:j}=Y(s=>{t.time.value+=s*h()},{autoStart:!1});b(()=>h()===0?B():j());const t={time:{value:0},fade:{value:1},opacity:{value:1}},o=new K({uniforms:t,vertexShader:mt,fragmentShader:st});b(()=>{t.fade.value=d()?1:0}),b(()=>{t.opacity.value=U()});const n=new N;n.setAttribute("position",M),n.setAttribute("color",_),n.setAttribute("size",A),f(D,lt({is:C},()=>P,{get ref(){return z()},set ref(s){z(s)},children:(s,S)=>{var i=ft(),u=I(i);f(u,{is:n});var X=m(u,2);f(X,{is:o,blending:$,depthWrite:!1,transparent:!0,vertexColors:!0});var Z=m(X,2);ct(Z,()=>r.children??E,()=>({ref:C})),G(s,i)},$$slots:{default:!0}})),Q()}var ht=V("<!> <!>",1),vt=V("<!> <!> <!> <!> <!> <!>",1);function Ft(D,r){H(r,!0);const{camera:a,scene:L}=tt(),p=1e3,e=new et(void 0,void 0,p);e.name="cubes",e.frustumCulled=!1,e.castShadow=e.receiveShadow=!0;const l=new T,w=new at,h=new T(1,1,1),d=new rt,{frequencyData:U}=nt();let z=p-1;const P="#C84C09",C=new R(P);W(()=>{for(let t=0;t<p;t+=1){const o=(Math.random()-.5)*5,n=o>0?2:-2,s=(Math.random()-.5)*10;l.set(o*2+n,s,-t/2),w.random(),d.compose(l,w,h),e.setMatrixAt(t,d),e.setColorAt(t,q(C,0))}e.instanceColor&&(e.instanceColor.needsUpdate=!0),e.instanceMatrix.needsUpdate=!0});const g=new ot;L.add(g.target);let y;Y(t=>{a.current.position.z-=t*20,y&&(y.position.z=a.current.position.z,g.position.z=a.current.position.z+2,g.target.position.copy(a.current.position));for(let o=0;o<p;o+=1){e.getMatrixAt(o,d),d.decompose(l,w,h);const n=U.current[o%32];h.setScalar(Math.max(n/100,.5)),e.setColorAt(o,q(C.set(P),n/1e3)),l.z>a.current.position.z&&(l.z=-z/2,z+=1),d.compose(l,w,h),e.setMatrixAt(o,d)}e.instanceColor&&(e.instanceColor.needsUpdate=!0),e.instanceMatrix.needsUpdate=!0});var v=vt(),F=I(v);k(F,()=>f.PerspectiveCamera,(t,o)=>{o(t,{makeDefault:!0,position:[0,.5,5],oncreate:n=>n.lookAt(0,0,.1)})});var M=m(F,2);f(M,{is:g,castShadow:!0,"position.x":2,"position.y":2,intensity:.5});var _=m(M,2);k(_,()=>f.AmbientLight,(t,o)=>{o(t,{intensity:.5})});var A=m(_,2);f(A,{is:e,children:(t,o)=>{var n=ht(),s=I(n);it(s,{});var S=m(s,2);k(S,()=>f.MeshStandardMaterial,(i,u)=>{u(i,{roughness:.05})}),G(t,n)},$$slots:{default:!0}});var B=m(A,2);ut(B,{});var j=m(B,2);pt(j,{get ref(){return y},set ref(t){y=t}}),G(D,v),Q()}export{Ft as component};
