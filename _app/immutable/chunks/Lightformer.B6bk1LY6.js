import"./disclose-version.Bg9kRutz.js";import{b as rt,p as Qt,i as H,f as F,a as Yt,a2 as $,k as vt,s as tt,u as nt,a6 as Et,a5 as It}from"./index-client.jNqP-yUK.js";import{a as R,t as ut,c as pt}from"./template.dxe18lOp.js";import{i as Xt}from"./if.D7726KUx.js";import{c as it}from"./svelte-component.D4HszQ7S.js";import{b as Wt,p as z,c as Ut,a as lt,s as Zt,r as te}from"./props.6OPtkU23.js";import{b as ee}from"./this.6e5kai16.js";import{a5 as ne,V as h,y as ie,Q as k,a6 as oe,a3 as Bt,O as At,v as Nt,a7 as se,g as Z,a8 as Q,q as Ht,F as Ct,M as a,a9 as wt,aa as B,ab as ae,ac as ot,ad as re,D as Vt,ae as le,af as ce,n as zt,u as Jt,ag as he,h as pe,o as ue,d as G,s as Kt,c as de,L as jt,G as me}from"./T.Hd49IpQl.js";import"./index.bsilHA1h.js";import{u as fe}from"./useEnvironment.svelte.DMTbIc-X.js";import{w as Dt}from"./index.DevEpOn0.js";import{u as we}from"./useControlsContext.Bz5rcaB8.js";import"./legacy.CtaTdtmd.js";const V=new ne,E=new h,N=new h,d=new k,Lt={X:new h(1,0,0),Y:new h(0,1,0),Z:new h(0,0,1)},Pt={type:"change"},Ot={type:"mouseDown",mode:null},kt={type:"mouseUp",mode:null},Ft={type:"objectChange"};class ye extends ie{constructor(e,n=null){super(void 0,n);const o=new xe(this);this._root=o;const i=new Se;this._gizmo=i,o.add(i);const r=new Me;this._plane=r,o.add(r);const t=this;function s(f,_){let X=_;Object.defineProperty(t,f,{get:function(){return X!==void 0?X:_},set:function(S){X!==S&&(X=S,r[f]=S,i[f]=S,t.dispatchEvent({type:f+"-changed",value:S}),t.dispatchEvent(Pt))}}),t[f]=_,r[f]=_,i[f]=_}s("camera",e),s("object",void 0),s("enabled",!0),s("axis",null),s("mode","translate"),s("translationSnap",null),s("rotationSnap",null),s("scaleSnap",null),s("space","world"),s("size",1),s("dragging",!1),s("showX",!0),s("showY",!0),s("showZ",!0),s("minX",-1/0),s("maxX",1/0),s("minY",-1/0),s("maxY",1/0),s("minZ",-1/0),s("maxZ",1/0);const w=new h,M=new h,I=new k,v=new k,b=new h,L=new k,C=new h,y=new h,P=new h,x=0,m=new h;s("worldPosition",w),s("worldPositionStart",M),s("worldQuaternion",I),s("worldQuaternionStart",v),s("cameraPosition",b),s("cameraQuaternion",L),s("pointStart",C),s("pointEnd",y),s("rotationAxis",P),s("rotationAngle",x),s("eye",m),this._offset=new h,this._startNorm=new h,this._endNorm=new h,this._cameraScale=new h,this._parentPosition=new h,this._parentQuaternion=new k,this._parentQuaternionInv=new k,this._parentScale=new h,this._worldScaleStart=new h,this._worldQuaternionInv=new k,this._worldScale=new h,this._positionStart=new h,this._quaternionStart=new k,this._scaleStart=new h,this._getPointer=_e.bind(this),this._onPointerDown=ge.bind(this),this._onPointerHover=be.bind(this),this._onPointerMove=ve.bind(this),this._onPointerUp=Pe.bind(this),n!==null&&this.connect()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&V.setFromCamera(e,this.camera);const n=xt(this._gizmo.picker[this.mode],V);n?this.axis=n.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&V.setFromCamera(e,this.camera);const n=xt(this._plane,V,!0);n&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(n.point).sub(this.worldPositionStart)),this.dragging=!0,Ot.mode=this.mode,this.dispatchEvent(Ot)}}pointerMove(e){const n=this.axis,o=this.mode,i=this.object;let r=this.space;if(o==="scale"?r="local":(n==="E"||n==="XYZE"||n==="XYZ")&&(r="world"),i===void 0||n===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&V.setFromCamera(e,this.camera);const t=xt(this._plane,V,!0);if(t){if(this.pointEnd.copy(t.point).sub(this.worldPositionStart),o==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),r==="local"&&n!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),n.indexOf("X")===-1&&(this._offset.x=0),n.indexOf("Y")===-1&&(this._offset.y=0),n.indexOf("Z")===-1&&(this._offset.z=0),r==="local"&&n!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),i.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(r==="local"&&(i.position.applyQuaternion(d.copy(this._quaternionStart).invert()),n.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(this._quaternionStart)),r==="world"&&(i.parent&&i.position.add(E.setFromMatrixPosition(i.parent.matrixWorld)),n.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(E.setFromMatrixPosition(i.parent.matrixWorld)))),i.position.x=Math.max(this.minX,Math.min(this.maxX,i.position.x)),i.position.y=Math.max(this.minY,Math.min(this.maxY,i.position.y)),i.position.z=Math.max(this.minZ,Math.min(this.maxZ,i.position.z));else if(o==="scale"){if(n.search("XYZ")!==-1){let s=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(s*=-1),N.set(s,s,s)}else E.copy(this.pointStart),N.copy(this.pointEnd),E.applyQuaternion(this._worldQuaternionInv),N.applyQuaternion(this._worldQuaternionInv),N.divide(E),n.search("X")===-1&&(N.x=1),n.search("Y")===-1&&(N.y=1),n.search("Z")===-1&&(N.z=1);i.scale.copy(this._scaleStart).multiply(N),this.scaleSnap&&(n.search("X")!==-1&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Y")!==-1&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Z")!==-1&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(o==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const s=20/this.worldPosition.distanceTo(E.setFromMatrixPosition(this.camera.matrixWorld));let w=!1;n==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(E.copy(this.rotationAxis).cross(this.eye))*s):(n==="X"||n==="Y"||n==="Z")&&(this.rotationAxis.copy(Lt[n]),E.copy(Lt[n]),r==="local"&&E.applyQuaternion(this.worldQuaternion),E.cross(this.eye),E.length()===0?w=!0:this.rotationAngle=this._offset.dot(E.normalize())*s),(n==="E"||w)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),r==="local"&&n!=="E"&&n!=="XYZE"?(i.quaternion.copy(this._quaternionStart),i.quaternion.multiply(d.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),i.quaternion.copy(d.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),i.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Pt),this.dispatchEvent(Ft)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(kt.mode=this.mode,this.dispatchEvent(kt)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Pt),this.dispatchEvent(Ft),this.pointStart.copy(this.pointEnd))}getRaycaster(){return V}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function _e(c){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:c.button};{const e=this.domElement.getBoundingClientRect();return{x:(c.clientX-e.left)/e.width*2-1,y:-(c.clientY-e.top)/e.height*2+1,button:c.button}}}function be(c){if(this.enabled)switch(c.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(c));break}}function ge(c){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(c.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(c)),this.pointerDown(this._getPointer(c)))}function ve(c){this.enabled&&this.pointerMove(this._getPointer(c))}function Pe(c){this.enabled&&(this.domElement.releasePointerCapture(c.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(c)))}function xt(c,e,n){const o=e.intersectObject(c,!0);for(let i=0;i<o.length;i++)if(o[i].object.visible||n)return o[i];return!1}const yt=new oe,p=new h(0,1,0),Rt=new h(0,0,0),qt=new Bt,_t=new k,gt=new k,O=new h,Gt=new Bt,ct=new h(1,0,0),J=new h(0,1,0),ht=new h(0,0,1),bt=new h,st=new h,at=new h;class xe extends At{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){const n=this.controls;n.object!==void 0&&(n.object.updateMatrixWorld(),n.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):n.object.parent.matrixWorld.decompose(n._parentPosition,n._parentQuaternion,n._parentScale),n.object.matrixWorld.decompose(n.worldPosition,n.worldQuaternion,n._worldScale),n._parentQuaternionInv.copy(n._parentQuaternion).invert(),n._worldQuaternionInv.copy(n.worldQuaternion).invert()),n.camera.updateMatrixWorld(),n.camera.matrixWorld.decompose(n.cameraPosition,n.cameraQuaternion,n._cameraScale),n.camera.isOrthographicCamera?n.camera.getWorldDirection(n.eye).negate():n.eye.copy(n.cameraPosition).sub(n.worldPosition).normalize(),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class Se extends At{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Nt({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=new se({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),o=e.clone();o.opacity=.15;const i=n.clone();i.opacity=.5;const r=e.clone();r.color.setHex(16711680);const t=e.clone();t.color.setHex(65280);const s=e.clone();s.color.setHex(255);const w=e.clone();w.color.setHex(16711680),w.opacity=.5;const M=e.clone();M.color.setHex(65280),M.opacity=.5;const I=e.clone();I.color.setHex(255),I.opacity=.5;const v=e.clone();v.opacity=.25;const b=e.clone();b.color.setHex(16776960),b.opacity=.25,e.clone().color.setHex(16776960);const C=e.clone();C.color.setHex(7895160);const y=new Z(0,.04,.1,12);y.translate(0,.05,0);const P=new Q(.08,.08,.08);P.translate(0,.04,0);const x=new Ht;x.setAttribute("position",new Ct([0,0,0,1,0,0],3));const m=new Z(.0075,.0075,.5,3);m.translate(0,.25,0);function f(g,D){const Y=new ot(g,.0075,3,64,D*Math.PI*2);return Y.rotateY(Math.PI/2),Y.rotateX(Math.PI/2),Y}function _(){const g=new Ht;return g.setAttribute("position",new Ct([0,0,0,1,1,1],3)),g}const X={X:[[new a(y,r),[.5,0,0],[0,0,-Math.PI/2]],[new a(y,r),[-.5,0,0],[0,0,Math.PI/2]],[new a(m,r),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new a(y,t),[0,.5,0]],[new a(y,t),[0,-.5,0],[Math.PI,0,0]],[new a(m,t)]],Z:[[new a(y,s),[0,0,.5],[Math.PI/2,0,0]],[new a(y,s),[0,0,-.5],[-Math.PI/2,0,0]],[new a(m,s),null,[Math.PI/2,0,0]]],XYZ:[[new a(new wt(.1,0),v.clone()),[0,0,0]]],XY:[[new a(new Q(.15,.15,.01),I.clone()),[.15,.15,0]]],YZ:[[new a(new Q(.15,.15,.01),w.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Q(.15,.15,.01),M.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},S={X:[[new a(new Z(.2,0,.6,4),o),[.3,0,0],[0,0,-Math.PI/2]],[new a(new Z(.2,0,.6,4),o),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new a(new Z(.2,0,.6,4),o),[0,.3,0]],[new a(new Z(.2,0,.6,4),o),[0,-.3,0],[0,0,Math.PI]]],Z:[[new a(new Z(.2,0,.6,4),o),[0,0,.3],[Math.PI/2,0,0]],[new a(new Z(.2,0,.6,4),o),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new a(new wt(.2,0),o)]],XY:[[new a(new Q(.2,.2,.01),o),[.15,.15,0]]],YZ:[[new a(new Q(.2,.2,.01),o),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Q(.2,.2,.01),o),[.15,0,.15],[-Math.PI/2,0,0]]]},q={START:[[new a(new wt(.01,2),i),null,null,null,"helper"]],END:[[new a(new wt(.01,2),i),null,null,null,"helper"]],DELTA:[[new B(_(),i),null,null,null,"helper"]],X:[[new B(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new B(x,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new B(x,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},W={XYZE:[[new a(f(.5,1),C),null,[0,Math.PI/2,0]]],X:[[new a(f(.5,.5),r)]],Y:[[new a(f(.5,.5),t),null,[0,0,-Math.PI/2]]],Z:[[new a(f(.5,.5),s),null,[0,Math.PI/2,0]]],E:[[new a(f(.75,1),b),null,[0,Math.PI/2,0]]]},K={AXIS:[[new B(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},et={XYZE:[[new a(new ae(.25,10,8),o)]],X:[[new a(new ot(.5,.1,4,24),o),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new a(new ot(.5,.1,4,24),o),[0,0,0],[Math.PI/2,0,0]]],Z:[[new a(new ot(.5,.1,4,24),o),[0,0,0],[0,0,-Math.PI/2]]],E:[[new a(new ot(.75,.1,2,24),o)]]},l={X:[[new a(P,r),[.5,0,0],[0,0,-Math.PI/2]],[new a(m,r),[0,0,0],[0,0,-Math.PI/2]],[new a(P,r),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new a(P,t),[0,.5,0]],[new a(m,t)],[new a(P,t),[0,-.5,0],[0,0,Math.PI]]],Z:[[new a(P,s),[0,0,.5],[Math.PI/2,0,0]],[new a(m,s),[0,0,0],[Math.PI/2,0,0]],[new a(P,s),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new a(new Q(.15,.15,.01),I),[.15,.15,0]]],YZ:[[new a(new Q(.15,.15,.01),w),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Q(.15,.15,.01),M),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new a(new Q(.1,.1,.1),v.clone())]]},u={X:[[new a(new Z(.2,0,.6,4),o),[.3,0,0],[0,0,-Math.PI/2]],[new a(new Z(.2,0,.6,4),o),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new a(new Z(.2,0,.6,4),o),[0,.3,0]],[new a(new Z(.2,0,.6,4),o),[0,-.3,0],[0,0,Math.PI]]],Z:[[new a(new Z(.2,0,.6,4),o),[0,0,.3],[Math.PI/2,0,0]],[new a(new Z(.2,0,.6,4),o),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new a(new Q(.2,.2,.01),o),[.15,.15,0]]],YZ:[[new a(new Q(.2,.2,.01),o),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Q(.2,.2,.01),o),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new a(new Q(.2,.2,.2),o),[0,0,0]]]},j={X:[[new B(x,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new B(x,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new B(x,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function A(g){const D=new At;for(const Y in g)for(let U=g[Y].length;U--;){const T=g[Y][U][0].clone(),dt=g[Y][U][1],mt=g[Y][U][2],ft=g[Y][U][3],$t=g[Y][U][4];T.name=Y,T.tag=$t,dt&&T.position.set(dt[0],dt[1],dt[2]),mt&&T.rotation.set(mt[0],mt[1],mt[2]),ft&&T.scale.set(ft[0],ft[1],ft[2]),T.updateMatrix();const Tt=T.geometry.clone();Tt.applyMatrix4(T.matrix),T.geometry=Tt,T.renderOrder=1/0,T.position.set(0,0,0),T.rotation.set(0,0,0),T.scale.set(1,1,1),D.add(T)}return D}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=A(X)),this.add(this.gizmo.rotate=A(W)),this.add(this.gizmo.scale=A(l)),this.add(this.picker.translate=A(S)),this.add(this.picker.rotate=A(et)),this.add(this.picker.scale=A(u)),this.add(this.helper.translate=A(q)),this.add(this.helper.rotate=A(K)),this.add(this.helper.scale=A(j)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const o=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:gt;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let i=[];i=i.concat(this.picker[this.mode].children),i=i.concat(this.gizmo[this.mode].children),i=i.concat(this.helper[this.mode].children);for(let r=0;r<i.length;r++){const t=i[r];t.visible=!0,t.rotation.set(0,0,0),t.position.copy(this.worldPosition);let s;if(this.camera.isOrthographicCamera?s=(this.camera.top-this.camera.bottom)/this.camera.zoom:s=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),t.scale.set(1,1,1).multiplyScalar(s*this.size/4),t.tag==="helper"){t.visible=!1,t.name==="AXIS"?(t.visible=!!this.axis,this.axis==="X"&&(d.setFromEuler(yt.set(0,0,0)),t.quaternion.copy(o).multiply(d),Math.abs(p.copy(ct).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="Y"&&(d.setFromEuler(yt.set(0,0,Math.PI/2)),t.quaternion.copy(o).multiply(d),Math.abs(p.copy(J).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="Z"&&(d.setFromEuler(yt.set(0,Math.PI/2,0)),t.quaternion.copy(o).multiply(d),Math.abs(p.copy(ht).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="XYZE"&&(d.setFromEuler(yt.set(0,Math.PI/2,0)),p.copy(this.rotationAxis),t.quaternion.setFromRotationMatrix(qt.lookAt(Rt,p,J)),t.quaternion.multiply(d),t.visible=this.dragging),this.axis==="E"&&(t.visible=!1)):t.name==="START"?(t.position.copy(this.worldPositionStart),t.visible=this.dragging):t.name==="END"?(t.position.copy(this.worldPosition),t.visible=this.dragging):t.name==="DELTA"?(t.position.copy(this.worldPositionStart),t.quaternion.copy(this.worldQuaternionStart),E.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),E.applyQuaternion(this.worldQuaternionStart.clone().invert()),t.scale.copy(E),t.visible=this.dragging):(t.quaternion.copy(o),this.dragging?t.position.copy(this.worldPositionStart):t.position.copy(this.worldPosition),this.axis&&(t.visible=this.axis.search(t.name)!==-1));continue}t.quaternion.copy(o),this.mode==="translate"||this.mode==="scale"?(t.name==="X"&&Math.abs(p.copy(ct).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="Y"&&Math.abs(p.copy(J).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="Z"&&Math.abs(p.copy(ht).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="XY"&&Math.abs(p.copy(ht).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="YZ"&&Math.abs(p.copy(ct).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="XZ"&&Math.abs(p.copy(J).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1)):this.mode==="rotate"&&(_t.copy(o),p.copy(this.eye).applyQuaternion(d.copy(o).invert()),t.name.search("E")!==-1&&t.quaternion.setFromRotationMatrix(qt.lookAt(this.eye,Rt,J)),t.name==="X"&&(d.setFromAxisAngle(ct,Math.atan2(-p.y,p.z)),d.multiplyQuaternions(_t,d),t.quaternion.copy(d)),t.name==="Y"&&(d.setFromAxisAngle(J,Math.atan2(p.x,p.z)),d.multiplyQuaternions(_t,d),t.quaternion.copy(d)),t.name==="Z"&&(d.setFromAxisAngle(ht,Math.atan2(p.y,p.x)),d.multiplyQuaternions(_t,d),t.quaternion.copy(d))),t.visible=t.visible&&(t.name.indexOf("X")===-1||this.showX),t.visible=t.visible&&(t.name.indexOf("Y")===-1||this.showY),t.visible=t.visible&&(t.name.indexOf("Z")===-1||this.showZ),t.visible=t.visible&&(t.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),t.material._color=t.material._color||t.material.color.clone(),t.material._opacity=t.material._opacity||t.material.opacity,t.material.color.copy(t.material._color),t.material.opacity=t.material._opacity,this.enabled&&this.axis&&(t.name===this.axis||this.axis.split("").some(function(w){return t.name===w}))&&(t.material.color.setHex(16776960),t.material.opacity=1)}super.updateMatrixWorld(e)}}class Me extends a{constructor(){super(new re(1e5,1e5,2,2),new Nt({visible:!1,wireframe:!0,side:Vt,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let n=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(n="local"),bt.copy(ct).applyQuaternion(n==="local"?this.worldQuaternion:gt),st.copy(J).applyQuaternion(n==="local"?this.worldQuaternion:gt),at.copy(ht).applyQuaternion(n==="local"?this.worldQuaternion:gt),p.copy(st),this.mode){case"translate":case"scale":switch(this.axis){case"X":p.copy(this.eye).cross(bt),O.copy(bt).cross(p);break;case"Y":p.copy(this.eye).cross(st),O.copy(st).cross(p);break;case"Z":p.copy(this.eye).cross(at),O.copy(at).cross(p);break;case"XY":O.copy(at);break;case"YZ":O.copy(bt);break;case"XZ":p.copy(at),O.copy(st);break;case"XYZ":case"E":O.set(0,0,0);break}break;case"rotate":default:O.set(0,0,0)}O.length()===0?this.quaternion.copy(this.cameraQuaternion):(Gt.lookAt(E.set(0,0,0),O,p),this.quaternion.setFromRotationMatrix(Gt)),super.updateMatrixWorld(e)}}const Ee=1,St=1e3,Ie=256,Xe=(c=()=>St,e=()=>St,n=()=>Ie)=>{const o=new le(n()),i=new ce(Ee,St,o);return rt(()=>{const r=n();o.setSize(r,r)}),rt(()=>{const r=c();for(const t of i.children)zt(t,"PerspectiveCamera")&&(t.near=r,t.updateProjectionMatrix())}),rt(()=>{const r=e();for(const t of i.children)zt(t,"PerspectiveCamera")&&(t.far=r,t.updateProjectionMatrix())}),rt(()=>()=>{o.dispose()}),{camera:i,renderTarget:o}};var Ae=ut("<!> <!>",1);function Qe(c,e){Qt(e,!0);const n=Wt(),o=()=>Ut(x,"$started",n),i=Jt();let r=z(e,"far",3,1e3),t=z(e,"frames",3,1/0),s=z(e,"near",3,.1),w=z(e,"resolution",3,256),M=z(e,"scene",19,()=>i.scene);const{scene:I}=he(),{camera:v,renderTarget:b}=Xe(()=>s(),()=>r(),()=>w());fe({texture:b.texture,get scene(){return M()},get isBackground(){return e.isBackground}});const L=()=>{v.update(i.renderer,I)};let C=0;const{start:y,stop:P,started:x}=pe(()=>{var _;C<t()?(L(),C+=1):(P(),(_=e.onupdatestop)==null||_.call(e))},{autoStart:!1}),m=()=>{var _,X;o()&&(P(),(_=e.onupdatestop)==null||_.call(e)),C=0,y(),(X=e.onupdatestart)==null||X.call(e)};ue(()=>[r(),s(),t(),w()],m);var f=vt(()=>e.visible?void 0:!1);return G(c,{is:I,get attach(){return H(f)},children:(_,X)=>{var S=Ae(),q=F(S);G(q,{is:v});var W=tt(q,2);Kt(W,()=>e.children??$,()=>({camera:v,renderTarget:b,restart:m,update:L})),R(_,S)},$$slots:{default:!0}}),Yt({camera:v,renderTarget:b,update:L,restart:m})}var Ye=ut("<!> <!>",1);function Te(c,e){Qt(e,!0);const n=Wt(),o=()=>Ut(M,"$camera",n);let i=z(e,"autoPauseOrbitControls",3,!0),r=z(e,"autoPauseTrackballControls",3,!0),t=z(e,"controls",15),s=z(e,"group",15),w=te(e,["$$slots","$$events","$$legacy","autoPauseOrbitControls","autoPauseTrackballControls","object","controls","group","children"]);const{camera:M,dom:I,invalidate:v,scene:b}=Jt(),{orbitControls:L,trackballControls:C}=we(),y=de(!1),P=Dt(i()??!0);nt(()=>P.set(i()??!0));const x=Dt(r()??!0);nt(()=>x.set(r()??!0)),jt([L,y,P],([l,u,j])=>{if(!(!l||!l.enabled&&u))return l.enabled=!(u&&j),()=>{l.enabled=!0}}),jt([C,y,x],([l,u,j])=>{if(!(!l||!l.enabled&&u))return l.enabled=!(u&&j),()=>{l.enabled=!0}});const m=new me;let f=vt(()=>new ye(o(),I));nt(()=>{var l;return(l=H(f))==null||l.attach(e.object??m),()=>{var u;return(u=H(f))==null?void 0:u.detach()}});const _=["enabled","axis","mode","translationSnap","rotationSnap","scaleSnap","space","size","showX","showY","showZ","visible","onmouseDown","onmouseUp","onobjectChange"];let X=Et(lt({})),S=Et(lt({}));nt(()=>{It(X,lt({})),It(S,lt({})),Object.keys(w).forEach(l=>{nt(()=>{_.includes(l)?H(X)[l]=w[l]:H(S)[l]=w[l]})})});const q=l=>{var u;v(),H(f).dragging&&!y.current?y.set(!0):!H(f).dragging&&y.current&&y.set(!1),(u=e.onchange)==null||u.call(e,l)};var W=Ye(),K=F(W);G(K,Zt({get is(){return H(f)},onchange:q},()=>H(X),{attach:({ref:l})=>{const u=l.getHelper();return b.add(u),()=>{b.remove(u)}},dispose:!1,oncreate:l=>()=>l.dispose(),get ref(){return t()},set ref(l){t(l)}}));var et=tt(K,2);G(et,Zt({is:m},()=>H(S),{get ref(){return s()},set ref(l){s(l)},children:(l,u)=>{var j=pt(),A=F(j);{var g=D=>{var Y=pt(),U=F(Y);Kt(U,()=>e.children,()=>({ref:m})),R(D,Y)};Xt(A,D=>{e.children&&D(g)})}R(l,j)},$$slots:{default:!0}})),R(c,W),Yt()}const Mt=(c,e=$,n=$,o=$,i=$,r=$)=>{var t=pt(),s=F(t);it(s,()=>G.Group,(w,M)=>{M(w,{get position(){return i()},children:(v,b)=>{let L=()=>b==null?void 0:b().ref;var C=He(),y=F(C);{var P=m=>{Te(m,{get object(){return L()}})};Xt(y,m=>{r()&&m(P)})}var x=tt(y,2);it(x,()=>G.Mesh,(m,f)=>{f(m,{lookAt:[0,0,0],children:(_,X)=>{var S=Ze(),q=F(S);{var W=l=>{var u=pt(),j=F(u),A=vt(()=>[o()/2]);it(j,()=>G.CircleGeometry,(g,D)=>{D(g,{get args(){return H(A)}})}),R(l,u)},K=l=>{var u=pt(),j=F(u),A=vt(()=>[o(),o()]);it(j,()=>G.PlaneGeometry,(g,D)=>{D(g,{get args(){return H(A)}})}),R(l,u)};Xt(q,l=>{n()==="circle"?l(W):l(K,!1)})}var et=tt(q,2);it(et,()=>G.MeshBasicMaterial,(l,u)=>{u(l,{get color(){return e()},side:Vt})}),R(_,S)},$$slots:{default:!0}})}),R(v,C)},$$slots:{default:!0}})}),R(c,t)};var Ze=ut("<!> <!>",1),He=ut("<!> <!>",1),Ce=ut("<!> <!> <!>",1);function Ne(c,e){Qt(e,!0);let n=z(e,"color1",3,"#FF4F4F"),o=z(e,"color2",3,"#FFD0CB"),i=z(e,"color3",3,"#2223FF"),r=z(e,"debug",3,!1),t=Et(void 0);rt(()=>{var s;n(),o(),i(),(s=H(t))==null||s.update()}),ee(Qe(c,{get visible(){return r()},children:(s,w)=>{var M=Ce(),I=F(M);Mt(I,n,()=>"plane",()=>20,()=>[0,0,-20],r);var v=tt(I,2);Mt(v,o,()=>"circle",()=>5,()=>[0,5,0],r);var b=tt(v,2);Mt(b,i,()=>"plane",()=>8,()=>[-3,0,4],r),R(s,M)},$$slots:{default:!0}}),s=>It(t,lt(s)),()=>H(t)),Yt()}export{Ne as L};
