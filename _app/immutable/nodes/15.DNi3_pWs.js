import{c as V,b as Z,t as G}from"../chunks/disclose-version.CY5IDNoG.js";import{p as F,D as B,y as Y,E as I,t as P,w as D,F as L,z as M}from"../chunks/runtime.XPaRurxh.js";import{e as H,i as J}from"../chunks/each.BoW94gwA.js";import{c as K}from"../chunks/svelte-component.De3lsk1i.js";import{p as f,b as U,s as N,r as j,a as Q,c as $}from"../chunks/props.Dz65N0hT.js";import{u as k,B as _,D as ee,T,C as S,i as te,j as ae,c as se,V as C,d as re,a as q}from"../chunks/T.y93Wq12a.js";import{v as oe}from"../chunks/index.Cv2FY5Xh.js";import{O as ne}from"../chunks/OrbitControls.gSqUzVJP.js";import"../chunks/legacy.PQa5ncrZ.js";import{u as ie}from"../chunks/auth.svelte.CNkesG8U.js";import{s as E}from"../chunks/snippet.CMdN7rSJ.js";import{r as le}from"../chunks/revision.CVgzqIIa.js";function fe(X,e){F(e,!0);let w=f(e,"points",19,()=>[]),b=f(e,"shape",3,"none"),n=f(e,"shapeFunction",7,()=>1),x=f(e,"ref",15),a=w().length;const{invalidate:y}=k(),v=new _(new Float32Array(a*6),3),u=new _(new Float32Array(a*6),3),l=new _(new Float32Array(a*6),3),A=new _(new Float32Array(a*2),1),h=new _(new Float32Array(a*2),1),t=new _(new Float32Array(a*2),1),m=new _(new Float32Array(a*4),2),g=new _(new Uint16Array(a*6),1);b()==="taper"&&n(s=>1*Math.pow(4*s*(1-s),1));for(let s=0,c=0,d=0,o=0;s<a;s+=1,c+=2,d+=4,o+=6){A.setX(c,s/w().length),A.setX(c+1,s/w().length),h.setX(c,1),h.setX(c+1,-1);const O=b()==="none"?1:n()(s/(a-1));if(t.setX(c,O),t.setX(c+1,O),m.setXYZW(c,s/(a-1),0,s/(a-1),1),s<a-1){const p=s*2;g.setX(o+0,p+0),g.setX(o+1,p+1),g.setX(o+2,p+2),g.setX(o+3,p+2),g.setX(o+4,p+1),g.setX(o+5,p+3)}}const r=new ee;r.setAttribute("position",v),r.setAttribute("previous",u),r.setAttribute("next",l),r.setAttribute("counters",A),r.setAttribute("side",h),r.setAttribute("width",t),r.setAttribute("uv",m),r.setIndex(g);const z=s=>{if(s.length===0||s.length!==a)return;let c=0,d=0,o=0;const O=s[0];u.setXYZ(d,O.x,O.y,O.z),d+=1,u.setXYZ(d,O.x,O.y,O.z),d+=1;for(let R=0;R<a;R++){const i=s[R];v.setXYZ(c,i.x,i.y,i.z),c+=1,v.setXYZ(c,i.x,i.y,i.z),c+=1,R<a-1&&(u.setXYZ(d,i.x,i.y,i.z),d+=1,u.setXYZ(d,i.x,i.y,i.z),d+=1),R>0&&R+1<=a&&(l.setXYZ(o,i.x,i.y,i.z),o+=1,l.setXYZ(o,i.x,i.y,i.z),o+=1)}const p=s[a-1];l.setXYZ(o,p.x,p.y,p.z),o+=1,l.setXYZ(o,p.x,p.y,p.z),o+=1,v.needsUpdate=!0,u.needsUpdate=!0,l.needsUpdate=!0,r.computeBoundingSphere(),y()};B(()=>z(w())),T(X,U({is:r},()=>e.props,{get ref(){return x()},set ref(s){x(s)},children:(s,c)=>{var d=V(),o=Y(d);E(o,()=>e.children??I,()=>({ref:r})),Z(s,d)},$$slots:{default:!0}})),P()}const ue=`
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>

uniform float useDash;
uniform float dashArray;
uniform float dashOffset;
uniform float dashRatio;
uniform sampler2D alphaMap;
uniform float useAlphaMap;

varying vec2 vUV;
varying vec4 vColor;
varying float vCounters;

vec4 CustomLinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

void main()	{
	#include <logdepthbuf_fragment>
	#include <${le<154?"encodings_fragment":"colorspace_fragment"}>

	vec4 c = vColor;

	if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV ).r;

	if( useDash == 1. ){
			c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
	}

	gl_FragColor = CustomLinearTosRGB(c);
}
`;function he(X,e){F(e,!0);const w=N(),b=()=>Q(g,"$size",w);let n=f(e,"opacity",3,1),x=f(e,"color",3,"#ffffff"),a=f(e,"dashOffset",3,0),y=f(e,"dashArray",3,0),v=f(e,"dashRatio",3,0),u=f(e,"attenuate",3,!0),l=f(e,"width",3,1),A=f(e,"scaleDown",3,0),h=f(e,"ref",15),t=j(e,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:m,size:g}=k();const r={lineWidth:{value:l()},color:{value:new S(x())},opacity:{value:n()},resolution:{value:new te(1,1)},sizeAttenuation:{value:u()?1:0},dashArray:{value:y()},dashOffset:{value:a()},dashRatio:{value:v()},useDash:{value:y()>0?1:0},scaleDown:{value:A()/10},alphaTest:{value:0},alphaMap:{value:e.alphaMap},useAlphaMap:{value:e.alphaMap?1:0}},z=new ae({uniforms:r});B(()=>{r.resolution.value.set(b().width,b().height),m()}),B(()=>{r.dashRatio.value=v(),r.dashArray.value=y(),r.dashOffset.value=a(),r.lineWidth.value=l(),r.opacity.value=n(),r.color.value.set(x()),m()}),T(X,U({is:z,fragmentShader:ue,vertexShader:oe},()=>t,{get ref(){return h()},set ref(s){h(s)},children:(s,c)=>{var d=V(),o=Y(d);E(o,()=>e.children??I,()=>({ref:z})),Z(s,d)},$$slots:{default:!0}})),P()}const de=new se([new C(-3,0,0),new C(-1,1,-1),new C(1,-1,1),new C(3,0,0)]),ce=de.getPoints(100),ve=new S("#fe3d00"),me=new S("#9800fe");var pe=G("<!> <!>",1);function W(X,e){F(e,!0);let w=f(e,"baseWidth",3,.3),b=f(e,"baseDashOffset",3,0),n=f(e,"opacity",3,1),x=f(e,"dashRatio",3,.8),a=j(e,["$$slots","$$events","$$legacy","baseWidth","baseDashOffset","opacity","dashRatio","dashOffset"]),y=L(()=>e.dashOffset??b());const v=new re;q(u=>{const{uniforms:l}=v.material;e.dashOffset||(l.dashOffset.value+=u/2),l.color.value.lerpColors(ve,me,Math.sin(u*8)+.5),l.lineWidth.value=Math.max(Math.sin(D(y)*2)/5+w(),.01)}),T(X,U({is:v,"position.y":3,scale:2},()=>a,{children:(u,l)=>{var A=pe(),h=Y(A);fe(h,{points:ce});var t=M(h,2);he(t,{width:.5,dashArray:1.1,get dashRatio(){return x()},get dashOffset(){return D(y)},transparent:!0,get opacity(){return n()},depthTest:!1}),Z(u,A)},$$slots:{default:!0}})),P()}var ge=G("<!> <!> <!> <!> <!>",1);function Ce(X,e){F(e,!0);const{frequencyData:w}=ie(),b=10,n=$(Array.from({length:b}).map(()=>({on:!1,dashOffset:0}))),x=Array.from({length:b}).map((h,t)=>({x:(t-3)*.4,baseWidth:(t+1)*.001-.005*t,dashRatio:.7+t*.1}));q(h=>{for(let t=0,m=10;t<n.length;t+=1,m+=15)n[t].on===!1&&w.current[m]>120&&(n[t].on=!0,n[t].dashOffset=-.1),n[t].on&&n[t].dashOffset>1.2&&(n[t].on=!1),n[t].dashOffset+=h/2});var a=ge(),y=Y(a);K(y,()=>T.PerspectiveCamera,(h,t)=>{t(h,{makeDefault:!0,children:(m,g)=>{ne(m,{autoRotate:!0,autoRotateSpeed:2,enablePan:!1,enableRotate:!1,enableZoom:!1,"target.y":2})},$$slots:{default:!0}})});var v=M(y,2);H(v,17,()=>x,J,(h,t,m)=>{var g=L(()=>n[m].on?1:0);W(h,{get"position.x"(){return D(t).x},get baseWidth(){return D(t).baseWidth},get opacity(){return D(g)},get dashOffset(){return n[m].dashOffset},get dashRatio(){return D(t).dashRatio}})});var u=M(v,2);W(u,{"position.x":-1,baseWidth:.01,baseDashOffset:.2});var l=M(u,2);W(l,{"position.x":-1.5,baseWidth:.005,baseDashOffset:.3});var A=M(l,2);W(A,{"position.x":1.5,baseWidth:.005,baseDashOffset:.4}),Z(X,a),P()}export{Ce as component};
