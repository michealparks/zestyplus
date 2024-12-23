import{a as C,t as E}from"./disclose-version.CSeAfAtk.js";import{p as K,B as l,f as G,g as z,s as T,n as X,a as Y,h as D}from"./runtime.BqyLU49m.js";import{V as d,f as Z,u as q,C as H,g as J,G as L,S as Q,h as R,i as W,T as A,s as $,j as S,k as ee,I as te,l as re,m as ne}from"./analyser.WfzEoADr.js";import{p as a,b as oe,r as se}from"./props.Dc-ArEpk.js";import{r as ie}from"./revision.sOtUiwzv.js";function ae(M,t=Math.PI/3){const w=Math.cos(t),g=(1+1e-10)*100,s=[new d,new d,new d],x=new d,p=new d,k=new d,u=new d;function N(o){const m=~~(o.x*g),e=~~(o.y*g),v=~~(o.z*g);return`${m},${e},${v}`}const y=M.index?M.toNonIndexed():M,i=y.attributes.position,h={};for(let o=0,m=i.count/3;o<m;o++){const e=3*o,v=s[0].fromBufferAttribute(i,e+0),r=s[1].fromBufferAttribute(i,e+1),b=s[2].fromBufferAttribute(i,e+2);x.subVectors(b,r),p.subVectors(v,r);const c=new d().crossVectors(x,p).normalize();for(let n=0;n<3;n++){const O=s[n],f=N(O);f in h||(h[f]=[]),h[f].push(c)}}const I=new Float32Array(i.count*3),P=new Z(I,3,!1);for(let o=0,m=i.count/3;o<m;o++){const e=3*o,v=s[0].fromBufferAttribute(i,e+0),r=s[1].fromBufferAttribute(i,e+1),b=s[2].fromBufferAttribute(i,e+2);x.subVectors(b,r),p.subVectors(v,r),k.crossVectors(x,p).normalize();for(let c=0;c<3;c++){const n=s[c],O=N(n),f=h[O];u.set(0,0,0);for(let _=0,B=f.length;_<B;_++){const V=f[_];k.dot(V)>w&&u.add(V)}u.normalize(),P.setXYZ(e+c,u.x,u.y,u.z)}}return y.setAttribute("normal",P),y}const ce=`
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
}`,le=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <${ie>=154?"colorspace_fragment":"encodings_fragment"}>
}
`;var fe=E("<!> <!>",1),ue=E("<!> <!>",1);function xe(M,t){K(t,!0);let w=a(t,"color",3,"black"),g=a(t,"screenspace",3,!1),s=a(t,"opacity",3,1),x=a(t,"transparent",3,!1),p=a(t,"thickness",3,.05),k=a(t,"toneMapped",3,!0),u=a(t,"angle",19,()=>Math.PI),N=a(t,"polygonOffset",3,!1),y=a(t,"polygonOffsetFactor",3,0),i=a(t,"renderOrder",3,0),h=a(t,"ref",15),I=se(t,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:P}=q(),o={screenspace:{value:g()},color:{value:new H(w())},opacity:{value:s()},thickness:{value:p()},size:{value:new J}},m=new L,e=new Q({side:R,uniforms:o,vertexShader:ce,fragmentShader:le}),v=W();let r=ne(v),b=D(()=>{if(S(r.current,"Mesh"))return ae(r.current.geometry,u())}),c=D(()=>{if(S(r.current,"Mesh")){if(S(r.current,"SkinnedMesh")){const n=new ee;return n.bind(r.current.skeleton,r.current.bindMatrix),n}else if(S(r.current,"InstancedMesh")){const n=new te(void 0,void 0,r.current.count);return n.instanceMatrix=r.current.instanceMatrix,n}return new re}});l(()=>{z(c)&&(z(c).renderOrder=i())}),l(()=>{e.transparent=x()}),l(()=>{e.toneMapped=k()}),l(()=>{e.polygonOffset=N()}),l(()=>{e.polygonOffsetFactor=y()}),l(()=>{e.uniforms.screenspace.value=g()}),l(()=>{e.uniforms.color.value.set(w())}),l(()=>{e.uniforms.opacity.value=s()}),l(()=>{e.uniforms.thickness.value=p()}),l(()=>{P.getDrawingBufferSize(e.uniforms.size.value)}),A(M,oe({is:m},()=>I,{get ref(){return h()},set ref(n){h(n)},children:(n,O)=>{var f=ue(),_=G(f);A(_,{get is(){return z(c)},children:(V,me)=>{var F=fe(),j=G(F);A(j,{get is(){return z(b)}});var U=T(j,2);A(U,{is:e}),C(V,F)},$$slots:{default:!0}});var B=T(_,2);$(B,()=>t.children??X,()=>({ref:m})),C(n,f)},$$slots:{default:!0}})),Y()}export{xe as O};
