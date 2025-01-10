import{b as A,t as H,c as K}from"./disclose-version.DFxnx1AN.js";import{B as $,Q as n,D as ee,a8 as O,a9 as U,T as d,W as oe,u as ve,ab as X,aa as Y}from"./runtime.BxeNZxLl.js";import{e as me}from"./each.Dtb_ZQQj.js";import{c as Q}from"./svelte-component.C7V4StSs.js";import{p as r,s as ge,r as pe,a as Z}from"./props.CvCzEa8T.js";import{M as he,C as j,V as S,D as Pe,P as we}from"./three.module.iKKkBh6O.js";import{a as ie,u as E,T as C}from"./T.BojAtv_L.js";import"./index.B_O87gS3.js";import{i as Ce}from"./if.DA9MOHmj.js";import{s as ye}from"./snippet.AXKrw6tU.js";import{r as ke}from"./revision.CWH-tMVC.js";import{O as xe}from"./OrbitControls.BupLaE_o.js";import"./legacy.u_OnCUt7.js";import{a as ze}from"./array.CNldQ1Xi.js";import{h as Se}from"./color.D7bleQK4.js";import{a as be}from"./auth.svelte.CMqokhwd.js";import{a as Ge,b as Te,L as _e}from"./Line2.lc89Enda.js";const De=`
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
`;var Ae=H("<!> <!>",1);function Oe(B,e){$(e,!0);let F=r(e,"cellColor",3,"#000000"),v=r(e,"sectionColor",3,"#0000ee"),R=r(e,"cellSize",3,1),L=r(e,"backgroundColor",3,"#dadada"),p=r(e,"backgroundOpacity",3,0),I=r(e,"sectionSize",3,10),y=r(e,"plane",3,"xz"),m=r(e,"gridSize",19,()=>[20,20]),k=r(e,"followCamera",3,!1),h=r(e,"infiniteGrid",3,!1),b=r(e,"fadeDistance",3,100),G=r(e,"fadeStrength",3,1),T=r(e,"cellThickness",3,1),W=r(e,"sectionThickness",3,2),i=r(e,"side",3,Pe),a=r(e,"type",3,"grid"),s=r(e,"axis",3,"x"),l=r(e,"maxRadius",3,0),_=r(e,"cellDividers",3,6),f=r(e,"sectionDividers",3,2),P=r(e,"ref",15),x=pe(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const u=new he,{invalidate:t,camera:re}=ie(),J=new we,ae=new S(0,1,0),le=new S(0,0,0),D={x:0,y:1,z:2},te={xz:"xzy",xy:"xyz",zy:"zyx"},M={grid:0,lines:1,circular:2,polar:3},o={cellSize:{value:R()},sectionSize:{value:I()},cellColor:{value:new j(F())},sectionColor:{value:new j(v())},backgroundColor:{value:new j(L())},backgroundOpacity:{value:p()},fadeDistance:{value:b()},fadeStrength:{value:G()},cellThickness:{value:T()},sectionThickness:{value:W()},infiniteGrid:{value:h()},followCamera:{value:k()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:M.grid},lineGridCoord:{value:D[s()]},circleGridMaxRadius:{value:l()},polarCellDividers:{value:_()},polarSectionDividers:{value:f()},worldCamProjPosition:{value:new S},worldPlanePosition:{value:new S}};n(()=>{const c=te[y()],V=c.charAt(0),z=c.charAt(1),q=c.charAt(2);o.coord0.value=D[V],o.coord1.value=D[z],o.coord2.value=D[q],t()}),n(()=>{o.cellSize.value=R(),t()}),n(()=>{o.sectionSize.value=I(),t()}),n(()=>{o.cellColor.value.set(F()),t()}),n(()=>{o.sectionColor.value.set(v()),t()}),n(()=>{o.backgroundColor.value.set(L()),t()}),n(()=>{o.backgroundOpacity.value=p(),t()}),n(()=>{o.fadeDistance.value=b(),t()}),n(()=>{o.fadeStrength.value=G(),t()}),n(()=>{o.cellThickness.value=T(),t()}),n(()=>{o.sectionThickness.value=W(),t()}),n(()=>{o.followCamera.value=k(),t()}),n(()=>{o.infiniteGrid.value=h(),t()}),n(()=>{switch(a()){case"grid":{o.gridType.value=M.grid;break}case"lines":{o.gridType.value=M.lines,o.lineGridCoord.value=D[s()];break}case"circular":{o.gridType.value=M.circular,o.circleGridMaxRadius.value=l();break}case"polar":{o.gridType.value=M.polar,o.circleGridMaxRadius.value=l(),o.polarCellDividers.value=_(),o.polarSectionDividers.value=f();break}}t()}),E(()=>{J.setFromNormalAndCoplanarPoint(ae,le).applyMatrix4(u.matrixWorld);const c=u.material,V=c.uniforms.worldCamProjPosition,z=c.uniforms.worldPlanePosition;J.projectPoint(re.current.position,V.value),z.value.set(0,0,0).applyMatrix4(u.matrixWorld)},{autoInvalidate:!1}),C(B,ge({is:u,frustumCulled:!1},()=>x,{get ref(){return P()},set ref(c){P(c)},children:(c,V)=>{var z=Ae(),q=O(z);Q(q,()=>C.ShaderMaterial,(g,w)=>{w(g,{fragmentShader:Me,vertexShader:De,uniforms:o,transparent:!0,get side(){return i()}})});var ne=U(q,2);{var se=g=>{var w=K(),N=O(w);ye(N,()=>e.children,()=>({ref:u})),A(g,w)},ce=g=>{var w=K(),N=O(w),de=oe(()=>typeof m()=="number"?[m(),m()]:m());Q(N,()=>C.PlaneGeometry,(fe,ue)=>{ue(fe,{get args(){return d(de)}})}),A(g,w)};Ce(ne,g=>{e.children?g(se):g(ce,!1)})}A(c,z)},$$slots:{default:!0}})),ee()}var je=H("<!> <!>",1),Fe=H("<!> <!> <!>",1);function Re(B,e){$(e,!0);const{frequencyData:F}=be(),{camera:v}=ie();let R=60,L=350,p=Y(void 0);const I=new j("red"),y=[];for(let i=0;i<R;i+=1){const a=new Ge,s=new Te,l=new Float32Array(L*3);a.setPositions(l),y.push({id:crypto.randomUUID(),geometry:a,material:s,positions:l})}E(i=>{const a=i*8,s=v.current.position.z-=a;d(p)!==void 0&&(d(p).position.z=s);for(let l=0,_=y.length;l<_;l+=1){const f=y[l],P=l%2===0?1:-1,x=F.current[l];if(x===void 0)continue;const u=x/20*P;ze(f.positions,u,l/5,s-10),f.geometry.setPositions(f.positions)}});let m=Y("forward");const k=new S,h=new S;E(i=>{const{z:a}=v.current.position;d(m)==="forward"?(v.current.position.lerp(h.set(0,4,a),i),k.lerp(h.set(0,4,a-10),i)):(v.current.position.lerp(h.set(0,15,a),i),k.lerp(h.set(0,2,a-8),i)),v.current.lookAt(k)}),ve(()=>{const i=setInterval(()=>{X(m,Z(d(m)==="forward"?"top":"forward"))},6e4);return()=>clearInterval(i)});var b=Fe(),G=O(b);Q(G,()=>C.PerspectiveCamera,(i,a)=>{a(i,{makeDefault:!0,fov:100,position:[0,4,10],oncreate:s=>s.lookAt(0,2,0),children:(s,l)=>{xe(s,{})},$$slots:{default:!0}})});var T=U(G,2);Oe(T,{infiniteGrid:!0,type:"lines",axis:"x",cellColor:new j(.1,.1,.1),sectionColor:"white",get ref(){return d(p)},set ref(i){X(p,Z(i))}});var W=U(T,2);me(W,19,()=>y,i=>i.id,(i,a,s)=>{C(i,{is:_e,children:(l,_)=>{var f=je(),P=O(f),x=oe(()=>Se(I,d(s)/2e3));C(P,{get is(){return d(a).material},transparent:!0,linewidth:1.5,get color(){return d(x)}});var u=U(P,2);C(u,{get is(){return d(a).geometry}}),A(l,f)},$$slots:{default:!0}})}),A(B,b),ee()}const eo=Object.freeze(Object.defineProperty({__proto__:null,default:Re},Symbol.toStringTag,{value:"Module"}));export{Re as _,eo as a};
