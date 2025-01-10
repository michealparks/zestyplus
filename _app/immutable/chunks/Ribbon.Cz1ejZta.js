import{c as I,b as Z,t as E}from"./disclose-version.DFxnx1AN.js";import{B as F,Q as Y,a8 as T,n as L,D as B,aa as P,T as D,ab as V,a9 as Q}from"./runtime.BxeNZxLl.js";import{p as l,s as U,b as j,r as S,c as H,a as G}from"./props.CvCzEa8T.js";import{B as g,p as J,C as R,g as K,h as N,t as $,V as O,M as ee}from"./three.module.iKKkBh6O.js";import{a as k,T as W,u as te}from"./T.BojAtv_L.js";import{v as ae}from"./index.B_O87gS3.js";import{s as q}from"./snippet.AXKrw6tU.js";import{r as se}from"./revision.CWH-tMVC.js";import"./legacy.u_OnCUt7.js";function re(C,e){F(e,!0);let p=l(e,"points",19,()=>[]),A=l(e,"shape",3,"none"),b=l(e,"shapeFunction",7,()=>1),X=l(e,"ref",15),a=p().length;const{invalidate:w}=k(),u=new g(new Float32Array(a*6),3),c=new g(new Float32Array(a*6),3),d=new g(new Float32Array(a*6),3),x=new g(new Float32Array(a*2),1),y=new g(new Float32Array(a*2),1),v=new g(new Float32Array(a*2),1),_=new g(new Float32Array(a*4),2),h=new g(new Uint16Array(a*6),1);A()==="taper"&&b(t=>1*Math.pow(4*t*(1-t),1));for(let t=0,i=0,o=0,r=0;t<a;t+=1,i+=2,o+=4,r+=6){x.setX(i,t/p().length),x.setX(i+1,t/p().length),y.setX(i,1),y.setX(i+1,-1);const m=A()==="none"?1:b()(t/(a-1));if(v.setX(i,m),v.setX(i+1,m),_.setXYZW(i,t/(a-1),0,t/(a-1),1),t<a-1){const f=t*2;h.setX(r+0,f+0),h.setX(r+1,f+1),h.setX(r+2,f+2),h.setX(r+3,f+2),h.setX(r+4,f+1),h.setX(r+5,f+3)}}const s=new J;s.setAttribute("position",u),s.setAttribute("previous",c),s.setAttribute("next",d),s.setAttribute("counters",x),s.setAttribute("side",y),s.setAttribute("width",v),s.setAttribute("uv",_),s.setIndex(h);const M=t=>{if(t.length===0||t.length!==a)return;let i=0,o=0,r=0;const m=t[0];c.setXYZ(o,m.x,m.y,m.z),o+=1,c.setXYZ(o,m.x,m.y,m.z),o+=1;for(let z=0;z<a;z++){const n=t[z];u.setXYZ(i,n.x,n.y,n.z),i+=1,u.setXYZ(i,n.x,n.y,n.z),i+=1,z<a-1&&(c.setXYZ(o,n.x,n.y,n.z),o+=1,c.setXYZ(o,n.x,n.y,n.z),o+=1),z>0&&z+1<=a&&(d.setXYZ(r,n.x,n.y,n.z),r+=1,d.setXYZ(r,n.x,n.y,n.z),r+=1)}const f=t[a-1];d.setXYZ(r,f.x,f.y,f.z),r+=1,d.setXYZ(r,f.x,f.y,f.z),r+=1,u.needsUpdate=!0,c.needsUpdate=!0,d.needsUpdate=!0,s.computeBoundingSphere(),w()};Y(()=>M(p())),W(C,U({is:s},()=>e.props,{get ref(){return X()},set ref(t){X(t)},children:(t,i)=>{var o=I(),r=T(o);q(r,()=>e.children??L,()=>({ref:s})),Z(t,o)},$$slots:{default:!0}})),B()}const ne=`
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
`;function oe(C,e){F(e,!0);const p=j(),A=()=>H(h,"$size",p);let b=l(e,"opacity",3,1),X=l(e,"color",3,"#ffffff"),a=l(e,"dashOffset",3,0),w=l(e,"dashArray",3,0),u=l(e,"dashRatio",3,0),c=l(e,"attenuate",3,!0),d=l(e,"width",3,1),x=l(e,"scaleDown",3,0),y=l(e,"ref",15),v=S(e,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:_,size:h}=k();const s={lineWidth:{value:d()},color:{value:new R(X())},opacity:{value:b()},resolution:{value:new K(1,1)},sizeAttenuation:{value:c()?1:0},dashArray:{value:w()},dashOffset:{value:a()},dashRatio:{value:u()},useDash:{value:w()>0?1:0},scaleDown:{value:x()/10},alphaTest:{value:0},alphaMap:{value:e.alphaMap},useAlphaMap:{value:e.alphaMap?1:0}},M=new N({uniforms:s});Y(()=>{s.resolution.value.set(A().width,A().height),_()}),Y(()=>{s.dashRatio.value=u(),s.dashArray.value=w(),s.dashOffset.value=a(),s.lineWidth.value=d(),s.opacity.value=b(),s.color.value.set(X()),_()}),W(C,U({is:M,fragmentShader:ne,vertexShader:ae},()=>v,{get ref(){return y()},set ref(t){y(t)},children:(t,i)=>{var o=I(),r=T(o);q(r,()=>e.children??L,()=>({ref:M})),Z(t,o)},$$slots:{default:!0}})),B()}var ie=E("<!> <!>",1);function we(C,e){F(e,!0);let p=l(e,"baseWidth",3,.3),A=l(e,"baseDashOffset",3,0),b=S(e,["$$slots","$$events","$$legacy","baseWidth","baseDashOffset"]);const a=new $([new O(-3,0,0),new O(-1,1,-1),new O(1,-1,1),new O(3,0,0)]).getPoints(100);let w=P(.5),u=P(G(A())),c=new R;const d=new R("#fe3d00"),x=new R("#9800fe"),y=new ee;te(v=>{V(u,D(u)+v/2),c.lerpColors(d,x,Math.sin(D(u)*2)/2+.5),V(w,G(Math.max(Math.sin(D(u)*2)/5+p(),.01)))}),W(C,U({is:y,"position.y":3,scale:2},()=>b,{children:(v,_)=>{var h=ie(),s=T(h);re(s,{points:a});var M=Q(s,2);oe(M,{get width(){return D(w)},color:c,dashArray:.5,dashRatio:.5,get dashOffset(){return D(u)},transparent:!0,depthTest:!1}),Z(v,h)},$$slots:{default:!0}})),B()}export{we as default};
