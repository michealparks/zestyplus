import{b as v,t as u}from"../chunks/disclose-version.CY5IDNoG.js";import"../chunks/legacy.PQa5ncrZ.js";import{p as U,v as f,y as l,w as a,t as z,z as o,x as g}from"../chunks/runtime.XPaRurxh.js";import{i as k}from"../chunks/lifecycle.CxaT9aiB.js";import{u as C,p as L,d as j,j as A,q as D,a as G,T as e}from"../chunks/T.y93Wq12a.js";import"../chunks/index.Cv2FY5Xh.js";import{O}from"../chunks/OrbitControls.gSqUzVJP.js";import{L as F}from"../chunks/Lightformer.Cq_qJzHd.js";import{u as I}from"../chunks/auth.svelte.CNkesG8U.js";import{l as x}from"../chunks/MathUtils.DS64O8Kj.js";import{a as K}from"../chunks/math.BF6GMVh4.js";const V=`
varying vec2 vUv;

void main()	{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,B=`
varying vec2 vUv;

uniform float time;

void main()	{

  vec2 p = - 1.0 + 2.0 * vUv;
  float a = time * 40.0;
  float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

  e = 400.0 * ( p.x * 0.5 + 0.5 );
  f = 400.0 * ( p.y * 0.5 + 0.5 );
  i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
  d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
  r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
  q = f / r;
  e = ( r * cos( q ) ) - a / 2.0;
  f = ( r * sin( q ) ) - a / 2.0;
  d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
  h = ( ( f + d ) + a / 2.0 ) * g;
  i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
  h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
  h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
  i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
  i = mod( i / 5.6, 256.0 ) / 64.0;
  if ( i < 0.0 ) i += 4.0;
  if ( i >= 2.0 ) i = 4.0 - i;
  d = r / 350.0;
  d += sin( d * d * 8.0 ) * 0.52;
  f = ( sin( a * g ) + 1.0 ) / 2.0;
  gl_FragColor = vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );

}
`;var E=u("<!> <!>",1),H=u("<!> <!>",1),J=u("<!> <!> <!> <!> <!>",1);function ot(M,S){U(S,!1);const{scene:b}=C(),{frequencyData:m}=I(),p=f(new L),c=f(new j),h={time:{value:1}},P=new A({uniforms:h,vertexShader:V,fragmentShader:B}),i=f(new D);G(t=>{g(c,a(c).rotation.y+=t);const n=x(a(i).opacity,m.current[64]/50,t);g(i,a(i).opacity=Math.max(.1,n)),h.time.value+=t/3+m.current[32]/500;const r=K(m.current[16],0,100);g(p,a(p).intensity=x(r*10,0,t/2))}),k();var _=J(),y=l(_);e.PerspectiveCamera(y,{makeDefault:!0,"position.z":6,children:(t,n)=>{O(t,{})},$$slots:{default:!0}});var $=o(y,2);e($,{get is(){return a(p)},castShadow:!0,intensity:1e3,position:[4,3,2],oncreate:t=>{t.lookAt(0,0,0),b.add(t.target),t.target.position.set(0,0,0)}});var q=o($,2);e(q,{get is(){return a(c)},castShadow:!0,receiveShadow:!0,children:(t,n)=>{var r=E(),s=l(r);e(s,{get is(){return a(i)},roughness:.1,metalness:1,transparent:!0});var d=o(s,2);e.TorusKnotGeometry(d,{args:[1,.4,256,64]}),v(t,r)},$$slots:{default:!0}});var w=o(q,2);e.Mesh(w,{"position.z":-1,children:(t,n)=>{var r=H(),s=l(r);e(s,{is:P});var d=o(s,2);e.PlaneGeometry(d,{args:[12,3]}),v(t,r)},$$slots:{default:!0}});var T=o(w,2);F(T,{}),v(M,_),z()}export{ot as component};
