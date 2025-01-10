import{b as M,t as O}from"./disclose-version.DFxnx1AN.js";import{B as U,Q as t,D as A,a8 as y,T as s,n as K,W as k,a9 as P}from"./runtime.BxeNZxLl.js";import{s as Q}from"./snippet.AXKrw6tU.js";import{p as r,s as W,r as q}from"./props.CvCzEa8T.js";import{C as H,g as J,G as L,h as R,i as X,c as Y,I as Z,M as $}from"./three.module.iKKkBh6O.js";import{a as ee,b as re,T as a,i as c,f as ne}from"./T.BojAtv_L.js";import{t as te}from"./BufferGeometryUtils.DABDTHp8.js";import{r as oe}from"./revision.CWH-tMVC.js";const ie=`
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
}`,se=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <${oe>=154?"colorspace_fragment":"encodings_fragment"}>
}
`;var ae=O("<!> <!>",1),ce=O("<!> <!>",1);function xe(w,e){U(e,!0);let f=r(e,"color",3,"black"),d=r(e,"screenspace",3,!1),u=r(e,"opacity",3,1),N=r(e,"transparent",3,!1),m=r(e,"thickness",3,.05),S=r(e,"toneMapped",3,!0),b=r(e,"angle",19,()=>Math.PI),I=r(e,"polygonOffset",3,!1),z=r(e,"polygonOffsetFactor",3,0),C=r(e,"renderOrder",3,0),p=r(e,"ref",15),F=q(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:j}=ee(),G={screenspace:{value:d()},color:{value:new H(f())},opacity:{value:u()},thickness:{value:m()},size:{value:new J}},v=new L,n=new R({side:X,uniforms:G,vertexShader:ie,fragmentShader:se}),T=re();let o=ne(T),V=k(()=>{if(c(o.current,"Mesh"))return te(o.current.geometry,b())}),l=k(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const i=new Y;return i.bind(o.current.skeleton,o.current.bindMatrix),i}else if(c(o.current,"InstancedMesh")){const i=new Z(void 0,void 0,o.current.count);return i.instanceMatrix=o.current.instanceMatrix,i}return new $}});t(()=>{s(l)&&(s(l).renderOrder=C())}),t(()=>{n.transparent=N()}),t(()=>{n.toneMapped=S()}),t(()=>{n.polygonOffset=I()}),t(()=>{n.polygonOffsetFactor=z()}),t(()=>{n.uniforms.screenspace.value=d()}),t(()=>{n.uniforms.color.value.set(f())}),t(()=>{n.uniforms.opacity.value=u()}),t(()=>{n.uniforms.thickness.value=m()}),t(()=>{j.getDrawingBufferSize(n.uniforms.size.value)}),a(w,W({is:v},()=>F,{get ref(){return p()},set ref(i){p(i)},children:(i,le)=>{var g=ce(),h=y(g);a(h,{get is(){return s(l)},children:(D,fe)=>{var _=ae(),x=y(_);a(x,{get is(){return s(V)}});var E=P(x,2);a(E,{is:n}),M(D,_)},$$slots:{default:!0}});var B=P(h,2);Q(B,()=>e.children??K,()=>({ref:v})),M(i,g)},$$slots:{default:!0}})),A()}export{xe as O};
