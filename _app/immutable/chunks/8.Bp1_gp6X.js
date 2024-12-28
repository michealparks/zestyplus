import"./disclose-version.Bg9kRutz.js";import{p as K,u as l,a as Q,f as M,s as V,x as m,z as X,a6 as de,a5 as fe}from"./index-client.DDUn5bf5.js";import{a as A,t as B,c as J}from"./template.DXGbSFUO.js";import{e as ue}from"./each.BRtJwWNB.js";import{c as N}from"./svelte-component.BQYC_p_3.js";import{a as i,s as ve,r as ge,p as me}from"./props.Hru3xw41.js";import{M as he,e as Y,C as q,V as I,u as Z,T as w,D as pe,P as Pe,s as Ce}from"./T.6-q_PtqM.js";import"./index.B6sckYSE.js";import{i as we}from"./if.BU_-hnWH.js";import{r as xe}from"./revision.CsE2arzN.js";import"./legacy.CtaTdtmd.js";import{h as ye}from"./color.D7bleQK4.js";import{a as ke}from"./auth.svelte.8Q3o_UP0.js";import{a as ze,b as Se,L as Ge}from"./Line2.xTcFT5D2.js";const Te=`
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
`,_e=`
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
		#include <${xe<154?"encodings_fragment":"colorspace_fragment"}>
	}
`;var be=B("<!> <!>",1);function De(s,e){K(e,!0);let x=i(e,"cellColor",3,"#000000"),y=i(e,"sectionColor",3,"#0000ee"),f=i(e,"cellSize",3,1),j=i(e,"backgroundColor",3,"#dadada"),h=i(e,"backgroundOpacity",3,0),F=i(e,"sectionSize",3,10),k=i(e,"plane",3,"xz"),p=i(e,"gridSize",19,()=>[20,20]),G=i(e,"followCamera",3,!1),T=i(e,"infiniteGrid",3,!1),R=i(e,"fadeDistance",3,100),r=i(e,"fadeStrength",3,1),n=i(e,"cellThickness",3,1),c=i(e,"sectionThickness",3,2),t=i(e,"side",3,pe),O=i(e,"type",3,"grid"),u=i(e,"axis",3,"x"),v=i(e,"maxRadius",3,0),P=i(e,"cellDividers",3,6),z=i(e,"sectionDividers",3,2),E=i(e,"ref",15),$=ge(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const _=new he,{invalidate:a,camera:ee}=Y(),H=new Pe,oe=new I(0,1,0),ie=new I(0,0,0),b={x:0,y:1,z:2},re={xz:"xzy",xy:"xyz",zy:"zyx"},D={grid:0,lines:1,circular:2,polar:3},o={cellSize:{value:f()},sectionSize:{value:F()},cellColor:{value:new q(x())},sectionColor:{value:new q(y())},backgroundColor:{value:new q(j())},backgroundOpacity:{value:h()},fadeDistance:{value:R()},fadeStrength:{value:r()},cellThickness:{value:n()},sectionThickness:{value:c()},infiniteGrid:{value:T()},followCamera:{value:G()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:D.grid},lineGridCoord:{value:b[u()]},circleGridMaxRadius:{value:v()},polarCellDividers:{value:P()},polarSectionDividers:{value:z()},worldCamProjPosition:{value:new I},worldPlanePosition:{value:new I}};l(()=>{const d=re[k()],L=d.charAt(0),S=d.charAt(1),W=d.charAt(2);o.coord0.value=b[L],o.coord1.value=b[S],o.coord2.value=b[W],a()}),l(()=>{o.cellSize.value=f(),a()}),l(()=>{o.sectionSize.value=F(),a()}),l(()=>{o.cellColor.value.set(x()),a()}),l(()=>{o.sectionColor.value.set(y()),a()}),l(()=>{o.backgroundColor.value.set(j()),a()}),l(()=>{o.backgroundOpacity.value=h(),a()}),l(()=>{o.fadeDistance.value=R(),a()}),l(()=>{o.fadeStrength.value=r(),a()}),l(()=>{o.cellThickness.value=n(),a()}),l(()=>{o.sectionThickness.value=c(),a()}),l(()=>{o.followCamera.value=G(),a()}),l(()=>{o.infiniteGrid.value=T(),a()}),l(()=>{switch(O()){case"grid":{o.gridType.value=D.grid;break}case"lines":{o.gridType.value=D.lines,o.lineGridCoord.value=b[u()];break}case"circular":{o.gridType.value=D.circular,o.circleGridMaxRadius.value=v();break}case"polar":{o.gridType.value=D.polar,o.circleGridMaxRadius.value=v(),o.polarCellDividers.value=P(),o.polarSectionDividers.value=z();break}}a()}),Z(()=>{H.setFromNormalAndCoplanarPoint(oe,ie).applyMatrix4(_.matrixWorld);const d=_.material,L=d.uniforms.worldCamProjPosition,S=d.uniforms.worldPlanePosition;H.projectPoint(ee.current.position,L.value),S.value.set(0,0,0).applyMatrix4(_.matrixWorld)},{autoInvalidate:!1}),w(s,ve({is:_,frustumCulled:!1},()=>$,{get ref(){return E()},set ref(d){E(d)},children:(d,L)=>{var S=be(),W=M(S);N(W,()=>w.ShaderMaterial,(g,C)=>{C(g,{fragmentShader:_e,vertexShader:Te,uniforms:o,transparent:!0,get side(){return t()}})});var ae=V(W,2);{var le=g=>{var C=J(),U=M(C);Ce(U,()=>e.children,()=>({ref:_})),A(g,C)},te=g=>{var C=J(),U=M(C),ne=X(()=>typeof p()=="number"?[p(),p()]:p());N(U,()=>w.PlaneGeometry,(se,ce)=>{ce(se,{get args(){return m(ne)}})}),A(g,C)};we(ae,g=>{e.children?g(le):g(te,!1)})}A(d,S)},$$slots:{default:!0}})),Q()}const Me=(s,e,x,y)=>{for(let f=s.length-1;f>=3;f--)s[f]=s[f-3];return s[0]=e,s[1]=x,s[2]=y,s};var Ae=B("<!> <!>",1),je=B("<!> <!> <!>",1);function Fe(s,e){K(e,!0);const{frequencyData:x}=ke(),{camera:y}=Y();let f=60,j=350,h=fe(void 0);const F=new q("red"),k=[];for(let r=0;r<f;r+=1){const n=new ze,c=new Se,t=new Float32Array(j*3);n.setPositions(t),k.push({id:crypto.randomUUID(),geometry:n,material:c,positions:t})}Z(r=>{const n=r*8,c=y.current.position.z-=n;m(h)!==void 0&&(m(h).position.z=c);for(let t=0,O=k.length;t<O;t+=1){const u=k[t],v=t%2===0?1:-1,P=x.current[t];if(P===void 0)continue;const z=P/20*v;Me(u.positions,z,t/5,c-10),u.geometry.setPositions(u.positions)}});var p=je(),G=M(p);N(G,()=>w.PerspectiveCamera,(r,n)=>{n(r,{makeDefault:!0,fov:100,position:[0,4,10],oncreate:c=>{console.log("here"),c.lookAt(0,2,0)}})});var T=V(G,2);De(T,{infiniteGrid:!0,type:"lines",axis:"x",cellColor:"white",sectionColor:"white",get ref(){return m(h)},set ref(r){de(h,me(r))}});var R=V(T,2);ue(R,19,()=>k,r=>r.id,(r,n,c)=>{w(r,{is:Ge,children:(t,O)=>{var u=Ae(),v=M(u),P=X(()=>ye(F,m(c)/2e3));w(v,{get is(){return m(n).material},transparent:!0,linewidth:1.5,get color(){return m(P)}});var z=V(v,2);w(z,{get is(){return m(n).geometry}}),A(t,u)},$$slots:{default:!0}})}),A(s,p),Q()}const Qe=Object.freeze(Object.defineProperty({__proto__:null,default:Fe},Symbol.toStringTag,{value:"Module"}));export{Fe as _,Qe as a};
