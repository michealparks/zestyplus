import"./disclose-version.Bg9kRutz.js";import{p as A,u as t,f as M,k as i,s as y,a2 as D,a as K,m as k}from"./index-client.DzQlphmH.js";import{a as P,t as O}from"./template.CgCchT00.js";import{i as q,C as H,j as J,G as L,k as Q,l as R,m as W,d as a,s as X,n as c,e as Y,I as Z,M as $,o as ee}from"./T.D9_Xg1XW.js";import{p as r,s as re,r as ne}from"./props.DHXOHPV0.js";import{t as te}from"./BufferGeometryUtils.CuTrPDsC.js";import{r as oe}from"./revision.DoaOiPN2.js";const se=`
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
}`,ie=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <${oe>=154?"colorspace_fragment":"encodings_fragment"}>
}
`;var ae=O("<!> <!>",1),ce=O("<!> <!>",1);function _e(w,e){A(e,!0);let f=r(e,"color",3,"black"),d=r(e,"screenspace",3,!1),u=r(e,"opacity",3,1),N=r(e,"transparent",3,!1),m=r(e,"thickness",3,.05),S=r(e,"toneMapped",3,!0),I=r(e,"angle",19,()=>Math.PI),b=r(e,"polygonOffset",3,!1),z=r(e,"polygonOffsetFactor",3,0),j=r(e,"renderOrder",3,0),p=r(e,"ref",15),C=ne(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:F}=q(),G={screenspace:{value:d()},color:{value:new H(f())},opacity:{value:u()},thickness:{value:m()},size:{value:new J}},v=new L,n=new Q({side:R,uniforms:G,vertexShader:se,fragmentShader:ie}),V=W();let o=ee(V),T=k(()=>{if(c(o.current,"Mesh"))return te(o.current.geometry,I())}),l=k(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const s=new Y;return s.bind(o.current.skeleton,o.current.bindMatrix),s}else if(c(o.current,"InstancedMesh")){const s=new Z(void 0,void 0,o.current.count);return s.instanceMatrix=o.current.instanceMatrix,s}return new $}});t(()=>{i(l)&&(i(l).renderOrder=j())}),t(()=>{n.transparent=N()}),t(()=>{n.toneMapped=S()}),t(()=>{n.polygonOffset=b()}),t(()=>{n.polygonOffsetFactor=z()}),t(()=>{n.uniforms.screenspace.value=d()}),t(()=>{n.uniforms.color.value.set(f())}),t(()=>{n.uniforms.opacity.value=u()}),t(()=>{n.uniforms.thickness.value=m()}),t(()=>{F.getDrawingBufferSize(n.uniforms.size.value)}),a(w,re({is:v},()=>C,{get ref(){return p()},set ref(s){p(s)},children:(s,le)=>{var g=ce(),h=M(g);a(h,{get is(){return i(l)},children:(E,fe)=>{var _=ae(),x=M(_);a(x,{get is(){return i(T)}});var U=y(x,2);a(U,{is:n}),P(E,_)},$$slots:{default:!0}});var B=y(h,2);X(B,()=>e.children??D,()=>({ref:v})),P(s,g)},$$slots:{default:!0}})),K()}export{_e as O};
