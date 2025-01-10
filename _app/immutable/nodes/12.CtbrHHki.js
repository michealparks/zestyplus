import{b as A,t as H,c as Q}from"../chunks/disclose-version.CY5IDNoG.js";import{p as $,D as n,t as ee,y as F,z as U,w as d,F as oe,G as ve,ai as X,ah as Y}from"../chunks/runtime.XPaRurxh.js";import{e as me}from"../chunks/each.BoW94gwA.js";import{c as B}from"../chunks/svelte-component.De3lsk1i.js";import{p as r,b as ge,r as pe,c as Z}from"../chunks/props.Dz65N0hT.js";import{d as he,u as ie,P as Pe,V as S,C as R,a as E,T as C,J as we}from"../chunks/T.y93Wq12a.js";import"../chunks/index.Cv2FY5Xh.js";import{i as Ce}from"../chunks/if.uA99IKIX.js";import{s as ye}from"../chunks/snippet.CMdN7rSJ.js";import{r as ke}from"../chunks/revision.CVgzqIIa.js";import{O as xe}from"../chunks/OrbitControls.gSqUzVJP.js";import"../chunks/legacy.PQa5ncrZ.js";import{a as ze}from"../chunks/array.CNldQ1Xi.js";import{h as Se}from"../chunks/color.D7bleQK4.js";import{u as Ge}from"../chunks/auth.svelte.CNkesG8U.js";import{a as Te,b as be,L as De}from"../chunks/Line2.Bv398VxX.js";const _e=`
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
`,Me=`
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
`;var Ae=H("<!> <!>",1);function Fe(J,e){$(e,!0);let O=r(e,"cellColor",3,"#000000"),v=r(e,"sectionColor",3,"#0000ee"),j=r(e,"cellSize",3,1),L=r(e,"backgroundColor",3,"#dadada"),p=r(e,"backgroundOpacity",3,0),I=r(e,"sectionSize",3,10),y=r(e,"plane",3,"xz"),m=r(e,"gridSize",19,()=>[20,20]),k=r(e,"followCamera",3,!1),h=r(e,"infiniteGrid",3,!1),G=r(e,"fadeDistance",3,100),T=r(e,"fadeStrength",3,1),b=r(e,"cellThickness",3,1),W=r(e,"sectionThickness",3,2),i=r(e,"side",3,we),a=r(e,"type",3,"grid"),s=r(e,"axis",3,"x"),l=r(e,"maxRadius",3,0),D=r(e,"cellDividers",3,6),f=r(e,"sectionDividers",3,2),P=r(e,"ref",15),x=pe(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const u=new he,{invalidate:t,camera:re}=ie(),K=new Pe,ae=new S(0,1,0),le=new S(0,0,0),_={x:0,y:1,z:2},te={xz:"xzy",xy:"xyz",zy:"zyx"},M={grid:0,lines:1,circular:2,polar:3},o={cellSize:{value:j()},sectionSize:{value:I()},cellColor:{value:new R(O())},sectionColor:{value:new R(v())},backgroundColor:{value:new R(L())},backgroundOpacity:{value:p()},fadeDistance:{value:G()},fadeStrength:{value:T()},cellThickness:{value:b()},sectionThickness:{value:W()},infiniteGrid:{value:h()},followCamera:{value:k()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:M.grid},lineGridCoord:{value:_[s()]},circleGridMaxRadius:{value:l()},polarCellDividers:{value:D()},polarSectionDividers:{value:f()},worldCamProjPosition:{value:new S},worldPlanePosition:{value:new S}};n(()=>{const c=te[y()],V=c.charAt(0),z=c.charAt(1),q=c.charAt(2);o.coord0.value=_[V],o.coord1.value=_[z],o.coord2.value=_[q],t()}),n(()=>{o.cellSize.value=j(),t()}),n(()=>{o.sectionSize.value=I(),t()}),n(()=>{o.cellColor.value.set(O()),t()}),n(()=>{o.sectionColor.value.set(v()),t()}),n(()=>{o.backgroundColor.value.set(L()),t()}),n(()=>{o.backgroundOpacity.value=p(),t()}),n(()=>{o.fadeDistance.value=G(),t()}),n(()=>{o.fadeStrength.value=T(),t()}),n(()=>{o.cellThickness.value=b(),t()}),n(()=>{o.sectionThickness.value=W(),t()}),n(()=>{o.followCamera.value=k(),t()}),n(()=>{o.infiniteGrid.value=h(),t()}),n(()=>{switch(a()){case"grid":{o.gridType.value=M.grid;break}case"lines":{o.gridType.value=M.lines,o.lineGridCoord.value=_[s()];break}case"circular":{o.gridType.value=M.circular,o.circleGridMaxRadius.value=l();break}case"polar":{o.gridType.value=M.polar,o.circleGridMaxRadius.value=l(),o.polarCellDividers.value=D(),o.polarSectionDividers.value=f();break}}t()}),E(()=>{K.setFromNormalAndCoplanarPoint(ae,le).applyMatrix4(u.matrixWorld);const c=u.material,V=c.uniforms.worldCamProjPosition,z=c.uniforms.worldPlanePosition;K.projectPoint(re.current.position,V.value),z.value.set(0,0,0).applyMatrix4(u.matrixWorld)},{autoInvalidate:!1}),C(J,ge({is:u,frustumCulled:!1},()=>x,{get ref(){return P()},set ref(c){P(c)},children:(c,V)=>{var z=Ae(),q=F(z);B(q,()=>C.ShaderMaterial,(g,w)=>{w(g,{fragmentShader:Me,vertexShader:_e,uniforms:o,transparent:!0,get side(){return i()}})});var ne=U(q,2);{var se=g=>{var w=Q(),N=F(w);ye(N,()=>e.children,()=>({ref:u})),A(g,w)},ce=g=>{var w=Q(),N=F(w),de=oe(()=>typeof m()=="number"?[m(),m()]:m());B(N,()=>C.PlaneGeometry,(fe,ue)=>{ue(fe,{get args(){return d(de)}})}),A(g,w)};Ce(ne,g=>{e.children?g(se):g(ce,!1)})}A(c,z)},$$slots:{default:!0}})),ee()}var Re=H("<!> <!>",1),Oe=H("<!> <!> <!>",1);function Ze(J,e){$(e,!0);const{frequencyData:O}=Ge(),{camera:v}=ie();let j=60,L=350,p=Y(void 0);const I=new R("red"),y=[];for(let i=0;i<j;i+=1){const a=new Te,s=new be,l=new Float32Array(L*3);a.setPositions(l),y.push({id:crypto.randomUUID(),geometry:a,material:s,positions:l})}E(i=>{const a=i*8,s=v.current.position.z-=a;d(p)!==void 0&&(d(p).position.z=s);for(let l=0,D=y.length;l<D;l+=1){const f=y[l],P=l%2===0?1:-1,x=O.current[l];if(x===void 0)continue;const u=x/20*P;ze(f.positions,u,l/5,s-10),f.geometry.setPositions(f.positions)}});let m=Y("forward");const k=new S,h=new S;E(i=>{const{z:a}=v.current.position;d(m)==="forward"?(v.current.position.lerp(h.set(0,4,a),i),k.lerp(h.set(0,4,a-10),i)):(v.current.position.lerp(h.set(0,15,a),i),k.lerp(h.set(0,2,a-8),i)),v.current.lookAt(k)}),ve(()=>{const i=setInterval(()=>{X(m,Z(d(m)==="forward"?"top":"forward"))},6e4);return()=>clearInterval(i)});var G=Oe(),T=F(G);B(T,()=>C.PerspectiveCamera,(i,a)=>{a(i,{makeDefault:!0,fov:100,position:[0,4,10],oncreate:s=>s.lookAt(0,2,0),children:(s,l)=>{xe(s,{})},$$slots:{default:!0}})});var b=U(T,2);Fe(b,{infiniteGrid:!0,type:"lines",axis:"x",cellColor:new R(.1,.1,.1),sectionColor:"white",get ref(){return d(p)},set ref(i){X(p,Z(i))}});var W=U(b,2);me(W,19,()=>y,i=>i.id,(i,a,s)=>{C(i,{is:De,children:(l,D)=>{var f=Re(),P=F(f),x=oe(()=>Se(I,d(s)/2e3));C(P,{get is(){return d(a).material},transparent:!0,linewidth:1.5,get color(){return d(x)}});var u=U(P,2);C(u,{get is(){return d(a).geometry}}),A(l,f)},$$slots:{default:!0}})}),A(J,G),ee()}export{Ze as component};
