import{a as _,t as N,c as H}from"../chunks/disclose-version.B1qbiK4R.js";import"../chunks/legacy.DkHaiiTp.js";import{p as K,A as l,a as Q,f as M,s as q,g as z,I as ce,L as de,m as fe,h as ue,d as ve}from"../chunks/runtime.BAh1p-zl.js";import{k as ge,u as X,C as V,V as W,a as Y,T as P,D as me,P as he,s as pe,e as Pe,b as Ce}from"../chunks/analyser.DHwu5Qc2.js";import{i as we}from"../chunks/lifecycle.BJYUvM6u.js";import{h as ke}from"../chunks/index.DuO44EwD.js";import{i as xe}from"../chunks/if.CF-fdFUm.js";import{c as J}from"../chunks/svelte-component.Dcv2Zt4P.js";import{p as i,s as ye,r as ze}from"../chunks/props.ZvotMI7v.js";import{r as Se}from"../chunks/revision.BFk_ck0_.js";import"../chunks/auth.svelte.B99zoz8J.js";import{a as Ge,L as Te,b as be}from"../chunks/Line2.DaZCLwgu.js";const De=`
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
		#include <${Se<154?"encodings_fragment":"colorspace_fragment"}>
	}
`;var Me=N("<!> <!>",1);function Ae(t,e){K(e,!0);let C=i(e,"cellColor",3,"#000000"),w=i(e,"sectionColor",3,"#0000ee"),d=i(e,"cellSize",3,1),A=i(e,"backgroundColor",3,"#dadada"),m=i(e,"backgroundOpacity",3,0),F=i(e,"sectionSize",3,10),k=i(e,"plane",3,"xz"),h=i(e,"gridSize",19,()=>[20,20]),S=i(e,"followCamera",3,!1),G=i(e,"infiniteGrid",3,!1),R=i(e,"fadeDistance",3,100),r=i(e,"fadeStrength",3,1),f=i(e,"cellThickness",3,1),n=i(e,"sectionThickness",3,2),s=i(e,"side",3,me),L=i(e,"type",3,"grid"),u=i(e,"axis",3,"x"),v=i(e,"maxRadius",3,0),x=i(e,"cellDividers",3,6),j=i(e,"sectionDividers",3,2),B=i(e,"ref",15),Z=ze(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const T=new ge,{invalidate:a,camera:$}=X(),E=new he,ee=new W(0,1,0),oe=new W(0,0,0),b={x:0,y:1,z:2},ie={xz:"xzy",xy:"xyz",zy:"zyx"},D={grid:0,lines:1,circular:2,polar:3},o={cellSize:{value:d()},sectionSize:{value:F()},cellColor:{value:new V(C())},sectionColor:{value:new V(w())},backgroundColor:{value:new V(A())},backgroundOpacity:{value:m()},fadeDistance:{value:R()},fadeStrength:{value:r()},cellThickness:{value:f()},sectionThickness:{value:n()},infiniteGrid:{value:G()},followCamera:{value:S()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:D.grid},lineGridCoord:{value:b[u()]},circleGridMaxRadius:{value:v()},polarCellDividers:{value:x()},polarSectionDividers:{value:j()},worldCamProjPosition:{value:new W},worldPlanePosition:{value:new W}};l(()=>{const c=ie[k()],O=c.charAt(0),y=c.charAt(1),I=c.charAt(2);o.coord0.value=b[O],o.coord1.value=b[y],o.coord2.value=b[I],a()}),l(()=>{o.cellSize.value=d(),a()}),l(()=>{o.sectionSize.value=F(),a()}),l(()=>{o.cellColor.value.set(C()),a()}),l(()=>{o.sectionColor.value.set(w()),a()}),l(()=>{o.backgroundColor.value.set(A()),a()}),l(()=>{o.backgroundOpacity.value=m(),a()}),l(()=>{o.fadeDistance.value=R(),a()}),l(()=>{o.fadeStrength.value=r(),a()}),l(()=>{o.cellThickness.value=f(),a()}),l(()=>{o.sectionThickness.value=n(),a()}),l(()=>{o.followCamera.value=S(),a()}),l(()=>{o.infiniteGrid.value=G(),a()}),l(()=>{switch(L()){case"grid":{o.gridType.value=D.grid;break}case"lines":{o.gridType.value=D.lines,o.lineGridCoord.value=b[u()];break}case"circular":{o.gridType.value=D.circular,o.circleGridMaxRadius.value=v();break}case"polar":{o.gridType.value=D.polar,o.circleGridMaxRadius.value=v(),o.polarCellDividers.value=x(),o.polarSectionDividers.value=j();break}}a()}),Y(()=>{E.setFromNormalAndCoplanarPoint(ee,oe).applyMatrix4(T.matrixWorld);const c=T.material,O=c.uniforms.worldCamProjPosition,y=c.uniforms.worldPlanePosition;E.projectPoint($.current.position,O.value),y.value.set(0,0,0).applyMatrix4(T.matrixWorld)},{autoInvalidate:!1}),P(t,ye({is:T,frustumCulled:!1},()=>Z,{get ref(){return B()},set ref(c){B(c)},children:(c,O)=>{var y=Me(),I=M(y);J(I,()=>P.ShaderMaterial,(g,p)=>{p(g,{fragmentShader:_e,vertexShader:De,uniforms:o,transparent:!0,get side(){return s()}})});var re=q(I,2);{var ae=g=>{var p=H(),U=M(p);pe(U,()=>e.children,()=>({ref:T})),_(g,p)},le=g=>{var p=H(),U=M(p),te=ce(()=>typeof h()=="number"?[h(),h()]:h());J(U,()=>P.PlaneGeometry,(ne,se)=>{se(ne,{get args(){return z(te)}})}),_(g,p)};xe(re,g=>{e.children?g(ae):g(le,!1)})}_(c,y)},$$slots:{default:!0}})),Q()}function Fe(t,e,C,w){for(let d=t.length-1;d>=3;d--)t[d]=t[d-3];return t[0]=e,t[1]=C,t[2]=w,t}var Re=N("<!> <!>",1),Le=N("<!> <!> <!>",1);function Ke(t,e){K(e,!1);const{frequencyData:C}=Ce(),{camera:w}=X();let d=60,A=350,m=fe();const F=new V("red"),k=[];for(let r=0;r<d;r+=1){const f=new Float32Array(A*3),n=new Ge;n.setPositions(f),k.push({id:crypto.randomUUID(),geo:n,positions:f})}Y(r=>{const f=r*8,n=w.current.position.z-=f;ue(m,z(m).position.z=n);for(let s=0,L=k.length;s<L;s+=1){const u=k[s],v=s%2===0?1:-1,x=C.current[s]/20*v;Fe(u.positions,x,s/5,n-10),u.geo.setPositions(u.positions)}}),we();var h=Le(),S=M(h);P.PerspectiveCamera(S,{makeDefault:!0,fov:100,position:[0,4,10],oncreate:r=>r.lookAt(0,2,0)});var G=q(S,2);Ae(G,{infiniteGrid:!0,type:"lines",axis:"x",cellColor:"white",sectionColor:"white",get ref(){return z(m)},set ref(r){de(m,r)},$$legacy:!0});var R=q(G,2);Pe(R,3,()=>k,r=>r.id,(r,f,n)=>{P(r,{is:Te,children:(s,L)=>{var u=Re(),v=M(u),x=ve(()=>ke(F,z(n)/2e3));P(v,{is:be,linewidth:1.5,get color(){return z(x)}});var j=q(v,2);P(j,{get is(){return z(f).geo}}),_(s,u)},$$slots:{default:!0}})}),_(t,h),Q()}export{Ke as component};
