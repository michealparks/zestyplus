import{c as P,b as D,t as S}from"./disclose-version.n6tle2S8.js";import{B as Y,Q as C,a8 as Z,n as V,D as F,T as U,W as k,a9 as q}from"./runtime.D2gsQGmM.js";import{p as o,s as T,b as E,r as G,c as Q}from"./props.TOh5px3p.js";import{B as w,p as j,C as W,g as H,h as J,t as K,V as z,M as N}from"./three.module.iKKkBh6O.js";import{a as I,T as B,u as $}from"./T.CjKvhq6h.js";import{v as ee}from"./index.APQ6yQwS.js";import{s as L}from"./snippet.ZcDO5fuy.js";import{r as te}from"./revision.CWH-tMVC.js";import"./legacy.CeuyfEhk.js";function ae(M,e){Y(e,!0);let p=o(e,"points",19,()=>[]),A=o(e,"shape",3,"none"),b=o(e,"shapeFunction",7,()=>1),X=o(e,"ref",15),a=p().length;const{invalidate:y}=I(),c=new w(new Float32Array(a*6),3),f=new w(new Float32Array(a*6),3),u=new w(new Float32Array(a*6),3),g=new w(new Float32Array(a*2),1),d=new w(new Float32Array(a*2),1),x=new w(new Float32Array(a*2),1),O=new w(new Float32Array(a*4),2),v=new w(new Uint16Array(a*6),1);A()==="taper"&&b(t=>1*Math.pow(4*t*(1-t),1));for(let t=0,l=0,i=0,r=0;t<a;t+=1,l+=2,i+=4,r+=6){g.setX(l,t/p().length),g.setX(l+1,t/p().length),d.setX(l,1),d.setX(l+1,-1);const m=A()==="none"?1:b()(t/(a-1));if(x.setX(l,m),x.setX(l+1,m),O.setXYZW(l,t/(a-1),0,t/(a-1),1),t<a-1){const h=t*2;v.setX(r+0,h+0),v.setX(r+1,h+1),v.setX(r+2,h+2),v.setX(r+3,h+2),v.setX(r+4,h+1),v.setX(r+5,h+3)}}const s=new j;s.setAttribute("position",c),s.setAttribute("previous",f),s.setAttribute("next",u),s.setAttribute("counters",g),s.setAttribute("side",d),s.setAttribute("width",x),s.setAttribute("uv",O),s.setIndex(v);const R=t=>{if(t.length===0||t.length!==a)return;let l=0,i=0,r=0;const m=t[0];f.setXYZ(i,m.x,m.y,m.z),i+=1,f.setXYZ(i,m.x,m.y,m.z),i+=1;for(let _=0;_<a;_++){const n=t[_];c.setXYZ(l,n.x,n.y,n.z),l+=1,c.setXYZ(l,n.x,n.y,n.z),l+=1,_<a-1&&(f.setXYZ(i,n.x,n.y,n.z),i+=1,f.setXYZ(i,n.x,n.y,n.z),i+=1),_>0&&_+1<=a&&(u.setXYZ(r,n.x,n.y,n.z),r+=1,u.setXYZ(r,n.x,n.y,n.z),r+=1)}const h=t[a-1];u.setXYZ(r,h.x,h.y,h.z),r+=1,u.setXYZ(r,h.x,h.y,h.z),r+=1,c.needsUpdate=!0,f.needsUpdate=!0,u.needsUpdate=!0,s.computeBoundingSphere(),y()};C(()=>R(p())),B(M,T({is:s},()=>e.props,{get ref(){return X()},set ref(t){X(t)},children:(t,l)=>{var i=P(),r=Z(i);L(r,()=>e.children??V,()=>({ref:s})),D(t,i)},$$slots:{default:!0}})),F()}const se=`
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
	#include <${te<154?"encodings_fragment":"colorspace_fragment"}>

	vec4 c = vColor;

	if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV ).r;

	if( useDash == 1. ){
			c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
	}

	gl_FragColor = CustomLinearTosRGB(c);
}
`;function re(M,e){Y(e,!0);const p=E(),A=()=>Q(v,"$size",p);let b=o(e,"opacity",3,1),X=o(e,"color",3,"#ffffff"),a=o(e,"dashOffset",3,0),y=o(e,"dashArray",3,0),c=o(e,"dashRatio",3,0),f=o(e,"attenuate",3,!0),u=o(e,"width",3,1),g=o(e,"scaleDown",3,0),d=o(e,"ref",15),x=G(e,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:O,size:v}=I();const s={lineWidth:{value:u()},color:{value:new W(X())},opacity:{value:b()},resolution:{value:new H(1,1)},sizeAttenuation:{value:f()?1:0},dashArray:{value:y()},dashOffset:{value:a()},dashRatio:{value:c()},useDash:{value:y()>0?1:0},scaleDown:{value:g()/10},alphaTest:{value:0},alphaMap:{value:e.alphaMap},useAlphaMap:{value:e.alphaMap?1:0}},R=new J({uniforms:s});C(()=>{s.resolution.value.set(A().width,A().height),O()}),C(()=>{s.dashRatio.value=c(),s.dashArray.value=y(),s.dashOffset.value=a(),s.lineWidth.value=u(),s.opacity.value=b(),s.color.value.set(X()),O()}),B(M,T({is:R,fragmentShader:se,vertexShader:ee},()=>x,{get ref(){return d()},set ref(t){d(t)},children:(t,l)=>{var i=P(),r=Z(i);L(r,()=>e.children??V,()=>({ref:R})),D(t,i)},$$slots:{default:!0}})),F()}const ne=new K([new z(-3,0,0),new z(-1,1,-1),new z(1,-1,1),new z(3,0,0)]),oe=ne.getPoints(100),ie=new W("#fe3d00"),le=new W("#9800fe");var ue=S("<!> <!>",1);function we(M,e){Y(e,!0);let p=o(e,"baseWidth",3,.3),A=o(e,"baseDashOffset",3,0),b=o(e,"opacity",3,1),X=o(e,"dashRatio",3,.8),a=G(e,["$$slots","$$events","$$legacy","baseWidth","baseDashOffset","opacity","dashRatio","dashOffset"]),y=k(()=>e.dashOffset??A());const c=new N;$(f=>{const{uniforms:u}=c.material;e.dashOffset||(u.dashOffset.value+=f/2),u.color.value.lerpColors(ie,le,Math.sin(f*8)+.5),u.lineWidth.value=Math.max(Math.sin(U(y)*2)/5+p(),.01)}),B(M,T({is:c,"position.y":3,scale:2},()=>a,{children:(f,u)=>{var g=ue(),d=Z(g);ae(d,{points:oe});var x=q(d,2);re(x,{width:.5,dashArray:1.1,get dashRatio(){return X()},get dashOffset(){return U(y)},transparent:!0,get opacity(){return b()},depthTest:!1}),D(f,g)},$$slots:{default:!0}})),F()}export{we as default};
