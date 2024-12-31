import"./disclose-version.Bg9kRutz.js";import{a6 as dt,d as J,a5 as pt,k as v,p as Yt,f as F,a as Tt,a2 as et,m as xt,s as nt,u as ot}from"./index-client.DzQlphmH.js";import{a as R,t as mt,c as ut}from"./template.CgCchT00.js";import{i as Xt}from"./if.Cf1I8q-8.js";import{c as st}from"./svelte-component.D0WKzo0g.js";import{a as $,b as Ut,p as z,c as Nt,s as Ct,r as ee}from"./props.DHXOHPV0.js";import{b as ne}from"./this.C6bARg1Q.js";import{a5 as ie,V as h,x as oe,Q as O,a6 as se,a3 as Vt,O as At,t as Kt,a7 as ae,g as H,a8 as Y,p as zt,F as kt,M as a,a9 as _t,aa as U,ab as re,ac as at,ad as le,D as Jt,i as Zt,N as Qt,ae as ce,af as he,n as jt,ag as ue,u as de,d as G,s as $t,c as pe,K as Dt,G as me}from"./T.D9_Xg1XW.js";import"./index.DsEVf3p4.js";import{w as Lt}from"./index.DdXxZHS9.js";import{u as fe}from"./useControlsContext.DLeisyfz.js";import"./legacy.CtaTdtmd.js";const V=new ie,I=new h,N=new h,p=new O,Ot={X:new h(1,0,0),Y:new h(0,1,0),Z:new h(0,0,1)},St={type:"change"},Ft={type:"mouseDown",mode:null},Rt={type:"mouseUp",mode:null},qt={type:"objectChange"};class we extends oe{constructor(e,n=null){super(void 0,n);const o=new Pe(this);this._root=o;const i=new xe;this._gizmo=i,o.add(i);const r=new Se;this._plane=r,o.add(r);const t=this;function s(f,_){let A=_;Object.defineProperty(t,f,{get:function(){return A!==void 0?A:_},set:function(M){A!==M&&(A=M,r[f]=M,i[f]=M,t.dispatchEvent({type:f+"-changed",value:M}),t.dispatchEvent(St))}}),t[f]=_,r[f]=_,i[f]=_}s("camera",e),s("object",void 0),s("enabled",!0),s("axis",null),s("mode","translate"),s("translationSnap",null),s("rotationSnap",null),s("scaleSnap",null),s("space","world"),s("size",1),s("dragging",!1),s("showX",!0),s("showY",!0),s("showZ",!0),s("minX",-1/0),s("maxX",1/0),s("minY",-1/0),s("maxY",1/0),s("minZ",-1/0),s("maxZ",1/0);const w=new h,E=new h,X=new O,P=new O,b=new h,D=new O,C=new h,y=new h,x=new h,S=0,m=new h;s("worldPosition",w),s("worldPositionStart",E),s("worldQuaternion",X),s("worldQuaternionStart",P),s("cameraPosition",b),s("cameraQuaternion",D),s("pointStart",C),s("pointEnd",y),s("rotationAxis",x),s("rotationAngle",S),s("eye",m),this._offset=new h,this._startNorm=new h,this._endNorm=new h,this._cameraScale=new h,this._parentPosition=new h,this._parentQuaternion=new O,this._parentQuaternionInv=new O,this._parentScale=new h,this._worldScaleStart=new h,this._worldQuaternionInv=new O,this._worldScale=new h,this._positionStart=new h,this._quaternionStart=new O,this._scaleStart=new h,this._getPointer=ye.bind(this),this._onPointerDown=be.bind(this),this._onPointerHover=_e.bind(this),this._onPointerMove=ge.bind(this),this._onPointerUp=ve.bind(this),n!==null&&this.connect()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(e){if(this.object===void 0||this.dragging===!0)return;e!==null&&V.setFromCamera(e,this.camera);const n=Mt(this._gizmo.picker[this.mode],V);n?this.axis=n.object.name:this.axis=null}pointerDown(e){if(!(this.object===void 0||this.dragging===!0||e!=null&&e.button!==0)&&this.axis!==null){e!==null&&V.setFromCamera(e,this.camera);const n=Mt(this._plane,V,!0);n&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(n.point).sub(this.worldPositionStart)),this.dragging=!0,Ft.mode=this.mode,this.dispatchEvent(Ft)}}pointerMove(e){const n=this.axis,o=this.mode,i=this.object;let r=this.space;if(o==="scale"?r="local":(n==="E"||n==="XYZE"||n==="XYZ")&&(r="world"),i===void 0||n===null||this.dragging===!1||e!==null&&e.button!==-1)return;e!==null&&V.setFromCamera(e,this.camera);const t=Mt(this._plane,V,!0);if(t){if(this.pointEnd.copy(t.point).sub(this.worldPositionStart),o==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),r==="local"&&n!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),n.indexOf("X")===-1&&(this._offset.x=0),n.indexOf("Y")===-1&&(this._offset.y=0),n.indexOf("Z")===-1&&(this._offset.z=0),r==="local"&&n!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),i.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(r==="local"&&(i.position.applyQuaternion(p.copy(this._quaternionStart).invert()),n.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.position.applyQuaternion(this._quaternionStart)),r==="world"&&(i.parent&&i.position.add(I.setFromMatrixPosition(i.parent.matrixWorld)),n.search("X")!==-1&&(i.position.x=Math.round(i.position.x/this.translationSnap)*this.translationSnap),n.search("Y")!==-1&&(i.position.y=Math.round(i.position.y/this.translationSnap)*this.translationSnap),n.search("Z")!==-1&&(i.position.z=Math.round(i.position.z/this.translationSnap)*this.translationSnap),i.parent&&i.position.sub(I.setFromMatrixPosition(i.parent.matrixWorld)))),i.position.x=Math.max(this.minX,Math.min(this.maxX,i.position.x)),i.position.y=Math.max(this.minY,Math.min(this.maxY,i.position.y)),i.position.z=Math.max(this.minZ,Math.min(this.maxZ,i.position.z));else if(o==="scale"){if(n.search("XYZ")!==-1){let s=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(s*=-1),N.set(s,s,s)}else I.copy(this.pointStart),N.copy(this.pointEnd),I.applyQuaternion(this._worldQuaternionInv),N.applyQuaternion(this._worldQuaternionInv),N.divide(I),n.search("X")===-1&&(N.x=1),n.search("Y")===-1&&(N.y=1),n.search("Z")===-1&&(N.z=1);i.scale.copy(this._scaleStart).multiply(N),this.scaleSnap&&(n.search("X")!==-1&&(i.scale.x=Math.round(i.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Y")!==-1&&(i.scale.y=Math.round(i.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),n.search("Z")!==-1&&(i.scale.z=Math.round(i.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(o==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const s=20/this.worldPosition.distanceTo(I.setFromMatrixPosition(this.camera.matrixWorld));let w=!1;n==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(I.copy(this.rotationAxis).cross(this.eye))*s):(n==="X"||n==="Y"||n==="Z")&&(this.rotationAxis.copy(Ot[n]),I.copy(Ot[n]),r==="local"&&I.applyQuaternion(this.worldQuaternion),I.cross(this.eye),I.length()===0?w=!0:this.rotationAngle=this._offset.dot(I.normalize())*s),(n==="E"||w)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),r==="local"&&n!=="E"&&n!=="XYZE"?(i.quaternion.copy(this._quaternionStart),i.quaternion.multiply(p.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),i.quaternion.copy(p.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),i.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(St),this.dispatchEvent(qt)}}pointerUp(e){e!==null&&e.button!==0||(this.dragging&&this.axis!==null&&(Rt.mode=this.mode,this.dispatchEvent(Rt)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(e){return this.object=e,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(St),this.dispatchEvent(qt),this.pointStart.copy(this.pointEnd))}getRaycaster(){return V}getMode(){return this.mode}setMode(e){this.mode=e}setTranslationSnap(e){this.translationSnap=e}setRotationSnap(e){this.rotationSnap=e}setScaleSnap(e){this.scaleSnap=e}setSize(e){this.size=e}setSpace(e){this.space=e}}function ye(l){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:l.button};{const e=this.domElement.getBoundingClientRect();return{x:(l.clientX-e.left)/e.width*2-1,y:-(l.clientY-e.top)/e.height*2+1,button:l.button}}}function _e(l){if(this.enabled)switch(l.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(l));break}}function be(l){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(l.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(l)),this.pointerDown(this._getPointer(l)))}function ge(l){this.enabled&&this.pointerMove(this._getPointer(l))}function ve(l){this.enabled&&(this.domElement.releasePointerCapture(l.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(l)))}function Mt(l,e,n){const o=e.intersectObject(l,!0);for(let i=0;i<o.length;i++)if(o[i].object.visible||n)return o[i];return!1}const bt=new se,u=new h(0,1,0),Gt=new h(0,0,0),Wt=new Vt,gt=new O,Pt=new O,L=new h,Bt=new Vt,ct=new h(1,0,0),K=new h(0,1,0),ht=new h(0,0,1),vt=new h,rt=new h,lt=new h;class Pe extends At{constructor(e){super(),this.isTransformControlsRoot=!0,this.controls=e,this.visible=!1}updateMatrixWorld(e){const n=this.controls;n.object!==void 0&&(n.object.updateMatrixWorld(),n.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):n.object.parent.matrixWorld.decompose(n._parentPosition,n._parentQuaternion,n._parentScale),n.object.matrixWorld.decompose(n.worldPosition,n.worldQuaternion,n._worldScale),n._parentQuaternionInv.copy(n._parentQuaternion).invert(),n._worldQuaternionInv.copy(n.worldQuaternion).invert()),n.camera.updateMatrixWorld(),n.camera.matrixWorld.decompose(n.cameraPosition,n.cameraQuaternion,n._cameraScale),n.camera.isOrthographicCamera?n.camera.getWorldDirection(n.eye).negate():n.eye.copy(n.cameraPosition).sub(n.worldPosition).normalize(),super.updateMatrixWorld(e)}dispose(){this.traverse(function(e){e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()})}}class xe extends At{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const e=new Kt({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),n=new ae({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),o=e.clone();o.opacity=.15;const i=n.clone();i.opacity=.5;const r=e.clone();r.color.setHex(16711680);const t=e.clone();t.color.setHex(65280);const s=e.clone();s.color.setHex(255);const w=e.clone();w.color.setHex(16711680),w.opacity=.5;const E=e.clone();E.color.setHex(65280),E.opacity=.5;const X=e.clone();X.color.setHex(255),X.opacity=.5;const P=e.clone();P.opacity=.25;const b=e.clone();b.color.setHex(16776960),b.opacity=.25,e.clone().color.setHex(16776960);const C=e.clone();C.color.setHex(7895160);const y=new H(0,.04,.1,12);y.translate(0,.05,0);const x=new Y(.08,.08,.08);x.translate(0,.04,0);const S=new zt;S.setAttribute("position",new kt([0,0,0,1,0,0],3));const m=new H(.0075,.0075,.5,3);m.translate(0,.25,0);function f(g,j){const T=new at(g,.0075,3,64,j*Math.PI*2);return T.rotateY(Math.PI/2),T.rotateX(Math.PI/2),T}function _(){const g=new zt;return g.setAttribute("position",new kt([0,0,0,1,1,1],3)),g}const A={X:[[new a(y,r),[.5,0,0],[0,0,-Math.PI/2]],[new a(y,r),[-.5,0,0],[0,0,Math.PI/2]],[new a(m,r),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new a(y,t),[0,.5,0]],[new a(y,t),[0,-.5,0],[Math.PI,0,0]],[new a(m,t)]],Z:[[new a(y,s),[0,0,.5],[Math.PI/2,0,0]],[new a(y,s),[0,0,-.5],[-Math.PI/2,0,0]],[new a(m,s),null,[Math.PI/2,0,0]]],XYZ:[[new a(new _t(.1,0),P.clone()),[0,0,0]]],XY:[[new a(new Y(.15,.15,.01),X.clone()),[.15,.15,0]]],YZ:[[new a(new Y(.15,.15,.01),w.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Y(.15,.15,.01),E.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},M={X:[[new a(new H(.2,0,.6,4),o),[.3,0,0],[0,0,-Math.PI/2]],[new a(new H(.2,0,.6,4),o),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new a(new H(.2,0,.6,4),o),[0,.3,0]],[new a(new H(.2,0,.6,4),o),[0,-.3,0],[0,0,Math.PI]]],Z:[[new a(new H(.2,0,.6,4),o),[0,0,.3],[Math.PI/2,0,0]],[new a(new H(.2,0,.6,4),o),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new a(new _t(.2,0),o)]],XY:[[new a(new Y(.2,.2,.01),o),[.15,.15,0]]],YZ:[[new a(new Y(.2,.2,.01),o),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Y(.2,.2,.01),o),[.15,0,.15],[-Math.PI/2,0,0]]]},q={START:[[new a(new _t(.01,2),i),null,null,null,"helper"]],END:[[new a(new _t(.01,2),i),null,null,null,"helper"]],DELTA:[[new U(_(),i),null,null,null,"helper"]],X:[[new U(S,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new U(S,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new U(S,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},W={XYZE:[[new a(f(.5,1),C),null,[0,Math.PI/2,0]]],X:[[new a(f(.5,.5),r)]],Y:[[new a(f(.5,.5),t),null,[0,0,-Math.PI/2]]],Z:[[new a(f(.5,.5),s),null,[0,Math.PI/2,0]]],E:[[new a(f(.75,1),b),null,[0,Math.PI/2,0]]]},tt={AXIS:[[new U(S,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},it={XYZE:[[new a(new re(.25,10,8),o)]],X:[[new a(new at(.5,.1,4,24),o),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new a(new at(.5,.1,4,24),o),[0,0,0],[Math.PI/2,0,0]]],Z:[[new a(new at(.5,.1,4,24),o),[0,0,0],[0,0,-Math.PI/2]]],E:[[new a(new at(.75,.1,2,24),o)]]},c={X:[[new a(x,r),[.5,0,0],[0,0,-Math.PI/2]],[new a(m,r),[0,0,0],[0,0,-Math.PI/2]],[new a(x,r),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new a(x,t),[0,.5,0]],[new a(m,t)],[new a(x,t),[0,-.5,0],[0,0,Math.PI]]],Z:[[new a(x,s),[0,0,.5],[Math.PI/2,0,0]],[new a(m,s),[0,0,0],[Math.PI/2,0,0]],[new a(x,s),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new a(new Y(.15,.15,.01),X),[.15,.15,0]]],YZ:[[new a(new Y(.15,.15,.01),w),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Y(.15,.15,.01),E),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new a(new Y(.1,.1,.1),P.clone())]]},d={X:[[new a(new H(.2,0,.6,4),o),[.3,0,0],[0,0,-Math.PI/2]],[new a(new H(.2,0,.6,4),o),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new a(new H(.2,0,.6,4),o),[0,.3,0]],[new a(new H(.2,0,.6,4),o),[0,-.3,0],[0,0,Math.PI]]],Z:[[new a(new H(.2,0,.6,4),o),[0,0,.3],[Math.PI/2,0,0]],[new a(new H(.2,0,.6,4),o),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new a(new Y(.2,.2,.01),o),[.15,.15,0]]],YZ:[[new a(new Y(.2,.2,.01),o),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new a(new Y(.2,.2,.01),o),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new a(new Y(.2,.2,.2),o),[0,0,0]]]},k={X:[[new U(S,i.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new U(S,i.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new U(S,i.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function Q(g){const j=new At;for(const T in g)for(let B=g[T].length;B--;){const Z=g[T][B][0].clone(),ft=g[T][B][1],wt=g[T][B][2],yt=g[T][B][3],te=g[T][B][4];Z.name=T,Z.tag=te,ft&&Z.position.set(ft[0],ft[1],ft[2]),wt&&Z.rotation.set(wt[0],wt[1],wt[2]),yt&&Z.scale.set(yt[0],yt[1],yt[2]),Z.updateMatrix();const Ht=Z.geometry.clone();Ht.applyMatrix4(Z.matrix),Z.geometry=Ht,Z.renderOrder=1/0,Z.position.set(0,0,0),Z.rotation.set(0,0,0),Z.scale.set(1,1,1),j.add(Z)}return j}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=Q(A)),this.add(this.gizmo.rotate=Q(W)),this.add(this.gizmo.scale=Q(c)),this.add(this.picker.translate=Q(M)),this.add(this.picker.rotate=Q(it)),this.add(this.picker.scale=Q(d)),this.add(this.helper.translate=Q(q)),this.add(this.helper.rotate=Q(tt)),this.add(this.helper.scale=Q(k)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(e){const o=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:Pt;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let i=[];i=i.concat(this.picker[this.mode].children),i=i.concat(this.gizmo[this.mode].children),i=i.concat(this.helper[this.mode].children);for(let r=0;r<i.length;r++){const t=i[r];t.visible=!0,t.rotation.set(0,0,0),t.position.copy(this.worldPosition);let s;if(this.camera.isOrthographicCamera?s=(this.camera.top-this.camera.bottom)/this.camera.zoom:s=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),t.scale.set(1,1,1).multiplyScalar(s*this.size/4),t.tag==="helper"){t.visible=!1,t.name==="AXIS"?(t.visible=!!this.axis,this.axis==="X"&&(p.setFromEuler(bt.set(0,0,0)),t.quaternion.copy(o).multiply(p),Math.abs(u.copy(ct).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="Y"&&(p.setFromEuler(bt.set(0,0,Math.PI/2)),t.quaternion.copy(o).multiply(p),Math.abs(u.copy(K).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="Z"&&(p.setFromEuler(bt.set(0,Math.PI/2,0)),t.quaternion.copy(o).multiply(p),Math.abs(u.copy(ht).applyQuaternion(o).dot(this.eye))>.9&&(t.visible=!1)),this.axis==="XYZE"&&(p.setFromEuler(bt.set(0,Math.PI/2,0)),u.copy(this.rotationAxis),t.quaternion.setFromRotationMatrix(Wt.lookAt(Gt,u,K)),t.quaternion.multiply(p),t.visible=this.dragging),this.axis==="E"&&(t.visible=!1)):t.name==="START"?(t.position.copy(this.worldPositionStart),t.visible=this.dragging):t.name==="END"?(t.position.copy(this.worldPosition),t.visible=this.dragging):t.name==="DELTA"?(t.position.copy(this.worldPositionStart),t.quaternion.copy(this.worldQuaternionStart),I.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),I.applyQuaternion(this.worldQuaternionStart.clone().invert()),t.scale.copy(I),t.visible=this.dragging):(t.quaternion.copy(o),this.dragging?t.position.copy(this.worldPositionStart):t.position.copy(this.worldPosition),this.axis&&(t.visible=this.axis.search(t.name)!==-1));continue}t.quaternion.copy(o),this.mode==="translate"||this.mode==="scale"?(t.name==="X"&&Math.abs(u.copy(ct).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="Y"&&Math.abs(u.copy(K).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="Z"&&Math.abs(u.copy(ht).applyQuaternion(o).dot(this.eye))>.99&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="XY"&&Math.abs(u.copy(ht).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="YZ"&&Math.abs(u.copy(ct).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1),t.name==="XZ"&&Math.abs(u.copy(K).applyQuaternion(o).dot(this.eye))<.2&&(t.scale.set(1e-10,1e-10,1e-10),t.visible=!1)):this.mode==="rotate"&&(gt.copy(o),u.copy(this.eye).applyQuaternion(p.copy(o).invert()),t.name.search("E")!==-1&&t.quaternion.setFromRotationMatrix(Wt.lookAt(this.eye,Gt,K)),t.name==="X"&&(p.setFromAxisAngle(ct,Math.atan2(-u.y,u.z)),p.multiplyQuaternions(gt,p),t.quaternion.copy(p)),t.name==="Y"&&(p.setFromAxisAngle(K,Math.atan2(u.x,u.z)),p.multiplyQuaternions(gt,p),t.quaternion.copy(p)),t.name==="Z"&&(p.setFromAxisAngle(ht,Math.atan2(u.y,u.x)),p.multiplyQuaternions(gt,p),t.quaternion.copy(p))),t.visible=t.visible&&(t.name.indexOf("X")===-1||this.showX),t.visible=t.visible&&(t.name.indexOf("Y")===-1||this.showY),t.visible=t.visible&&(t.name.indexOf("Z")===-1||this.showZ),t.visible=t.visible&&(t.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),t.material._color=t.material._color||t.material.color.clone(),t.material._opacity=t.material._opacity||t.material.opacity,t.material.color.copy(t.material._color),t.material.opacity=t.material._opacity,this.enabled&&this.axis&&(t.name===this.axis||this.axis.split("").some(function(w){return t.name===w}))&&(t.material.color.setHex(16776960),t.material.opacity=1)}super.updateMatrixWorld(e)}}class Se extends a{constructor(){super(new le(1e5,1e5,2,2),new Kt({visible:!1,wireframe:!0,side:Jt,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(e){let n=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(n="local"),vt.copy(ct).applyQuaternion(n==="local"?this.worldQuaternion:Pt),rt.copy(K).applyQuaternion(n==="local"?this.worldQuaternion:Pt),lt.copy(ht).applyQuaternion(n==="local"?this.worldQuaternion:Pt),u.copy(rt),this.mode){case"translate":case"scale":switch(this.axis){case"X":u.copy(this.eye).cross(vt),L.copy(vt).cross(u);break;case"Y":u.copy(this.eye).cross(rt),L.copy(rt).cross(u);break;case"Z":u.copy(this.eye).cross(lt),L.copy(lt).cross(u);break;case"XY":L.copy(lt);break;case"YZ":L.copy(vt);break;case"XZ":u.copy(lt),L.copy(rt);break;case"XYZ":case"E":L.set(0,0,0);break}break;case"rotate":default:L.set(0,0,0)}L.length()===0?this.quaternion.copy(this.cameraQuaternion):(Bt.lookAt(I.set(0,0,0),L,u),this.quaternion.setFromRotationMatrix(Bt)),super.updateMatrixWorld(e)}}const Me=l=>{const{invalidate:e}=Zt();Qt(()=>[l.scene],([i])=>{const r=i.background,t=i.environment;return()=>{i.background=r,i.environment=t}});let n=pt(void 0),o=pt(void 0);Qt(()=>[l.scene],([i])=>{dt(n,$(i.background)),dt(o,$(i.environment))}),J(()=>{if(l.isBackground&&l.texture!==void 0)return l.scene.background=l.texture,e(),()=>{v(n)!==void 0&&(l.scene.background=v(n),e())}}),J(()=>{if(l.texture!==void 0)return l.scene.environment=l.texture,e(),()=>{v(o)!==void 0&&(l.scene.environment=v(o),e())}})},Ee=1,Et=1e3,Ie=256,Xe=(l=()=>Et,e=()=>Et,n=()=>Ie)=>{const o=new ce(n()),i=new he(Ee,Et,o);return J(()=>{const r=n();o.setSize(r,r)}),J(()=>{const r=l();for(const t of i.children)jt(t,"PerspectiveCamera")&&(t.near=r,t.updateProjectionMatrix())}),J(()=>{const r=e();for(const t of i.children)jt(t,"PerspectiveCamera")&&(t.far=r,t.updateProjectionMatrix())}),J(()=>()=>{o.dispose()}),{camera:i,renderTarget:o}};var Ae=mt("<!> <!>",1);function Qe(l,e){Yt(e,!0);const n=Ut(),o=()=>Nt(S,"$started",n),i=Zt();let r=z(e,"far",3,1e3),t=z(e,"frames",3,1/0),s=z(e,"near",3,.1),w=z(e,"resolution",3,256),E=z(e,"scene",19,()=>i.scene);const{scene:X}=ue(),{camera:P,renderTarget:b}=Xe(()=>s(),()=>r(),()=>w());Me({texture:b.texture,get scene(){return E()},get isBackground(){return e.isBackground}});const D=()=>{P.update(i.renderer,X)};let C=0;const{start:y,stop:x,started:S}=de(()=>{var _;C<t()?(D(),C+=1):(x(),(_=e.onupdatestop)==null||_.call(e))},{autoStart:!1}),m=()=>{var _,A;o()&&(x(),(_=e.onupdatestop)==null||_.call(e)),C=0,y(),(A=e.onupdatestart)==null||A.call(e)};Qt(()=>[r(),s(),t(),w()],m);var f=xt(()=>e.visible?void 0:!1);return G(l,{is:X,get attach(){return v(f)},children:(_,A)=>{var M=Ae(),q=F(M);G(q,{is:P});var W=nt(q,2);$t(W,()=>e.children??et,()=>({camera:P,renderTarget:b,restart:m,update:D})),R(_,M)},$$slots:{default:!0}}),Tt({camera:P,renderTarget:b,update:D,restart:m})}var Ye=mt("<!> <!>",1);function Te(l,e){Yt(e,!0);const n=Ut(),o=()=>Nt(E,"$camera",n);let i=z(e,"autoPauseOrbitControls",3,!0),r=z(e,"autoPauseTrackballControls",3,!0),t=z(e,"controls",15),s=z(e,"group",15),w=ee(e,["$$slots","$$events","$$legacy","autoPauseOrbitControls","autoPauseTrackballControls","object","controls","group","children"]);const{camera:E,dom:X,invalidate:P,scene:b}=Zt(),{orbitControls:D,trackballControls:C}=fe(),y=pe(!1),x=Lt(i()??!0);ot(()=>x.set(i()??!0));const S=Lt(r()??!0);ot(()=>S.set(r()??!0)),Dt([D,y,x],([c,d,k])=>{if(!(!c||!c.enabled&&d))return c.enabled=!(d&&k),()=>{c.enabled=!0}}),Dt([C,y,S],([c,d,k])=>{if(!(!c||!c.enabled&&d))return c.enabled=!(d&&k),()=>{c.enabled=!0}});const m=new me;let f=xt(()=>new we(o(),X));ot(()=>{var c;return(c=v(f))==null||c.attach(e.object??m),()=>{var d;return(d=v(f))==null?void 0:d.detach()}});const _=["enabled","axis","mode","translationSnap","rotationSnap","scaleSnap","space","size","showX","showY","showZ","visible","onmouseDown","onmouseUp","onobjectChange"];let A=pt($({})),M=pt($({}));ot(()=>{dt(A,$({})),dt(M,$({})),Object.keys(w).forEach(c=>{ot(()=>{_.includes(c)?v(A)[c]=w[c]:v(M)[c]=w[c]})})});const q=c=>{var d;P(),v(f).dragging&&!y.current?y.set(!0):!v(f).dragging&&y.current&&y.set(!1),(d=e.onchange)==null||d.call(e,c)};var W=Ye(),tt=F(W);G(tt,Ct({get is(){return v(f)},onchange:q},()=>v(A),{attach:({ref:c})=>{const d=c.getHelper();return b.add(d),()=>{b.remove(d)}},dispose:!1,oncreate:c=>()=>c.dispose(),get ref(){return t()},set ref(c){t(c)}}));var it=nt(tt,2);G(it,Ct({is:m},()=>v(M),{get ref(){return s()},set ref(c){s(c)},children:(c,d)=>{var k=ut(),Q=F(k);{var g=j=>{var T=ut(),B=F(T);$t(B,()=>e.children,()=>({ref:m})),R(j,T)};Xt(Q,j=>{e.children&&j(g)})}R(c,k)},$$slots:{default:!0}})),R(l,W),Tt()}const It=(l,e=et,n=et,o=et,i=et,r=et)=>{var t=ut(),s=F(t);st(s,()=>G.Group,(w,E)=>{E(w,{get position(){return i()},children:(P,b)=>{let D=()=>b==null?void 0:b().ref;var C=He(),y=F(C);{var x=m=>{Te(m,{get object(){return D()}})};Xt(y,m=>{r()&&m(x)})}var S=nt(y,2);st(S,()=>G.Mesh,(m,f)=>{f(m,{lookAt:[0,0,0],children:(_,A)=>{var M=Ze(),q=F(M);{var W=c=>{var d=ut(),k=F(d),Q=xt(()=>[o()/2]);st(k,()=>G.CircleGeometry,(g,j)=>{j(g,{get args(){return v(Q)}})}),R(c,d)},tt=c=>{var d=ut(),k=F(d),Q=xt(()=>[o(),o()]);st(k,()=>G.PlaneGeometry,(g,j)=>{j(g,{get args(){return v(Q)}})}),R(c,d)};Xt(q,c=>{n()==="circle"?c(W):c(tt,!1)})}var it=nt(q,2);st(it,()=>G.MeshBasicMaterial,(c,d)=>{d(c,{get color(){return e()},side:Jt})}),R(_,M)},$$slots:{default:!0}})}),R(P,C)},$$slots:{default:!0}})}),R(l,t)};var Ze=mt("<!> <!>",1),He=mt("<!> <!>",1),Ce=mt("<!> <!> <!>",1);function Ue(l,e){Yt(e,!0);let n=z(e,"color1",3,"#FF4F4F"),o=z(e,"color2",3,"#FFD0CB"),i=z(e,"color3",3,"#2223FF"),r=z(e,"debug",3,!1),t=pt(void 0);J(()=>{var s;n(),o(),i(),(s=v(t))==null||s.update()}),ne(Qe(l,{get visible(){return r()},children:(s,w)=>{var E=Ce(),X=F(E);It(X,n,()=>"plane",()=>20,()=>[0,0,-20],r);var P=nt(X,2);It(P,o,()=>"circle",()=>5,()=>[0,5,0],r);var b=nt(P,2);It(b,i,()=>"plane",()=>8,()=>[-3,0,4],r),R(s,E)},$$slots:{default:!0}}),s=>dt(t,$(s)),()=>v(t)),Tt()}export{Ue as L};
