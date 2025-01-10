import{b as M,t as Q,c as H}from"./disclose-version.DxMWfzFv.js";import{w as J,N as l,y as K,a6 as A,a7 as V,Q as m,T as X,ab as de,aa as fe}from"./runtime.TNfRlsGO.js";import{e as ue}from"./each.DbS8IIVD.js";import{c as U}from"./svelte-component.B5dtG_Db.js";import{p as i,s as ve,r as ge,a as me}from"./props.J8c_Vd-h.js";import{M as pe,C as q,V as I,D as he,P as Pe}from"./three.module.iKKkBh6O.js";import{a as Y,u as Z,T as w}from"./T.5NVhIH70.js";import"./index.DSYcLGFw.js";import{i as Ce}from"./if.VCZdKAs7.js";import{s as we}from"./snippet.BIPltzSI.js";import{r as ye}from"./revision.CWH-tMVC.js";import"./legacy.DWt5lqJy.js";import{h as ke}from"./color.D7bleQK4.js";import{a as xe}from"./auth.svelte.VYk90IdW.js";import{a as ze,b as Se,L as Ge}from"./Line2.lc89Enda.js";const Te=`
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
`,be=`
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
		#include <${ye<154?"encodings_fragment":"colorspace_fragment"}>
	}
`;var _e=Q("<!> <!>",1);function De(s,e){J(e,!0);let y=i(e,"cellColor",3,"#000000"),k=i(e,"sectionColor",3,"#0000ee"),f=i(e,"cellSize",3,1),j=i(e,"backgroundColor",3,"#dadada"),p=i(e,"backgroundOpacity",3,0),F=i(e,"sectionSize",3,10),x=i(e,"plane",3,"xz"),h=i(e,"gridSize",19,()=>[20,20]),G=i(e,"followCamera",3,!1),T=i(e,"infiniteGrid",3,!1),R=i(e,"fadeDistance",3,100),r=i(e,"fadeStrength",3,1),n=i(e,"cellThickness",3,1),c=i(e,"sectionThickness",3,2),t=i(e,"side",3,he),O=i(e,"type",3,"grid"),u=i(e,"axis",3,"x"),v=i(e,"maxRadius",3,0),P=i(e,"cellDividers",3,6),z=i(e,"sectionDividers",3,2),B=i(e,"ref",15),$=ge(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const b=new pe,{invalidate:a,camera:ee}=Y(),E=new Pe,oe=new I(0,1,0),ie=new I(0,0,0),_={x:0,y:1,z:2},re={xz:"xzy",xy:"xyz",zy:"zyx"},D={grid:0,lines:1,circular:2,polar:3},o={cellSize:{value:f()},sectionSize:{value:F()},cellColor:{value:new q(y())},sectionColor:{value:new q(k())},backgroundColor:{value:new q(j())},backgroundOpacity:{value:p()},fadeDistance:{value:R()},fadeStrength:{value:r()},cellThickness:{value:n()},sectionThickness:{value:c()},infiniteGrid:{value:T()},followCamera:{value:G()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:D.grid},lineGridCoord:{value:_[u()]},circleGridMaxRadius:{value:v()},polarCellDividers:{value:P()},polarSectionDividers:{value:z()},worldCamProjPosition:{value:new I},worldPlanePosition:{value:new I}};l(()=>{const d=re[x()],L=d.charAt(0),S=d.charAt(1),W=d.charAt(2);o.coord0.value=_[L],o.coord1.value=_[S],o.coord2.value=_[W],a()}),l(()=>{o.cellSize.value=f(),a()}),l(()=>{o.sectionSize.value=F(),a()}),l(()=>{o.cellColor.value.set(y()),a()}),l(()=>{o.sectionColor.value.set(k()),a()}),l(()=>{o.backgroundColor.value.set(j()),a()}),l(()=>{o.backgroundOpacity.value=p(),a()}),l(()=>{o.fadeDistance.value=R(),a()}),l(()=>{o.fadeStrength.value=r(),a()}),l(()=>{o.cellThickness.value=n(),a()}),l(()=>{o.sectionThickness.value=c(),a()}),l(()=>{o.followCamera.value=G(),a()}),l(()=>{o.infiniteGrid.value=T(),a()}),l(()=>{switch(O()){case"grid":{o.gridType.value=D.grid;break}case"lines":{o.gridType.value=D.lines,o.lineGridCoord.value=_[u()];break}case"circular":{o.gridType.value=D.circular,o.circleGridMaxRadius.value=v();break}case"polar":{o.gridType.value=D.polar,o.circleGridMaxRadius.value=v(),o.polarCellDividers.value=P(),o.polarSectionDividers.value=z();break}}a()}),Z(()=>{E.setFromNormalAndCoplanarPoint(oe,ie).applyMatrix4(b.matrixWorld);const d=b.material,L=d.uniforms.worldCamProjPosition,S=d.uniforms.worldPlanePosition;E.projectPoint(ee.current.position,L.value),S.value.set(0,0,0).applyMatrix4(b.matrixWorld)},{autoInvalidate:!1}),w(s,ve({is:b,frustumCulled:!1},()=>$,{get ref(){return B()},set ref(d){B(d)},children:(d,L)=>{var S=_e(),W=A(S);U(W,()=>w.ShaderMaterial,(g,C)=>{C(g,{fragmentShader:be,vertexShader:Te,uniforms:o,transparent:!0,get side(){return t()}})});var ae=V(W,2);{var le=g=>{var C=H(),N=A(C);we(N,()=>e.children,()=>({ref:b})),M(g,C)},te=g=>{var C=H(),N=A(C),ne=X(()=>typeof h()=="number"?[h(),h()]:h());U(N,()=>w.PlaneGeometry,(se,ce)=>{ce(se,{get args(){return m(ne)}})}),M(g,C)};Ce(ae,g=>{e.children?g(le):g(te,!1)})}M(d,S)},$$slots:{default:!0}})),K()}const Me=(s,e,y,k)=>{for(let f=s.length-1;f>=3;f--)s[f]=s[f-3];return s[0]=e,s[1]=y,s[2]=k,s};var Ae=Q("<!> <!>",1),je=Q("<!> <!> <!>",1);function Fe(s,e){J(e,!0);const{frequencyData:y}=xe(),{camera:k}=Y();let f=60,j=350,p=fe(void 0);const F=new q("red"),x=[];for(let r=0;r<f;r+=1){const n=new ze,c=new Se,t=new Float32Array(j*3);n.setPositions(t),x.push({id:crypto.randomUUID(),geometry:n,material:c,positions:t})}Z(r=>{const n=r*8,c=k.current.position.z-=n;m(p)!==void 0&&(m(p).position.z=c);for(let t=0,O=x.length;t<O;t+=1){const u=x[t],v=t%2===0?1:-1,P=y.current[t];if(P===void 0)continue;const z=P/20*v;Me(u.positions,z,t/5,c-10),u.geometry.setPositions(u.positions)}});var h=je(),G=A(h);U(G,()=>w.PerspectiveCamera,(r,n)=>{n(r,{makeDefault:!0,fov:100,position:[0,4,10],oncreate:c=>{c.lookAt(0,2,0)}})});var T=V(G,2);De(T,{infiniteGrid:!0,type:"lines",axis:"x",cellColor:"white",sectionColor:"white",get ref(){return m(p)},set ref(r){de(p,me(r))}});var R=V(T,2);ue(R,19,()=>x,r=>r.id,(r,n,c)=>{w(r,{is:Ge,children:(t,O)=>{var u=Ae(),v=A(u),P=X(()=>ke(F,m(c)/2e3));w(v,{get is(){return m(n).material},transparent:!0,linewidth:1.5,get color(){return m(P)}});var z=V(v,2);w(z,{get is(){return m(n).geometry}}),M(t,u)},$$slots:{default:!0}})}),M(s,h),K()}const Xe=Object.freeze(Object.defineProperty({__proto__:null,default:Fe},Symbol.toStringTag,{value:"Module"}));export{Fe as _,Xe as a};
