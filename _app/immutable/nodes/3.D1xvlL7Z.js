import{a as B,t as T,c as Q}from"../chunks/disclose-version.B1qbiK4R.js";import{p as K,A as x,f as G,g,s as k,n as R,a as X,I as $}from"../chunks/runtime.BAh1p-zl.js";import{V as N,B as W,u as Y,C as Z,d as ee,G as te,S as re,f as oe,g as ne,T as u,s as se,h as E,j as ae,I as ie,k as ce,l as le,a as fe,e as ue,i as de,b as me}from"../chunks/analyser.DHwu5Qc2.js";import{c as b}from"../chunks/svelte-component.Dcv2Zt4P.js";import{p as pe}from"../chunks/proxy.DG7b0xtK.js";import{p as v,s as he,r as ve,a as ge,b as _e}from"../chunks/props.ZvotMI7v.js";import{h as xe}from"../chunks/index.DuO44EwD.js";import"../chunks/legacy.DkHaiiTp.js";import{r as we}from"../chunks/revision.BFk_ck0_.js";import"../chunks/auth.svelte.B99zoz8J.js";function Me(A,n=Math.PI/3){const I=Math.cos(n),z=(1+1e-10)*100,c=[new N,new N,new N],w=new N,m=new N,P=new N,p=new N;function S(s){const h=~~(s.x*z),r=~~(s.y*z),t=~~(s.z*z);return`${h},${r},${t}`}const O=A.index?A.toNonIndexed():A,a=O.attributes.position,_={};for(let s=0,h=a.count/3;s<h;s++){const r=3*s,t=c[0].fromBufferAttribute(a,r+0),e=c[1].fromBufferAttribute(a,r+1),l=c[2].fromBufferAttribute(a,r+2);w.subVectors(l,e),m.subVectors(t,e);const i=new N().crossVectors(w,m).normalize();for(let o=0;o<3;o++){const M=c[o],f=S(M);f in _||(_[f]=[]),_[f].push(i)}}const j=new Float32Array(a.count*3),V=new W(j,3,!1);for(let s=0,h=a.count/3;s<h;s++){const r=3*s,t=c[0].fromBufferAttribute(a,r+0),e=c[1].fromBufferAttribute(a,r+1),l=c[2].fromBufferAttribute(a,r+2);w.subVectors(l,e),m.subVectors(t,e),P.crossVectors(w,m).normalize();for(let i=0;i<3;i++){const o=c[i],M=S(o),f=_[M];p.set(0,0,0);for(let d=0,y=f.length;d<y;d++){const C=f[d];P.dot(C)>I&&p.add(C)}p.normalize(),V.setXYZ(r+i,p.x,p.y,p.z)}}return O.setAttribute("normal",V),O}const ye=`
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
}`,be=`
uniform vec3 color;
uniform float opacity;
void main(){
  gl_FragColor = vec4(color, opacity);
  #include <tonemapping_fragment>
  #include <${we>=154?"colorspace_fragment":"encodings_fragment"}>
}
`;var ke=T("<!> <!>",1),ze=T("<!> <!>",1);function Pe(A,n){K(n,!0);let I=v(n,"color",3,"black"),z=v(n,"screenspace",3,!1),c=v(n,"opacity",3,1),w=v(n,"transparent",3,!1),m=v(n,"thickness",3,.05),P=v(n,"toneMapped",3,!0),p=v(n,"angle",19,()=>Math.PI),S=v(n,"polygonOffset",3,!1),O=v(n,"polygonOffsetFactor",3,0),a=v(n,"renderOrder",3,0),_=v(n,"ref",15),j=ve(n,["$$slots","$$events","$$legacy","color","screenspace","opacity","transparent","thickness","toneMapped","angle","polygonOffset","polygonOffsetFactor","renderOrder","children","ref"]);const{renderer:V}=Y(),s={screenspace:{value:z()},color:{value:new Z(I())},opacity:{value:c()},thickness:{value:m()},size:{value:new ee}},h=new te,r=new re({side:oe,uniforms:s,vertexShader:ye,fragmentShader:be}),t=ne();let e=le(t),l=$(()=>{if(E(e.current,"Mesh"))return Me(e.current.geometry,p())}),i=$(()=>{if(E(e.current,"Mesh")){if(E(e.current,"SkinnedMesh")){const o=new ae;return o.bind(e.current.skeleton,e.current.bindMatrix),o}else if(E(e.current,"InstancedMesh")){const o=new ie(void 0,void 0,e.current.count);return o.instanceMatrix=e.current.instanceMatrix,o}return new ce}});x(()=>{g(i)&&(g(i).renderOrder=a())}),x(()=>{r.transparent=w()}),x(()=>{r.toneMapped=P()}),x(()=>{r.polygonOffset=S()}),x(()=>{r.polygonOffsetFactor=O()}),x(()=>{r.uniforms.screenspace.value=z()}),x(()=>{r.uniforms.color.value.set(I())}),x(()=>{r.uniforms.opacity.value=c()}),x(()=>{r.uniforms.thickness.value=m()}),x(()=>{V.getDrawingBufferSize(r.uniforms.size.value)}),u(A,he({is:h},()=>j,{get ref(){return _()},set ref(o){_(o)},children:(o,M)=>{var f=ze(),d=G(f);u(d,{get is(){return g(i)},children:(C,L)=>{var F=ke(),D=G(F);u(D,{get is(){return g(l)}});var U=k(D,2);u(U,{is:r}),B(C,F)},$$slots:{default:!0}});var y=k(d,2);se(y,()=>n.children??R,()=>({ref:h})),B(o,f)},$$slots:{default:!0}})),X()}var Se=T("<!> <!>",1),Ne=T("<!> <!> <!>",1),Ae=T("<!> <!> <!> <!> <!>",1);function Te(A,n){K(n,!0);const I=ge(),z=()=>_e(c,"$size",I),{size:c}=Y(),{frequencyData:w}=me(),m=16,P=1,p=m*P/2,S=pe([]);for(let t=0;t<m;t++)for(let e=0;e<m;e++)S.push([t*P-p,e*P-p,0]);fe(()=>{for(let t=0,e=w.current.length/2;t<e;t+=1){let l=w.current[t];S[t][2]=l/75}});const O=new Z("red");var a=Ae(),_=G(a),j=$(()=>z().width/40);b(_,()=>u.OrthographicCamera,(t,e)=>{e(t,{makeDefault:!0,position:[-28,60,65],get zoom(){return g(j)},oncreate:l=>l.lookAt(0,0,0)})});var V=k(_,2);b(V,()=>u.AmbientLight,(t,e)=>{e(t,{intensity:.5})});var s=k(V,2);b(s,()=>u.DirectionalLight,(t,e)=>{e(t,{castShadow:!0,"shadow.camera.left":-15,"shadow.camera.right":15,"shadow.camera.top":15,"shadow.camera.bottom":-15,"shadow.mapSize.width":2048,"shadow.mapSize.height":2048,intensity:3,position:[10,10,10]})});var h=k(s,2);b(h,()=>u.Mesh,(t,e)=>{e(t,{"rotation.x":-Math.PI/2,"position.y":-.02,receiveShadow:!0,children:(l,i)=>{var o=Se(),M=G(o);b(M,()=>u.PlaneGeometry,(d,y)=>{y(d,{args:[50,50]})});var f=k(M,2);b(f,()=>u.MeshStandardMaterial,(d,y)=>{y(d,{color:"white"})}),B(l,o)},$$slots:{default:!0}})});var r=k(h,2);ue(r,17,()=>S,de,(t,e,l)=>{var i=Q(),o=G(i),M=$(()=>g(e)[2]*4+1);b(o,()=>u.Mesh,(f,d)=>{d(f,{get"position.x"(){return g(e)[0]},get"position.z"(){return g(e)[1]},get"position.y"(){return g(e)[2]},get"scale.y"(){return g(M)},castShadow:!0,receiveShadow:!0,children:(y,C)=>{var L=Ne(),F=G(L);b(F,()=>u.BoxGeometry,(q,H)=>{H(q,{args:[.5,.5,.5]})});var D=k(F,2),U=$(()=>xe(O,l/1e4));b(D,()=>u.MeshStandardMaterial,(q,H)=>{H(q,{get color(){return g(U)}})});var J=k(D,2);Pe(J,{color:"black"}),B(y,L)},$$slots:{default:!0}})}),B(t,i)}),B(A,a),X()}export{Te as component};
