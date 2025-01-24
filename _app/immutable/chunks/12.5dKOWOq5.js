import{a as M,t as K,c as X}from"./disclose-version.dWtSGD-r.js";import{a0 as oe,v as l,a1 as ie,a2 as A,a3 as q,z as m,B as re,w as Y,D as Z,C as $}from"./runtime.liGrBqgh.js";import{e as me}from"./each.DIW0GBHS.js";import{c as J}from"./svelte-component.bmro9bRp.js";import{a,s as ge,r as pe,p as ee}from"./props.B9ZiqexT.js";import{M as he,P as Pe,V as S,C as j,D as we}from"./three.module.iKKkBh6O.js";import{a as ae,u as U,T as C}from"./T.Bd7S2fO2.js";import"./index.BXAB9BT5.js";import{i as ye}from"./if.Dfde91_g.js";import{s as Ce}from"./snippet.Di1p6p-W.js";import{r as ke}from"./revision.CWH-tMVC.js";import"./legacy.C8Ez_6LP.js";import{a as xe}from"./array.CNldQ1Xi.js";import{h as ze}from"./color.D7bleQK4.js";import{u as Se}from"./analyser.svelte.CzcSvk9D.js";import"./auth.svelte.CGUMTyGk.js";import{a as Te,b as Ge,L as _e}from"./Line2.lc89Enda.js";const be=`
  varying vec3 localPosition;
  varying vec4 worldPosition;

  uniform vec3 worldCamProjPosition;
	uniform vec3 worldPlanePosition;
	uniform float fadeDistance;
	uniform bool infiniteGrid;
	uniform bool followCamera;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	void main() {
		localPosition = vec3(
		  position[coord0],
			position[coord1],
			position[coord2]
		);

		if (infiniteGrid) {
		  localPosition *= 1.0 + fadeDistance;
		}

		worldPosition = modelMatrix * vec4(localPosition, 1.0);
		if (followCamera) {
		  worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
      localPosition = (inverse(modelMatrix) * worldPosition).xyz;
		}

		gl_Position = projectionMatrix * viewMatrix * worldPosition;
	}
`,De=`
  #define PI 3.141592653589793

	varying vec3 localPosition;
	varying vec4 worldPosition;

	uniform vec3 worldCamProjPosition;
	uniform float cellSize;
	uniform float sectionSize;
	uniform vec3 cellColor;
	uniform vec3 sectionColor;
	uniform float fadeDistance;
	uniform float fadeStrength;
	uniform float cellThickness;
	uniform float sectionThickness;
	uniform vec3 backgroundColor;
	uniform float backgroundOpacity;

	uniform bool infiniteGrid;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	// 0 - default; 1 - lines; 2 - circles; 3 - polar
	uniform int gridType;

  // lineGrid coord for lines
	uniform int lineGridCoord;

	// circlegrid max radius
	uniform float circleGridMaxRadius;

	// polar grid dividers
	uniform float polarCellDividers;
	uniform float polarSectionDividers;

	float getSquareGrid(float size, float thickness, vec3 localPos) {
		vec2 coord = localPos.xy / size;

		vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
		float line = min(grid.x, grid.y) + 1.0 - thickness;

		return 1.0 - min(line, 1.0);
	}

	float getLinesGrid(float size, float thickness, vec3 localPos) {
		float coord = localPos[lineGridCoord] / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		return 1.0 - min(line, 1.0);
	}

	float getCirclesGrid(float size, float thickness, vec3 localPos) {
		float coord = length(localPos.xy) / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		if (!infiniteGrid && circleGridMaxRadius > 0. && coord > circleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.0);
	}

	float getPolarGrid(float size, float thickness, float polarDividers, vec3 localPos) {
		float rad = length(localPos.xy) / size;
		vec2 coord = vec2(rad, atan(localPos.x, localPos.y) * polarDividers / PI) ;

		vec2 wrapped = vec2(coord.x, fract(coord.y / (2.0 * polarDividers)) * (2.0 * polarDividers));
		vec2 coordWidth = fwidth(coord);
		vec2 wrappedWidth = fwidth(wrapped);
		vec2 width = (coord.y < -polarDividers * 0.5 || coord.y > polarDividers * 0.5 ? wrappedWidth : coordWidth) * (1.+thickness*0.25);

		// Compute anti-aliased world-space grid lines
		vec2 grid = abs(fract(coord - 0.5) - 0.5) / width;
		float line = min(grid.x, grid.y);

if (!infiniteGrid && circleGridMaxRadius > 0.0 && rad > circleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.0);
	}

	void main() {
		float g1 = 0.0;
		float g2 = 0.0;

		vec3 localPos = vec3(localPosition[coord0], localPosition[coord1], localPosition[coord2]);

		if (gridType == 0) {
			g1 = getSquareGrid(cellSize, cellThickness, localPos);
			g2 = getSquareGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 1) {
			g1 = getLinesGrid(cellSize, cellThickness, localPos);
			g2 = getLinesGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 2) {
			g1 = getCirclesGrid(cellSize, cellThickness, localPos);
			g2 = getCirclesGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 3) {
			g1 = getPolarGrid(cellSize, cellThickness, polarCellDividers, localPos);
			g2 = getPolarGrid(sectionSize, sectionThickness, polarSectionDividers, localPos);
		}

		float dist = distance(worldCamProjPosition, worldPosition.xyz);
		float d = 1.0 - min(dist / fadeDistance, 1.0);
		float fadeFactor = pow(d, fadeStrength) * 0.95;

		vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

		if (backgroundOpacity > 0.0) {
			float linesAlpha = clamp((g1 + g2) * fadeFactor, 0.0,1.0);
			vec3 finalColor = mix(backgroundColor, color, linesAlpha);
			float blendedAlpha = max(linesAlpha, backgroundOpacity * fadeFactor);
			gl_FragColor = vec4(finalColor, blendedAlpha);

		} else {
			gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
			gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
		}

		if (gl_FragColor.a <= 0.0) {
		  discard;
		}

		#include <tonemapping_fragment>
		#include <${ke<154?"encodings_fragment":"colorspace_fragment"}>
	}
`;var Me=K("<!> <!>",1);function Ae(d,e){oe(e,!0);let R=a(e,"cellColor",3,"#000000"),F=a(e,"sectionColor",3,"#0000ee"),g=a(e,"cellSize",3,1),O=a(e,"backgroundColor",3,"#dadada"),T=a(e,"backgroundOpacity",3,0),P=a(e,"sectionSize",3,10),B=a(e,"plane",3,"xz"),p=a(e,"gridSize",19,()=>[20,20]),L=a(e,"followCamera",3,!1),k=a(e,"infiniteGrid",3,!1),x=a(e,"fadeDistance",3,100),w=a(e,"fadeStrength",3,1),G=a(e,"cellThickness",3,1),_=a(e,"sectionThickness",3,2),I=a(e,"side",3,we),N=a(e,"type",3,"grid"),o=a(e,"axis",3,"x"),i=a(e,"maxRadius",3,0),n=a(e,"cellDividers",3,6),f=a(e,"sectionDividers",3,2),u=a(e,"ref",15),s=pe(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const c=new he,{invalidate:t,camera:E}=ae(),Q=new Pe,te=new S(0,1,0),le=new S(0,0,0),b={x:0,y:1,z:2},ne={xz:"xzy",xy:"xyz",zy:"zyx"},D={grid:0,lines:1,circular:2,polar:3},r={cellSize:{value:g()},sectionSize:{value:P()},cellColor:{value:new j(R())},sectionColor:{value:new j(F())},backgroundColor:{value:new j(O())},backgroundOpacity:{value:T()},fadeDistance:{value:x()},fadeStrength:{value:w()},cellThickness:{value:G()},sectionThickness:{value:_()},infiniteGrid:{value:k()},followCamera:{value:L()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:D.grid},lineGridCoord:{value:b[o()]},circleGridMaxRadius:{value:i()},polarCellDividers:{value:n()},polarSectionDividers:{value:f()},worldCamProjPosition:{value:new S},worldPlanePosition:{value:new S}};l(()=>{const v=ne[B()],W=v.charAt(0),z=v.charAt(1),V=v.charAt(2);r.coord0.value=b[W],r.coord1.value=b[z],r.coord2.value=b[V],t()}),l(()=>{r.cellSize.value=g(),t()}),l(()=>{r.sectionSize.value=P(),t()}),l(()=>{r.cellColor.value.set(R()),t()}),l(()=>{r.sectionColor.value.set(F()),t()}),l(()=>{r.backgroundColor.value.set(O()),t()}),l(()=>{r.backgroundOpacity.value=T(),t()}),l(()=>{r.fadeDistance.value=x(),t()}),l(()=>{r.fadeStrength.value=w(),t()}),l(()=>{r.cellThickness.value=G(),t()}),l(()=>{r.sectionThickness.value=_(),t()}),l(()=>{r.followCamera.value=L(),t()}),l(()=>{r.infiniteGrid.value=k(),t()}),l(()=>{switch(N()){case"grid":{r.gridType.value=D.grid;break}case"lines":{r.gridType.value=D.lines,r.lineGridCoord.value=b[o()];break}case"circular":{r.gridType.value=D.circular,r.circleGridMaxRadius.value=i();break}case"polar":{r.gridType.value=D.polar,r.circleGridMaxRadius.value=i(),r.polarCellDividers.value=n(),r.polarSectionDividers.value=f();break}}t()}),U(()=>{Q.setFromNormalAndCoplanarPoint(te,le).applyMatrix4(c.matrixWorld);const v=c.material,W=v.uniforms.worldCamProjPosition,z=v.uniforms.worldPlanePosition;Q.projectPoint(E.current.position,W.value),z.value.set(0,0,0).applyMatrix4(c.matrixWorld)},{autoInvalidate:!1}),C(d,ge({is:c,frustumCulled:!1},()=>s,{get ref(){return u()},set ref(v){u(v)},children:(v,W)=>{var z=Me(),V=A(z);J(V,()=>C.ShaderMaterial,(h,y)=>{y(h,{fragmentShader:De,vertexShader:be,uniforms:r,transparent:!0,get side(){return I()}})});var se=q(V,2);{var ce=h=>{var y=X(),H=A(y);Ce(H,()=>e.children,()=>({ref:c})),M(h,y)},de=h=>{var y=X(),H=A(y),fe=re(()=>typeof p()=="number"?[p(),p()]:p());J(H,()=>C.PlaneGeometry,(ue,ve)=>{ve(ue,{get args(){return m(fe)}})}),M(h,y)};ye(se,h=>{e.children?h(ce):h(de,!1)})}M(v,z)},$$slots:{default:!0}})),ie()}const je=d=>d;function Re(d){const e=d-1;return e*e*e+1}const Fe=je(d=>(d.transparent=!0,{tick(e){d.opacity=e},easing:Re,duration:400,delay:100}));var Oe=K("<!> <!>",1),Le=K("<!> <!> <!>",1);function Ie(d,e){oe(e,!0);const{frequencyData:R,analyserReady:F}=Se(),{camera:g}=ae();let O=60,T=350,P=$(void 0);const B=new j("red"),p=[];for(let o=0;o<O;o+=1){const i=new Te,n=new Ge,f=o%2===0?1:-1,u=new Float32Array(T*3);for(let s=0,c=T*3;s<c;s+=3)u[s+0]=f*10,u[s+1]=o/5;i.setPositions(u),p.push({id:crypto.randomUUID(),geometry:i,material:n,positions:u})}U(o=>{const i=o*8,n=g.current.position.z-=i;m(P)!==void 0&&(m(P).position.z=n)});const{start:L}=U(()=>{const{z:o}=g.current.position;for(let i=0,n=p.length;i<n;i+=1){const f=p[i],u=i%2===0?1:-1,s=R.current[i];if(s===void 0)continue;const c=s/20*u;xe(f.positions,c,i/5,o-10),f.geometry.setPositions(f.positions)}},{autoStart:!1});Y(()=>{F.current&&setTimeout(()=>L(),500)});let k=$("forward");const x=new S,w=new S;U(o=>{const{z:i}=g.current.position;m(k)==="forward"?(g.current.position.lerp(w.set(0,4,i),o),x.lerp(w.set(0,4,i-10),o)):(g.current.position.lerp(w.set(0,15,i),o),x.lerp(w.set(0,2,i-8),o)),g.current.lookAt(x)}),Y(()=>{const o=setInterval(()=>{Z(k,ee(m(k)==="forward"?"top":"forward"))},6e4);return()=>clearInterval(o)});var G=Le(),_=A(G);J(_,()=>C.PerspectiveCamera,(o,i)=>{i(o,{makeDefault:!0,fov:100,position:[0,4,10],oncreate:n=>n.lookAt(0,2,0)})});var I=q(_,2);Ae(I,{infiniteGrid:!0,type:"lines",axis:"x",cellColor:new j(.1,.1,.1),sectionColor:"white",get ref(){return m(P)},set ref(o){Z(P,ee(o))}});var N=q(I,2);me(N,19,()=>p,o=>o.id,(o,i,n)=>{C(o,{is:_e,children:(f,u)=>{var s=Oe(),c=A(s),t=re(()=>ze(B,m(n)/2e3));C(c,{get is(){return m(i).material},linewidth:1.5,get color(){return m(t)},transition:Fe});var E=q(c,2);C(E,{get is(){return m(i).geometry}}),M(f,s)},$$slots:{default:!0}})}),M(d,G),ie()}const io=Object.freeze(Object.defineProperty({__proto__:null,default:Ie},Symbol.toStringTag,{value:"Module"}));export{Ie as _,io as a};
