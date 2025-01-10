import{b as M,t as w}from"./disclose-version.CY5IDNoG.js";import{p as U,D as t,t as A,y,w as s,E as K,F as k,z as P}from"./runtime.XPaRurxh.js";import{s as q}from"./snippet.CMdN7rSJ.js";import{p as r,b as H,r as J}from"./props.Dz65N0hT.js";import{u as L,C as Q,i as R,G as W,j as X,k as Y,l as Z,T as a,m as c,n as $,I as ee,d as re,o as ne}from"./T.y93Wq12a.js";import{t as te}from"./BufferGeometryUtils.CUsBuKD9.js";import{r as oe}from"./revision.CVgzqIIa.js";const ie=`
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
`;var ae=w("<!> <!>",1),ce=w("<!> <!>",1);function _e(O,e){U(e,!0);let f=r(e,"color",3,"black"),d=r(e,"screenspace",3,!1),u=r(e,"opacity",3,1),N=r(e,"transparent",3,!1),m=r(e,"thickness",3,.05),S=r(e,"toneMapped",3,!0),b=r(e,"angle",19,()=>Math.PI),z=r(e,"polygonOffset",3,!1),I=r(e,"polygonOffsetFactor",3,0),F=r(e,"renderOrder",3,0),p=r(e,"ref",15),j=J(e,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:C}=L(),G={screenspace:{value:d()},color:{value:new Q(f())},opacity:{value:u()},thickness:{value:m()},size:{value:new R}},v=new W,n=new X({side:Y,uniforms:G,vertexShader:ie,fragmentShader:se}),V=Z();let o=ne(V),E=k(()=>{if(c(o.current,"Mesh"))return te(o.current.geometry,b())}),l=k(()=>{if(c(o.current,"Mesh")){if(c(o.current,"SkinnedMesh")){const i=new $;return i.bind(o.current.skeleton,o.current.bindMatrix),i}else if(c(o.current,"InstancedMesh")){const i=new ee(void 0,void 0,o.current.count);return i.instanceMatrix=o.current.instanceMatrix,i}return new re}});t(()=>{s(l)&&(s(l).renderOrder=F())}),t(()=>{n.transparent=N()}),t(()=>{n.toneMapped=S()}),t(()=>{n.polygonOffset=z()}),t(()=>{n.polygonOffsetFactor=I()}),t(()=>{n.uniforms.screenspace.value=d()}),t(()=>{n.uniforms.color.value.set(f())}),t(()=>{n.uniforms.opacity.value=u()}),t(()=>{n.uniforms.thickness.value=m()}),t(()=>{C.getDrawingBufferSize(n.uniforms.size.value)}),a(O,H({is:v},()=>j,{get ref(){return p()},set ref(i){p(i)},children:(i,le)=>{var g=ce(),h=y(g);a(h,{get is(){return s(l)},children:(B,fe)=>{var _=ae(),x=y(_);a(x,{get is(){return s(E)}});var D=P(x,2);a(D,{is:n}),M(B,_)},$$slots:{default:!0}});var T=P(h,2);q(T,()=>e.children??K,()=>({ref:v})),M(i,g)},$$slots:{default:!0}})),A()}export{_e as O};
