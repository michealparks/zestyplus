import{b as M,t as w}from"./disclose-version.DxMWfzFv.js";import{w as A,N as t,y as D,a6 as y,Q as s,n as K,T as k,a7 as P}from"./runtime.TNfRlsGO.js";import{s as Q}from"./snippet.BIPltzSI.js";import{p as r,s as q,r as H}from"./props.J8c_Vd-h.js";import{C as J,g as L,G as R,h as W,i as X,c as Y,I as Z,M as $}from"./three.module.iKKkBh6O.js";import{a as ee,b as re,T as a,i as c,f as ne}from"./T.5NVhIH70.js";import{t as te}from"./BufferGeometryUtils.DABDTHp8.js";import{r as oe}from"./revision.CWH-tMVC.js";const ie=`
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
`;var ae=w("<!> <!>",1),ce=w("<!> <!>",1);function xe(N,e){A(e,!0);let f=r(e,"color",3,"black"),d=r(e,"screenspace",3,!1),u=r(e,"opacity",3,1),O=r(e,"transparent",3,!1),m=r(e,"thickness",3,.05),S=r(e,"toneMapped",3,!0),b=r(e,"angle",19,()=>Math.PI),I=r(e,"polygonOffset",3,!1),z=r(e,"polygonOffsetFactor",3,0),C=r(e,"renderOrder",3,0),p=r(e,"ref",15),F=H(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:j}=ee(),G={screenspace:{value:d()},color:{value:new J(f())},opacity:{value:u()},thickness:{value:m()},size:{value:new L}},v=new R,n=new W({side:X,uniforms:G,vertexShader:ie,fragmentShader:se}),T=re();let o=ne(T),V=k(()=>{if(c(o.current,"Mesh"))return te(o.current.geometry,b())}),l=k(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const i=new Y;return i.bind(o.current.skeleton,o.current.bindMatrix),i}else if(c(o.current,"InstancedMesh")){const i=new Z(void 0,void 0,o.current.count);return i.instanceMatrix=o.current.instanceMatrix,i}return new $}});t(()=>{s(l)&&(s(l).renderOrder=C())}),t(()=>{n.transparent=O()}),t(()=>{n.toneMapped=S()}),t(()=>{n.polygonOffset=I()}),t(()=>{n.polygonOffsetFactor=z()}),t(()=>{n.uniforms.screenspace.value=d()}),t(()=>{n.uniforms.color.value.set(f())}),t(()=>{n.uniforms.opacity.value=u()}),t(()=>{n.uniforms.thickness.value=m()}),t(()=>{j.getDrawingBufferSize(n.uniforms.size.value)}),a(N,q({is:v},()=>F,{get ref(){return p()},set ref(i){p(i)},children:(i,le)=>{var g=ce(),h=y(g);a(h,{get is(){return s(l)},children:(E,fe)=>{var _=ae(),x=y(_);a(x,{get is(){return s(V)}});var U=P(x,2);a(U,{is:n}),M(E,_)},$$slots:{default:!0}});var B=P(h,2);Q(B,()=>e.children??K,()=>({ref:v})),M(i,g)},$$slots:{default:!0}})),D()}export{xe as O};
