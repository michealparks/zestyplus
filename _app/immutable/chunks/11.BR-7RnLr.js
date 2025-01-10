import{b as F,t as H,c as K}from"./disclose-version.DxMWfzFv.js";import{w as $,N as n,y as ee,a6 as R,a7 as N,Q as u,T as oe,O as ve,ab as X,aa as Y}from"./runtime.TNfRlsGO.js";import{e as ge}from"./each.DbS8IIVD.js";import{c as B}from"./svelte-component.B5dtG_Db.js";import{p as r,s as me,r as pe,a as Z}from"./props.J8c_Vd-h.js";import{M as he,C as U,V as T,D as Pe,P as we}from"./three.module.iKKkBh6O.js";import{a as ie,u as E,T as k}from"./T.5NVhIH70.js";import"./index.DSYcLGFw.js";import{i as Ce}from"./if.VCZdKAs7.js";import{s as ye}from"./snippet.BIPltzSI.js";import{r as ke}from"./revision.CWH-tMVC.js";import{O as xe}from"./OrbitControls.B4_1P_ze.js";import"./legacy.DWt5lqJy.js";import{h as ze}from"./color.D7bleQK4.js";import{a as Se}from"./auth.svelte.VYk90IdW.js";import{a as be,b as Ge,L as Te}from"./Line2.lc89Enda.js";const _e=`
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
`;var Me=H("<!> <!>",1);function Ae(c,e){$(e,!0);let x=r(e,"cellColor",3,"#000000"),d=r(e,"sectionColor",3,"#0000ee"),v=r(e,"cellSize",3,1),L=r(e,"backgroundColor",3,"#dadada"),P=r(e,"backgroundOpacity",3,0),I=r(e,"sectionSize",3,10),z=r(e,"plane",3,"xz"),p=r(e,"gridSize",19,()=>[20,20]),S=r(e,"followCamera",3,!1),w=r(e,"infiniteGrid",3,!1),_=r(e,"fadeDistance",3,100),D=r(e,"fadeStrength",3,1),M=r(e,"cellThickness",3,1),W=r(e,"sectionThickness",3,2),i=r(e,"side",3,Pe),a=r(e,"type",3,"grid"),s=r(e,"axis",3,"x"),l=r(e,"maxRadius",3,0),A=r(e,"cellDividers",3,6),g=r(e,"sectionDividers",3,2),C=r(e,"ref",15),b=pe(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const m=new he,{invalidate:t,camera:re}=ie(),J=new we,ae=new T(0,1,0),le=new T(0,0,0),O={x:0,y:1,z:2},te={xz:"xzy",xy:"xyz",zy:"zyx"},j={grid:0,lines:1,circular:2,polar:3},o={cellSize:{value:v()},sectionSize:{value:I()},cellColor:{value:new U(x())},sectionColor:{value:new U(d())},backgroundColor:{value:new U(L())},backgroundOpacity:{value:P()},fadeDistance:{value:_()},fadeStrength:{value:D()},cellThickness:{value:M()},sectionThickness:{value:W()},infiniteGrid:{value:w()},followCamera:{value:S()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:j.grid},lineGridCoord:{value:O[s()]},circleGridMaxRadius:{value:l()},polarCellDividers:{value:A()},polarSectionDividers:{value:g()},worldCamProjPosition:{value:new T},worldPlanePosition:{value:new T}};n(()=>{const f=te[z()],V=f.charAt(0),G=f.charAt(1),q=f.charAt(2);o.coord0.value=O[V],o.coord1.value=O[G],o.coord2.value=O[q],t()}),n(()=>{o.cellSize.value=v(),t()}),n(()=>{o.sectionSize.value=I(),t()}),n(()=>{o.cellColor.value.set(x()),t()}),n(()=>{o.sectionColor.value.set(d()),t()}),n(()=>{o.backgroundColor.value.set(L()),t()}),n(()=>{o.backgroundOpacity.value=P(),t()}),n(()=>{o.fadeDistance.value=_(),t()}),n(()=>{o.fadeStrength.value=D(),t()}),n(()=>{o.cellThickness.value=M(),t()}),n(()=>{o.sectionThickness.value=W(),t()}),n(()=>{o.followCamera.value=S(),t()}),n(()=>{o.infiniteGrid.value=w(),t()}),n(()=>{switch(a()){case"grid":{o.gridType.value=j.grid;break}case"lines":{o.gridType.value=j.lines,o.lineGridCoord.value=O[s()];break}case"circular":{o.gridType.value=j.circular,o.circleGridMaxRadius.value=l();break}case"polar":{o.gridType.value=j.polar,o.circleGridMaxRadius.value=l(),o.polarCellDividers.value=A(),o.polarSectionDividers.value=g();break}}t()}),E(()=>{J.setFromNormalAndCoplanarPoint(ae,le).applyMatrix4(m.matrixWorld);const f=m.material,V=f.uniforms.worldCamProjPosition,G=f.uniforms.worldPlanePosition;J.projectPoint(re.current.position,V.value),G.value.set(0,0,0).applyMatrix4(m.matrixWorld)},{autoInvalidate:!1}),k(c,me({is:m,frustumCulled:!1},()=>b,{get ref(){return C()},set ref(f){C(f)},children:(f,V)=>{var G=Me(),q=R(G);B(q,()=>k.ShaderMaterial,(h,y)=>{y(h,{fragmentShader:De,vertexShader:_e,uniforms:o,transparent:!0,get side(){return i()}})});var ne=N(q,2);{var se=h=>{var y=K(),Q=R(y);ye(Q,()=>e.children,()=>({ref:m})),F(h,y)},ce=h=>{var y=K(),Q=R(y),de=oe(()=>typeof p()=="number"?[p(),p()]:p());B(Q,()=>k.PlaneGeometry,(fe,ue)=>{ue(fe,{get args(){return u(de)}})}),F(h,y)};Ce(ne,h=>{e.children?h(se):h(ce,!1)})}F(f,G)},$$slots:{default:!0}})),ee()}const Oe=(c,e,x,d)=>{for(let v=c.length-1;v>=3;v--)c[v]=c[v-3];return c[0]=e,c[1]=x,c[2]=d,c};var je=H("<!> <!>",1),Fe=H("<!> <!> <!>",1);function Re(c,e){$(e,!0);const{frequencyData:x}=Se(),{camera:d}=ie();let v=60,L=350,P=Y(void 0);const I=new U("red"),z=[];for(let i=0;i<v;i+=1){const a=new be,s=new Ge,l=new Float32Array(L*3);a.setPositions(l),z.push({id:crypto.randomUUID(),geometry:a,material:s,positions:l})}E(i=>{const a=i*8,s=d.current.position.z-=a;u(P)!==void 0&&(u(P).position.z=s);for(let l=0,A=z.length;l<A;l+=1){const g=z[l],C=l%2===0?1:-1,b=x.current[l];if(b===void 0)continue;const m=b/20*C;Oe(g.positions,m,l/5,s-10),g.geometry.setPositions(g.positions)}});let p=Y("forward");const S=new T,w=new T;E(i=>{const{z:a}=d.current.position;u(p)==="forward"?(d.current.position.lerp(w.set(0,4,a),i),S.lerp(w.set(0,4,a-10),i)):(d.current.position.lerp(w.set(0,15,a),i),S.lerp(w.set(0,2,a-8),i)),d.current.lookAt(S)}),ve(()=>{const i=setInterval(()=>{X(p,Z(u(p)==="forward"?"top":"forward"))},6e4);return()=>clearInterval(i)});var _=Fe(),D=R(_);B(D,()=>k.PerspectiveCamera,(i,a)=>{a(i,{makeDefault:!0,fov:100,position:[0,4,10],oncreate:s=>s.lookAt(0,2,0),children:(s,l)=>{xe(s,{})},$$slots:{default:!0}})});var M=N(D,2);Ae(M,{infiniteGrid:!0,type:"lines",axis:"x",cellColor:"white",sectionColor:"white",get ref(){return u(P)},set ref(i){X(P,Z(i))}});var W=N(M,2);ge(W,19,()=>z,i=>i.id,(i,a,s)=>{k(i,{is:Te,children:(l,A)=>{var g=je(),C=R(g),b=oe(()=>ze(I,u(s)/2e3));k(C,{get is(){return u(a).material},transparent:!0,linewidth:1.5,get color(){return u(b)}});var m=N(C,2);k(m,{get is(){return u(a).geometry}}),F(l,g)},$$slots:{default:!0}})}),F(c,_),ee()}const $e=Object.freeze(Object.defineProperty({__proto__:null,default:Re},Symbol.toStringTag,{value:"Module"}));export{Re as _,$e as a};
