import"./DsnmJJEf.js";import{a3 as Z,u as g,i as e,a6 as y,as as G,a8 as Y,ab as I,a9 as T,a5 as W,a7 as k,aa as q}from"./Wk8iZnnz.js";import{p as i,a as S,r as U,s as E,b as j}from"./oafpEiTJ.js";import{fZ as L,ag as H,f$ as B,af as X,n as J,a as V,fb as K,y as N,f_ as Q,du as $,V as F}from"./CtU81MLD.js";import{v as ee}from"./Bzur3xKn.js";import{s as P}from"./C5lbjxb5.js";function te(R,t){Z(t,!0);let v=i(t,"points",19,()=>[]),_=i(t,"shape",3,"none"),D=i(t,"shapeFunction",3,()=>1),M=i(t,"ref",15),z=U(t,["$$slots","$$events","$$legacy","points","shape","shapeFunction","ref","children"]);const s=y(()=>v().length),{invalidate:w}=L(),p=y(()=>new X(new Float32Array(e(s)*6),3)),u=y(()=>new X(new Float32Array(e(s)*6),3)),m=y(()=>new X(new Float32Array(e(s)*6),3)),A=y(()=>new X(new Float32Array(e(s)*2),1)),x=y(()=>new X(new Float32Array(e(s)*2),1)),C=y(()=>new X(new Float32Array(e(s)*2),1)),h=y(()=>new X(new Float32Array(e(s)*4),2)),b=y(()=>new X(new Uint16Array(e(s)*6),1)),l=y(()=>_()==="taper"?a=>1*Math.pow(4*a*(1-a),1):D()),f=new H;g(()=>{for(let a=0,r=0,n=0;a<e(s);a+=1,r+=2,n+=6){e(A).setX(r,a/v().length),e(A).setX(r+1,a/v().length),e(x).setX(r,1),e(x).setX(r+1,-1);const c=_()==="none"?1:e(l)(a/(e(s)-1));if(e(C).setX(r,c),e(C).setX(r+1,c),e(h).setXYZW(r,a/(e(s)-1),0,a/(e(s)-1),1),a<e(s)-1){const d=a*2;e(b).setX(n+0,d+0),e(b).setX(n+1,d+1),e(b).setX(n+2,d+2),e(b).setX(n+3,d+2),e(b).setX(n+4,d+1),e(b).setX(n+5,d+3)}}f.setAttribute("position",e(p)),f.setAttribute("previous",e(u)),f.setAttribute("next",e(m)),f.setAttribute("counters",e(A)),f.setAttribute("side",e(x)),f.setAttribute("width",e(C)),f.setAttribute("uv",e(h)),f.setIndex(e(b))}),g(()=>{if(v().length===0)return;let a=0,r=0,n=0;const c=v()[0];e(u).setXYZ(r,c.x,c.y,c.z),r+=1,e(u).setXYZ(r,c.x,c.y,c.z),r+=1;for(let O=0;O<e(s);O++){const o=v()[O];e(p).setXYZ(a,o.x,o.y,o.z),a+=1,e(p).setXYZ(a,o.x,o.y,o.z),a+=1,O<e(s)-1&&(e(u).setXYZ(r,o.x,o.y,o.z),r+=1,e(u).setXYZ(r,o.x,o.y,o.z),r+=1),O>0&&O+1<=e(s)&&(e(m).setXYZ(n,o.x,o.y,o.z),n+=1,e(m).setXYZ(n,o.x,o.y,o.z),n+=1)}const d=v()[e(s)-1];e(m).setXYZ(n,d.x,d.y,d.z),n+=1,e(m).setXYZ(n,d.x,d.y,d.z),n+=1,e(p).needsUpdate=!0,e(u).needsUpdate=!0,e(m).needsUpdate=!0,f.computeBoundingSphere(),w()}),B(R,S({get is(){return f}},()=>z,{get ref(){return M()},set ref(a){M(a)},children:(a,r)=>{var n=G(),c=Y(n);P(c,()=>t.children??I,()=>({ref:f})),T(a,n)},$$slots:{default:!0}})),W()}const ae=`
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
	#include <colorspace_fragment>

	vec4 c = vColor;

	if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV ).r;

	if( useDash == 1. ){
			c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
	}

	gl_FragColor = CustomLinearTosRGB(c);
}
`;function se(R,t){Z(t,!0);const v=()=>E(b,"$size",_),[_,D]=j();let M=i(t,"opacity",3,1),z=i(t,"color",3,"#ffffff"),s=i(t,"dashOffset",3,0),w=i(t,"dashArray",3,0),p=i(t,"dashRatio",3,0),u=i(t,"attenuate",3,!0),m=i(t,"width",3,1),A=i(t,"scaleDown",3,0),x=i(t,"ref",15),C=U(t,["$$slots","$$events","$$legacy","opacity","color","dashOffset","dashArray","dashRatio","attenuate","width","scaleDown","alphaMap","ref","children"]),{invalidate:h,size:b}=L();const l={lineWidth:{value:m()},color:{value:new V(z())},opacity:{value:M()},resolution:{value:new J(1,1)},sizeAttenuation:{value:u()?1:0},dashArray:{value:w()},useDash:{value:w()>0?1:0},dashOffset:{value:s()},dashRatio:{value:p()},scaleDown:{value:A()/10},alphaTest:{value:0},alphaMap:{value:t.alphaMap},useAlphaMap:{value:t.alphaMap?1:0}},f=new K({uniforms:l});g(()=>{l.lineWidth.value=m(),h()}),g(()=>{l.opacity.value=M(),h()}),g(()=>{l.resolution.value.set(v().width,v().height),h()}),g(()=>{l.sizeAttenuation.value=u()?1:0,h()}),g(()=>{l.dashArray.value=w(),l.useDash.value=w()>0?1:0,h()}),g(()=>{l.dashOffset.value=s(),h()}),g(()=>{l.dashRatio.value=p(),h()}),g(()=>{l.scaleDown.value=A()/10,h()}),g(()=>{l.alphaMap.value=t.alphaMap,l.useAlphaMap.value=t.alphaMap?1:0,h()}),g(()=>{l.color.value.set(z()),h()}),B(R,S({get is(){return f},get fragmentShader(){return ae},get vertexShader(){return ee}},()=>C,{get ref(){return x()},set ref(a){x(a)},children:(a,r)=>{var n=G(),c=Y(n);P(c,()=>t.children??I,()=>({ref:f})),T(a,n)},$$slots:{default:!0}})),W(),D()}const ne=new $([new F(-3,0,0),new F(-1,1,-1),new F(1,-1,1),new F(3,0,0)]),re=ne.getPoints(100),oe=new V("#fe3d00"),ie=new V("#9800fe");var le=k("<!> <!>",1);function pe(R,t){Z(t,!0);let v=i(t,"baseWidth",3,.3),_=i(t,"baseDashOffset",3,0),D=i(t,"opacity",3,1),M=i(t,"dashRatio",3,.8),z=U(t,["$$slots","$$events","$$legacy","baseWidth","baseDashOffset","opacity","dashRatio","dashOffset"]),s=y(()=>t.dashOffset??_());const w=new N;Q(p=>{const{uniforms:u}=w.material;t.dashOffset||(u.dashOffset.value+=p/2),u.color.value.lerpColors(oe,ie,Math.sin(p*8)+.5),u.lineWidth.value=Math.max(Math.sin(e(s)*2)/5+v(),.01)}),B(R,S({get is(){return w},"position.y":3,scale:2},()=>z,{children:(p,u)=>{var m=le(),A=Y(m);te(A,{get points(){return re}});var x=q(A,2);se(x,{width:.5,dashArray:1.1,get dashRatio(){return M()},get dashOffset(){return e(s)},transparent:!0,get opacity(){return D()},depthTest:!1}),T(p,m)},$$slots:{default:!0}})),W()}export{pe as default};
