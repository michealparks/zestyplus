import{a as M,t as O}from"./disclose-version.dWtSGD-r.js";import{a0 as A,v as t,a1 as D,a2 as y,z as a,n as K,B as k,a3 as P}from"./runtime.liGrBqgh.js";import{s as q}from"./snippet.Di1p6p-W.js";import{a as r,s as H,r as J}from"./props.B9ZiqexT.js";import{C as L,g as Q,G as R,h as W,i as X,c as Y,I as Z,M as $}from"./three.module.iKKkBh6O.js";import{a as ee,b as re,T as s,i as c,f as ne}from"./T.Bd7S2fO2.js";import{t as te}from"./BufferGeometryUtils.DABDTHp8.js";import{r as oe}from"./revision.CWH-tMVC.js";const ie=`
#include <common>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

uniform float thickness;
uniform bool screenspace;
uniform vec2 size;

void main() {
  #if defined (USE_SKINNING)
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
  #endif
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  vec4 tNormal = vec4(normal, 0.0);
  vec4 tPosition = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    tNormal = instanceMatrix * tNormal;
    tPosition = instanceMatrix * tPosition;
  #endif
  if (!screenspace) {
    vec3 newPosition = tPosition.xyz + tNormal.xyz * thickness;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  } else {
    vec4 clipPosition = projectionMatrix * modelViewMatrix * tPosition;
    vec4 clipNormal = projectionMatrix * modelViewMatrix * tNormal;
    vec2 offset = normalize(clipNormal.xy) * thickness / size * clipPosition.w * 2.0;
    clipPosition.xy += offset;
    gl_Position = clipPosition;
  }
}`,ae=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <${oe>=154?"colorspace_fragment":"encodings_fragment"}>
}
`;var se=O("<!> <!>",1),ce=O("<!> <!>",1);function xe(w,e){A(e,!0);let f=r(e,"color",3,"black"),d=r(e,"screenspace",3,!1),u=r(e,"opacity",3,1),N=r(e,"transparent",3,!1),m=r(e,"thickness",3,.05),S=r(e,"toneMapped",3,!0),b=r(e,"angle",19,()=>Math.PI),z=r(e,"polygonOffset",3,!1),I=r(e,"polygonOffsetFactor",3,0),C=r(e,"renderOrder",3,0),p=r(e,"ref",15),F=J(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:j}=ee(),G={screenspace:{value:d()},color:{value:new L(f())},opacity:{value:u()},thickness:{value:m()},size:{value:new Q}},v=new R,n=new W({side:X,uniforms:G,vertexShader:ie,fragmentShader:ae}),V=re();let o=ne(V),B=k(()=>{if(c(o.current,"Mesh"))return te(o.current.geometry,b())}),l=k(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const i=new Y;return i.bind(o.current.skeleton,o.current.bindMatrix),i}else if(c(o.current,"InstancedMesh")){const i=new Z(void 0,void 0,o.current.count);return i.instanceMatrix=o.current.instanceMatrix,i}return new $}});t(()=>{a(l)&&(a(l).renderOrder=C())}),t(()=>{n.transparent=N()}),t(()=>{n.toneMapped=S()}),t(()=>{n.polygonOffset=z()}),t(()=>{n.polygonOffsetFactor=I()}),t(()=>{n.uniforms.screenspace.value=d()}),t(()=>{n.uniforms.color.value.set(f())}),t(()=>{n.uniforms.opacity.value=u()}),t(()=>{n.uniforms.thickness.value=m()}),t(()=>{j.getDrawingBufferSize(n.uniforms.size.value)}),s(w,H({is:v},()=>F,{get ref(){return p()},set ref(i){p(i)},children:(i,le)=>{var g=ce(),h=y(g);s(h,{get is(){return a(l)},children:(E,fe)=>{var _=se(),x=y(_);s(x,{get is(){return a(B)}});var U=P(x,2);s(U,{is:n}),M(E,_)},$$slots:{default:!0}});var T=P(h,2);q(T,()=>e.children??K,()=>({ref:v})),M(i,g)},$$slots:{default:!0}})),D()}export{xe as O};
