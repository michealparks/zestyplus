import"./disclose-version.Bg9kRutz.js";import"./legacy.CtaTdtmd.js";import{p as T,u as P,a as S,f as Y,$ as G,k as C,s as B,aQ as U,a2 as V}from"./index-client.D_7LkImg.js";import{c as I,a as D,t as L}from"./template.AcjnxTEE.js";import{i as q}from"./lifecycle.BmmF2N16.js";import{u as k,B as y,m as E,T as F,s as W,C as Z,g as J,h as Q,aJ as H,V as O,e as K}from"./T.po24HVTg.js";import{v as N}from"./index.TNnlVa_5.js";import{O as $}from"./OrbitControls.DwGhhjL-.js";import{p as u,s as j,b as ee,r as te,c as ae}from"./props.BhoiTsxR.js";import{r as se}from"./revision.CllSKRig.js";function re(z,t){T(t,!0);let _=u(t,"points",19,()=>[]),A=u(t,"shape",3,"none"),g=u(t,"shapeFunction",7,()=>1),h=u(t,"ref",15),a=_().length;const{invalidate:b}=k(),p=new y(new Float32Array(a*6),3),v=new y(new Float32Array(a*6),3),f=new y(new Float32Array(a*6),3),X=new y(new Float32Array(a*2),1),c=new y(new Float32Array(a*2),1),x=new y(new Float32Array(a*2),1),w=new y(new Float32Array(a*4),2),d=new y(new Uint16Array(a*6),1);A()==="taper"&&g(e=>1*Math.pow(4*e*(1-e),1));for(let e=0,l=0,n=0,r=0;e<a;e+=1,l+=2,n+=4,r+=6){X.setX(l,e/_().length),X.setX(l+1,e/_().length),c.setX(l,1),c.setX(l+1,-1);const m=A()==="none"?1:g()(e/(a-1));if(x.setX(l,m),x.setX(l+1,m),w.setXYZW(l,e/(a-1),0,e/(a-1),1),e<a-1){const i=e*2;d.setX(r+0,i+0),d.setX(r+1,i+1),d.setX(r+2,i+2),d.setX(r+3,i+2),d.setX(r+4,i+1),d.setX(r+5,i+3)}}const s=new E;s.setAttribute("position",p),s.setAttribute("previous",v),s.setAttribute("next",f),s.setAttribute("counters",X),s.setAttribute("side",c),s.setAttribute("width",x),s.setAttribute("uv",w),s.setIndex(d);const R=e=>{if(e.length===0||e.length!==a)return;let l=0,n=0,r=0;const m=e[0];v.setXYZ(n,m.x,m.y,m.z),n+=1,v.setXYZ(n,m.x,m.y,m.z),n+=1;for(let M=0;M<a;M++){const o=e[M];p.setXYZ(l,o.x,o.y,o.z),l+=1,p.setXYZ(l,o.x,o.y,o.z),l+=1,M<a-1&&(v.setXYZ(n,o.x,o.y,o.z),n+=1,v.setXYZ(n,o.x,o.y,o.z),n+=1),M>0&&M+1<=a&&(f.setXYZ(r,o.x,o.y,o.z),r+=1,f.setXYZ(r,o.x,o.y,o.z),r+=1)}const i=e[a-1];f.setXYZ(r,i.x,i.y,i.z),r+=1,f.setXYZ(r,i.x,i.y,i.z),r+=1,p.needsUpdate=!0,v.needsUpdate=!0,f.needsUpdate=!0,s.computeBoundingSphere(),b()};P(()=>R(_())),F(z,j({is:s},()=>t.props,{get ref(){return h()},set ref(e){h(e)},children:(e,l)=>{var n=I(),r=Y(n);W(r,()=>t.children??G,()=>({ref:s})),D(e,n)},$$slots:{default:!0}})),S()}const oe=`
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
	#include <${se<154?"encodings_fragment":"colorspace_fragment"}>

	vec4 c = vColor;

	if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV ).r;

	if( useDash == 1. ){
			c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
	}

	gl_FragColor = CustomLinearTosRGB(c);
}
`;function ne(z,t){T(t,!0);const _=ee(),A=()=>ae(d,"$size",_);let g=u(t,"opacity",3,1),h=u(t,"color",3,"#ffffff"),a=u(t,"dashOffset",3,0),b=u(t,"dashArray",3,0),p=u(t,"dashRatio",3,0),v=u(t,"attenuate",3,!0),f=u(t,"width",3,1),X=u(t,"scaleDown",3,0),c=u(t,"ref",15),x=te(t,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:w,size:d}=k();const s={lineWidth:{value:f()},color:{value:new Z(h())},opacity:{value:g()},resolution:{value:new J(1,1)},sizeAttenuation:{value:v()?1:0},dashArray:{value:b()},dashOffset:{value:a()},dashRatio:{value:p()},useDash:{value:b()>0?1:0},scaleDown:{value:X()/10},alphaTest:{value:0},alphaMap:{value:t.alphaMap},useAlphaMap:{value:t.alphaMap?1:0}},R=new Q({uniforms:s});P(()=>{s.resolution.value.set(A().width,A().height),w()}),P(()=>{s.dashRatio.value=p(),s.dashArray.value=b(),s.dashOffset.value=a(),s.lineWidth.value=f(),s.opacity.value=g(),s.color.value.set(h()),w()}),F(z,j({is:R,fragmentShader:oe,vertexShader:N},()=>x,{get ref(){return c()},set ref(e){c(e)},children:(e,l)=>{var n=I(),r=Y(n);W(r,()=>t.children??G,()=>({ref:R})),D(e,n)},$$slots:{default:!0}})),S()}var le=L("<!> <!>",1),ie=L("<!> <!>",1);function ue(z,t){T(t,!1);const A=new H([new O(-3,0,0),new O(-1,1,-1),new O(1,-1,1),new O(3,0,0)]).getPoints(100);let g=U(.5),h=U(0),a=new Z;const b=new Z("#fe3d00"),p=new Z("#9800fe");K(c=>{V(h,C(h)+c/2),a.lerpColors(b,p,Math.sin(C(h)*2)/2+.5),V(g,Math.sin(C(h)*2)/5+.3)}),q();var v=ie(),f=Y(v);F.PerspectiveCamera(f,{makeDefault:!0,children:(c,x)=>{$(c,{autoRotate:!0,autoRotateSpeed:2,enablePan:!1,enableRotate:!1,enableZoom:!1,"target.y":2})},$$slots:{default:!0}});var X=B(f,2);F.Mesh(X,{"position.y":3,scale:2,children:(c,x)=>{var w=le(),d=Y(w);re(d,{points:A});var s=B(d,2);ne(s,{get width(){return C(g)},color:a,dashArray:.5,dashRatio:.5,get dashOffset(){return C(h)},transparent:!0,depthTest:!1}),D(c,w)},$$slots:{default:!0}}),D(z,v),S()}const _e=Object.freeze(Object.defineProperty({__proto__:null,default:ue},Symbol.toStringTag,{value:"Module"}));export{ue as _,_e as a};
