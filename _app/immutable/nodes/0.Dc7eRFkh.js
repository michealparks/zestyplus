 * postprocessing v6.36.4 build Tue Nov 05 2024
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2024 Raoul van Rüschen
 * @license Zlib
 */var Jg=1/1e3,Li=1e3,ri=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(g){typeof document<"u"&&document.hidden!==void 0&&(g?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=g)}get delta(){return this._delta*Jg}get fixedDelta(){return this._fixedDelta*Jg}set fixedDelta(g){this._fixedDelta=g*Li}get elapsed(){return this._elapsed*Jg}update(g){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(g!==void 0?g:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(g){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Hi=(()=>{const g=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),A=new Float32Array([0,0,2,0,0,2]),I=new UE;return I.setAttribute("position",new TC(g,3)),I.setAttribute("uv",new TC(A,2)),I})(),DA=class mg{static get fullscreenGeometry(){return Hi}constructor(A="Pass",I=new dC,C=new hE){this.name=A,this.renderer=null,this.scene=I,this.camera=C,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(A){if(this.rtt===A){const I=this.fullscreenMaterial;I!==null&&(I.needsUpdate=!0),this.rtt=!A}}set mainScene(A){}set mainCamera(A){}setRenderer(A){this.renderer=A}isEnabled(){return this.enabled}setEnabled(A){this.enabled=A}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(A){let I=this.screen;I!==null?I.material=A:(I=new aE(mg.fullscreenGeometry,A),I.frustumCulled=!1,this.scene===null&&(this.scene=new dC),this.scene.add(I),this.screen=I)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(A){this.fullscreenMaterial=A}getDepthTexture(){return null}setDepthTexture(A,I=PI){}render(A,I,C,B,E){throw new Error("Render method not implemented!")}setSize(A,I){}initialize(A,I,C){}dispose(){for(const A of Object.keys(this)){const I=this[A];(I instanceof pA||I instanceof TB||I instanceof OB||I instanceof mg)&&this[A].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},pi=class extends DA{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(g,A,I,C,B){const E=g.state.buffers.stencil;E.setLocked(!1),E.setTest(!1)}},ni=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,sD="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",MD=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],FD=class extends jA{constructor(g=new OC){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new T(null),texelSize:new T(new OC),scale:new T(1),kernel:new T(0)},blending:EI,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ND,vertexShader:sD}),this.setTexelSize(g.x,g.y),this.kernelSize=Eg.MEDIUM}set inputBuffer(g){this.uniforms.inputBuffer.value=g}setInputBuffer(g){this.inputBuffer=g}get kernelSequence(){return MD[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(g){this.uniforms.scale.value=g}getScale(){return this.uniforms.scale.value}setScale(g){this.uniforms.scale.value=g}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(g){this.uniforms.kernel.value=g}setKernel(g){this.kernel=g}setTexelSize(g,A){this.uniforms.texelSize.value.set(g,A,g*.5,A*.5)}setSize(g,A){const I=1/g,C=1/A;this.uniforms.texelSize.value.set(I,C,I*.5,C*.5)}},RD=class extends DA{constructor({kernelSize:g=Eg.MEDIUM,resolutionScale:A=.5,width:I=hA.AUTO_SIZE,height:C=hA.AUTO_SIZE,resolutionX:B=I,resolutionY:E=C}={}){super("KawaseBlurPass"),this.renderTargetA=new pA(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const i=this.resolution=new hA(this,B,E,A);i.addEventListener("change",D=>this.setSize(i.baseWidth,i.baseHeight)),this._blurMaterial=new FD,this._blurMaterial.kernelSize=g,this.copyMaterial=new dQ}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(g){this._blurMaterial=g}get dithering(){return this.copyMaterial.dithering}set dithering(g){this.copyMaterial.dithering=g}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(g){this.blurMaterial.kernelSize=g}get width(){return this.resolution.width}set width(g){this.resolution.preferredWidth=g}get height(){return this.resolution.height}set height(g){this.resolution.preferredHeight=g}get scale(){return this.blurMaterial.scale}set scale(g){this.blurMaterial.scale=g}getScale(){return this.blurMaterial.scale}setScale(g){this.blurMaterial.scale=g}getKernelSize(){return this.kernelSize}setKernelSize(g){this.kernelSize=g}getResolutionScale(){return this.resolution.scale}setResolutionScale(g){this.resolution.scale=g}render(g,A,I,C,B){const E=this.scene,i=this.camera,D=this.renderTargetA,o=this.renderTargetB,S=this.blurMaterial,h=S.kernelSequence;let a=A;this.fullscreenMaterial=S;for(let K=0,U=h.length;K<U;++K){const s=K&1?o:D;S.kernel=h[K],S.inputBuffer=a.texture,g.setRenderTarget(s),g.render(E,i),a=s}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=a.texture,g.setRenderTarget(this.renderToScreen?null:I),g.render(E,i)}setSize(g,A){const I=this.resolution;I.setBaseSize(g,A);const C=I.width,B=I.height;this.renderTargetA.setSize(C,B),this.renderTargetB.setSize(C,B),this.blurMaterial.setSize(g,A)}initialize(g,A,I){I!==void 0&&(this.renderTargetA.texture.type=I,this.renderTargetB.texture.type=I,I!==mA?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):g!==null&&g.outputColorSpace===z&&(this.renderTargetA.texture.colorSpace=z,this.renderTargetB.texture.colorSpace=z))}static get AUTO_SIZE(){return hA.AUTO_SIZE}},cD=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);l*=low*high;
#elif defined(THRESHOLD)
l=smoothstep(threshold,threshold+smoothing,l)*l;
#endif
#ifdef COLOR
gl_FragColor=vec4(texel.rgb*clamp(l,0.0,1.0),l);
#else
gl_FragColor=vec4(l);
#endif
}`,qD=class extends jA{constructor(g=!1,A=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:mB.replace(/\D+/g,"")},uniforms:{inputBuffer:new T(null),threshold:new T(0),smoothing:new T(1),range:new T(null)},blending:EI,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:cD,vertexShader:nQ}),this.colorOutput=g,this.luminanceRange=A}set inputBuffer(g){this.uniforms.inputBuffer.value=g}setInputBuffer(g){this.uniforms.inputBuffer.value=g}get threshold(){return this.uniforms.threshold.value}set threshold(g){this.smoothing>0||g>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=g}getThreshold(){return this.threshold}setThreshold(g){this.threshold=g}get smoothing(){return this.uniforms.smoothing.value}set smoothing(g){this.threshold>0||g>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=g}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(g){this.smoothing=g}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(g){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(g){g?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(g){return this.colorOutput}setColorOutputEnabled(g){this.colorOutput=g}get useRange(){return this.luminanceRange!==null}set useRange(g){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(g){g!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=g,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(g){this.luminanceRange=g}},YD=class extends DA{constructor({renderTarget:g,luminanceRange:A,colorOutput:I,resolutionScale:C=1,width:B=hA.AUTO_SIZE,height:E=hA.AUTO_SIZE,resolutionX:i=B,resolutionY:D=E}={}){super("LuminancePass"),this.fullscreenMaterial=new qD(I,A),this.needsSwap=!1,this.renderTarget=g,this.renderTarget===void 0&&(this.renderTarget=new pA(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const o=this.resolution=new hA(this,i,D,C);o.addEventListener("change",S=>this.setSize(o.baseWidth,o.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(g,A,I,C,B){const E=this.fullscreenMaterial;E.inputBuffer=A.texture,g.setRenderTarget(this.renderToScreen?null:this.renderTarget),g.render(this.scene,this.camera)}setSize(g,A){const I=this.resolution;I.setBaseSize(g,A),this.renderTarget.setSize(I.width,I.height)}initialize(g,A,I){I!==void 0&&I!==mA&&(this.renderTarget.texture.type=I,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},lD=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,tD="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",eD=class extends jA{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new T(null),texelSize:new T(new gA)},blending:EI,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:lD,vertexShader:tD})}set inputBuffer(g){this.uniforms.inputBuffer.value=g}setSize(g,A){this.uniforms.texelSize.value.set(1/g,1/A)}},LD=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,rD="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",HD=class extends jA{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new T(null),supportBuffer:new T(null),texelSize:new T(new gA),radius:new T(.85)},blending:EI,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:LD,vertexShader:rD})}set inputBuffer(g){this.uniforms.inputBuffer.value=g}set supportBuffer(g){this.uniforms.supportBuffer.value=g}get radius(){return this.uniforms.radius.value}set radius(g){this.uniforms.radius.value=g}setSize(g,A){this.uniforms.texelSize.value.set(1/g,1/A)}},pD=class extends DA{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new pA(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new eD,this.upsamplingMaterial=new HD,this.resolution=new gA}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(g){if(this.levels!==g){const A=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let I=0;I<g;++I){const C=A.clone();C.texture.name="Downsampling.Mipmap"+I,this.downsamplingMipmaps.push(C)}this.upsamplingMipmaps.push(A);for(let I=1,C=g-1;I<C;++I){const B=A.clone();B.texture.name="Upsampling.Mipmap"+I,this.upsamplingMipmaps.push(B)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(g){this.upsamplingMaterial.radius=g}render(g,A,I,C,B){const{scene:E,camera:i}=this,{downsamplingMaterial:D,upsamplingMaterial:o}=this,{downsamplingMipmaps:S,upsamplingMipmaps:h}=this;let a=A;this.fullscreenMaterial=D;for(let K=0,U=S.length;K<U;++K){const s=S[K];D.setSize(a.width,a.height),D.inputBuffer=a.texture,g.setRenderTarget(s),g.render(E,i),a=s}this.fullscreenMaterial=o;for(let K=h.length-1;K>=0;--K){const U=h[K];o.setSize(a.width,a.height),o.inputBuffer=a.texture,o.supportBuffer=S[K].texture,g.setRenderTarget(U),g.render(E,i),a=U}}setSize(g,A){const I=this.resolution;I.set(g,A);let C=I.width,B=I.height;for(let E=0,i=this.downsamplingMipmaps.length;E<i;++E)C=Math.round(C*.5),B=Math.round(B*.5),this.downsamplingMipmaps[E].setSize(C,B),E<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[E].setSize(C,B)}initialize(g,A,I){if(I!==void 0){const C=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const B of C)B.texture.type=I;if(I!==mA)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(g!==null&&g.outputColorSpace===z)for(const B of C)B.texture.colorSpace=z}}dispose(){super.dispose();for(const g of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))g.dispose()}},nD=class extends jg{constructor(g,A,{attributes:I=bA.NONE,blendFunction:C=L.NORMAL,defines:B=new Map,uniforms:E=new Map,extensions:i=null,vertexShader:D=null}={}){super(),this.name=g,this.renderer=null,this.attributes=I,this.fragmentShader=A,this.vertexShader=D,this.defines=B,this.uniforms=E,this.extensions=i,this.blendMode=new yD(C),this.blendMode.addEventListener("change",o=>this.setChanged()),this._inputColorSpace=ZB,this._outputColorSpace=bB}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(g){this._inputColorSpace=g,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(g){this._outputColorSpace=g,this.setChanged()}set mainScene(g){}set mainCamera(g){}getName(){return this.name}setRenderer(g){this.renderer=g}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(g){this.attributes=g,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(g){this.fragmentShader=g,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(g){this.vertexShader=g,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(g,A=PI){}update(g,A,I){}setSize(g,A){}initialize(g,A,I){}dispose(){for(const g of Object.keys(this)){const A=this[g];(A instanceof pA||A instanceof TB||A instanceof OB||A instanceof DA)&&this[g].dispose()}}},dD=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
`,I.uvTransformation=!0),B!==null&&/mainSupport/.test(B)){const J=/mainSupport *\([\w\s]*?uv\s*?\)/.test(B);U+=`	${g}MainSupport(`,U+=J?`vUv);
`:`);
	`:`color0 = sRGBToLinear(color0);
	`),A.outputColorSpace!==bB?I.colorSpace=A.outputColorSpace:A.inputColorSpace!==null&&(I.colorSpace=A.inputColorSpace);const J=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;a+=`${g}MainImage(color0, UV, `,I.attributes&bA.DEPTH&&J.test(C)&&(a+="depth, ",I.readDepth=!0),a+=`color1);
	`;const y=g+"BlendOpacity";I.uniforms.set(y,R.opacity),a+=`color0 = blend${R.blendFunction}(color0, color1, ${y});

	`,S+=`uniform float ${y};

`}if(S+=C+`
`,B!==null&&(K+=B+`

	`),g.uvTransformation?(B=`vec2 transformedUv = vUv;