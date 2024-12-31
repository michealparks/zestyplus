import"./disclose-version.Bg9kRutz.js";import{p as ie,aD as Fe,aF as Me,f as L,a as oe,$ as Ce,a3 as Ve,k as A,a2 as _e,m as ae,d as re,s as K}from"./index-client.D_7LkImg.js";import{c as W,a as j,t as fe}from"./template.AcjnxTEE.js";import{e as ge,i as be}from"./each.CPMWh782.js";import{c as N}from"./svelte-component.ClNcW8Uq.js";import{p as O,a as ne,s as Te,r as De}from"./props.BhoiTsxR.js";import{G as ke,ab as Ee,ac as ze,aa as Ae,s as Be,V as y,Y as xe,P as Z,aU as Se,m as Ie,F as le,M as se,T as R,aI as Re,a1 as Le}from"./T.po24HVTg.js";import{a as je,b as He,c as Ne,u as ye,d as Oe,e as Ge,R as ve}from"./applyColliderActiveEvents.D2fXT2Oo.js";import{h as qe,o as Ue,A as ce,e as We}from"./createCollidersFromChildren.Cm4lVrJe.js";import{i as Qe}from"./if.DtYMiTuA.js";function we(k,e){ie(e,!0);let t=O(e,"shape",3,"convexHull"),n=O(e,"colliders",15);const o=new ke,{updateRef:s}=je(e.oncreate),i=He(),a=Ne(),{world:c,addColliderToContext:h,removeColliderFromContext:l}=ye(),u=Oe(),r=()=>{n()!==void 0&&(u.removeColliders(n()),n().forEach(d=>{l(d),c.removeCollider(d,!0)}),n(n().length=0,!0))},g={oncollisionenter:e.oncollisionenter,oncollisionexit:e.oncollisionexit,oncontact:e.oncontact,onsensorenter:e.onsensorenter,onsensorexit:e.onsensorexit},f=()=>{r(),n(qe(o,t()??"convexHull",c,i,a)),n().forEach(d=>h(d,o,g)),u.registerColliders(n()),n().forEach(d=>{var F;Ge(d,g,(F=i==null?void 0:i.userData)==null?void 0:F.events),d.setActiveCollisionTypes(Ue.ALL),d.setRestitution(e.restitution??0),d.setRestitutionCombineRule(e.restitutionCombineRule??ce.Average),d.setFriction(e.friction??.7),d.setFrictionCombineRule(e.frictionCombineRule??ce.Average),d.setSensor(e.sensor??!1),d.setContactForceEventThreshold(e.contactForceEventThreshold??0),e.density&&d.setDensity(e.density),e.mass&&(e.centerOfMass&&e.principalAngularInertia&&e.angularInertiaLocalFrame?d.setMassProperties(e.mass,{x:e.centerOfMass[0],y:e.centerOfMass[1],z:e.centerOfMass[2]},{x:e.principalAngularInertia[0],y:e.principalAngularInertia[1],z:e.principalAngularInertia[2]},We(e.angularInertiaLocalFrame)):d.setMass(e.mass))}),s(n())},p=()=>f();Fe(()=>{f()}),Me(r);const v=Ee();ze(o),Ae(v,d=>(d==null||d.add(o),()=>{d==null||d.remove(o)}));var x=W(),P=L(x);return Be(P,()=>e.children??Ce,()=>({colliders:n()??[],refresh:p})),j(k,x),oe({refresh:p})}const $=0,Ye=1,Je=new y,he=new xe,ee=new Z,ue=new y,X=new Se;class Ke{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new de,this.unassigned=new de,this.vertices=[]}setFromPoints(e){if(e.length>=4){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.vertices.push(new Xe(e[t]));this.compute()}return this}setFromObject(e){const t=[];return e.updateMatrixWorld(!0),e.traverse(function(n){const o=n.geometry;if(o!==void 0){const s=o.attributes.position;if(s!==void 0)for(let i=0,a=s.count;i<a;i++){const c=new y;c.fromBufferAttribute(s,i).applyMatrix4(n.matrixWorld),t.push(c)}}}),this.setFromPoints(t)}containsPoint(e){const t=this.faces;for(let n=0,o=t.length;n<o;n++)if(t[n].distanceToPoint(e)>this.tolerance)return!1;return!0}intersectRay(e,t){const n=this.faces;let o=-1/0,s=1/0;for(let i=0,a=n.length;i<a;i++){const c=n[i],h=c.distanceToPoint(e.origin),l=c.normal.dot(e.direction);if(h>0&&l>=0)return null;const u=l!==0?-h/l:0;if(!(u<=0)&&(l>0?s=Math.min(u,s):o=Math.max(u,o),o>s))return null}return o!==-1/0?e.at(o,t):e.at(s,t),t}intersectsRay(e){return this.intersectRay(e,Je)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}addVertexToFace(e,t){return e.face=t,t.outside===null?this.assigned.append(e):this.assigned.insertBefore(t.outside,e),t.outside=e,this}removeVertexFromFace(e,t){return e===t.outside&&(e.next!==null&&e.next.face===t?t.outside=e.next:t.outside=null),this.assigned.remove(e),this}removeAllVerticesFromFace(e){if(e.outside!==null){const t=e.outside;let n=e.outside;for(;n.next!==null&&n.next.face===e;)n=n.next;return this.assigned.removeSubList(t,n),t.prev=n.next=null,e.outside=null,t}}deleteFaceVertices(e,t){const n=this.removeAllVerticesFromFace(e);if(n!==void 0)if(t===void 0)this.unassigned.appendChain(n);else{let o=n;do{const s=o.next;t.distanceToPoint(o.point)>this.tolerance?this.addVertexToFace(o,t):this.unassigned.append(o),o=s}while(o!==null)}return this}resolveUnassignedPoints(e){if(this.unassigned.isEmpty()===!1){let t=this.unassigned.first();do{const n=t.next;let o=this.tolerance,s=null;for(let i=0;i<e.length;i++){const a=e[i];if(a.mark===$){const c=a.distanceToPoint(t.point);if(c>o&&(o=c,s=a),o>1e3*this.tolerance)break}}s!==null&&this.addVertexToFace(t,s),t=n}while(t!==null)}return this}computeExtremes(){const e=new y,t=new y,n=[],o=[];for(let s=0;s<3;s++)n[s]=o[s]=this.vertices[0];e.copy(this.vertices[0].point),t.copy(this.vertices[0].point);for(let s=0,i=this.vertices.length;s<i;s++){const a=this.vertices[s],c=a.point;for(let h=0;h<3;h++)c.getComponent(h)<e.getComponent(h)&&(e.setComponent(h,c.getComponent(h)),n[h]=a);for(let h=0;h<3;h++)c.getComponent(h)>t.getComponent(h)&&(t.setComponent(h,c.getComponent(h)),o[h]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(e.x),Math.abs(t.x))+Math.max(Math.abs(e.y),Math.abs(t.y))+Math.max(Math.abs(e.z),Math.abs(t.z))),{min:n,max:o}}computeInitialHull(){const e=this.vertices,t=this.computeExtremes(),n=t.min,o=t.max;let s=0,i=0;for(let r=0;r<3;r++){const g=o[r].point.getComponent(r)-n[r].point.getComponent(r);g>s&&(s=g,i=r)}const a=n[i],c=o[i];let h,l;s=0,he.set(a.point,c.point);for(let r=0,g=this.vertices.length;r<g;r++){const f=e[r];if(f!==a&&f!==c){he.closestPointToPoint(f.point,!0,ue);const p=ue.distanceToSquared(f.point);p>s&&(s=p,h=f)}}s=-1,ee.setFromCoplanarPoints(a.point,c.point,h.point);for(let r=0,g=this.vertices.length;r<g;r++){const f=e[r];if(f!==a&&f!==c&&f!==h){const p=Math.abs(ee.distanceToPoint(f.point));p>s&&(s=p,l=f)}}const u=[];if(ee.distanceToPoint(l.point)<0){u.push(D.create(a,c,h),D.create(l,c,a),D.create(l,h,c),D.create(l,a,h));for(let r=0;r<3;r++){const g=(r+1)%3;u[r+1].getEdge(2).setTwin(u[0].getEdge(g)),u[r+1].getEdge(1).setTwin(u[g+1].getEdge(0))}}else{u.push(D.create(a,h,c),D.create(l,a,c),D.create(l,c,h),D.create(l,h,a));for(let r=0;r<3;r++){const g=(r+1)%3;u[r+1].getEdge(2).setTwin(u[0].getEdge((3-r)%3)),u[r+1].getEdge(0).setTwin(u[g+1].getEdge(1))}}for(let r=0;r<4;r++)this.faces.push(u[r]);for(let r=0,g=e.length;r<g;r++){const f=e[r];if(f!==a&&f!==c&&f!==h&&f!==l){s=this.tolerance;let p=null;for(let v=0;v<4;v++){const x=this.faces[v].distanceToPoint(f.point);x>s&&(s=x,p=this.faces[v])}p!==null&&this.addVertexToFace(f,p)}}return this}reindexFaces(){const e=[];for(let t=0;t<this.faces.length;t++){const n=this.faces[t];n.mark===$&&e.push(n)}return this.faces=e,this}nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let e,t=0;const n=this.assigned.first().face;let o=n.outside;do{const s=n.distanceToPoint(o.point);s>t&&(t=s,e=o),o=o.next}while(o!==null&&o.face===n);return e}}computeHorizon(e,t,n,o){this.deleteFaceVertices(n),n.mark=Ye;let s;t===null?s=t=n.getEdge(0):s=t.next;do{const i=s.twin,a=i.face;a.mark===$&&(a.distanceToPoint(e)>this.tolerance?this.computeHorizon(e,i,a,o):o.push(s)),s=s.next}while(s!==t);return this}addAdjoiningFace(e,t){const n=D.create(e,t.tail(),t.head());return this.faces.push(n),n.getEdge(-1).setTwin(t.twin),n.getEdge(0)}addNewFaces(e,t){this.newFaces=[];let n=null,o=null;for(let s=0;s<t.length;s++){const i=t[s],a=this.addAdjoiningFace(e,i);n===null?n=a:a.next.setTwin(o),this.newFaces.push(a.face),o=a}return n.next.setTwin(o),this}addVertexToHull(e){const t=[];return this.unassigned.clear(),this.removeVertexFromFace(e,e.face),this.computeHorizon(e.point,null,e.face,t),this.addNewFaces(e,t),this.resolveUnassignedPoints(this.newFaces),this}cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}compute(){let e;for(this.computeInitialHull();(e=this.nextVertexToAdd())!==void 0;)this.addVertexToHull(e);return this.reindexFaces(),this.cleanup(),this}}class D{constructor(){this.normal=new y,this.midpoint=new y,this.area=0,this.constant=0,this.outside=null,this.mark=$,this.edge=null}static create(e,t,n){const o=new D,s=new te(e,o),i=new te(t,o),a=new te(n,o);return s.next=a.prev=i,i.next=s.prev=a,a.next=i.prev=s,o.edge=s,o.compute()}getEdge(e){let t=this.edge;for(;e>0;)t=t.next,e--;for(;e<0;)t=t.prev,e++;return t}compute(){const e=this.edge.tail(),t=this.edge.head(),n=this.edge.next.head();return X.set(e.point,t.point,n.point),X.getNormal(this.normal),X.getMidpoint(this.midpoint),this.area=X.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(e){return this.normal.dot(e)-this.constant}}class te{constructor(e,t){this.vertex=e,this.prev=null,this.next=null,this.twin=null,this.face=t}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const e=this.head(),t=this.tail();return t!==null?t.point.distanceTo(e.point):-1}lengthSquared(){const e=this.head(),t=this.tail();return t!==null?t.point.distanceToSquared(e.point):-1}setTwin(e){return this.twin=e,e.twin=this,this}}class Xe{constructor(e){this.point=e,this.prev=null,this.next=null,this.face=null}}class de{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(e,t){return t.prev=e.prev,t.next=e,t.prev===null?this.head=t:t.prev.next=t,e.prev=t,this}insertAfter(e,t){return t.prev=e,t.next=e.next,t.next===null?this.tail=t:t.next.prev=t,e.next=t,this}append(e){return this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail,e.next=null,this.tail=e,this}appendChain(e){for(this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail;e.next!==null;)e=e.next;return this.tail=e,this}remove(e){return e.prev===null?this.head=e.next:e.prev.next=e.next,e.next===null?this.tail=e.prev:e.next.prev=e.prev,this}removeSubList(e,t){return e.prev===null?this.head=t.next:e.prev.next=t.next,t.next===null?this.tail=e.prev:t.next.prev=e.prev,this}isEmpty(){return this.head===null}}class me extends Ie{constructor(e=[]){super();const t=[],n=[],s=new Ke().setFromPoints(e).faces;for(let i=0;i<s.length;i++){const a=s[i];let c=a.edge;do{const h=c.head().point;t.push(h.x,h.y,h.z),n.push(a.normal.x,a.normal.y,a.normal.z),c=c.next}while(c!==a.edge)}this.setAttribute("position",new le(t,3)),this.setAttribute("normal",new le(n,3))}}const Ze=new y;class Q{constructor(e=1.4,t=1e-4){this.minSizeForBreak=e,this.smallDelta=t,this.tempLine1=new xe,this.tempPlane1=new Z,this.tempPlane2=new Z,this.tempPlane_Cut=new Z,this.tempCM1=new y,this.tempCM2=new y,this.tempVector3=new y,this.tempVector3_2=new y,this.tempVector3_3=new y,this.tempVector3_P0=new y,this.tempVector3_P1=new y,this.tempVector3_P2=new y,this.tempVector3_N0=new y,this.tempVector3_N1=new y,this.tempVector3_AB=new y,this.tempVector3_CB=new y,this.tempResultObjects={object1:null,object2:null},this.segments=[];const n=30*30;for(let o=0;o<n;o++)this.segments[o]=!1}prepareBreakableObject(e,t,n,o,s){const i=e.userData;i.mass=t,i.velocity=n.clone(),i.angularVelocity=o.clone(),i.breakable=s}subdivideByImpact(e,t,n,o,s){const i=[],a=this.tempPlane1,c=this.tempPlane2;this.tempVector3.addVectors(t,n),a.setFromCoplanarPoints(t,e.position,this.tempVector3);const h=s+o,l=this;function u(r,g,f,p){if(Math.random()<p*.05||p>h){i.push(r);return}let v=Math.PI;p===0?(c.normal.copy(a.normal),c.constant=a.constant):p<=o?(v=(f-g)*(.2+.6*Math.random())+g,l.tempVector3_2.copy(e.position).sub(t).applyAxisAngle(n,v).add(t),c.setFromCoplanarPoints(t,l.tempVector3,l.tempVector3_2)):(v=(.5*(p&1)+.2*(2-Math.random()))*Math.PI,l.tempVector3_2.copy(t).sub(r.position).applyAxisAngle(n,v).add(r.position),l.tempVector3_3.copy(n).add(r.position),c.setFromCoplanarPoints(r.position,l.tempVector3_3,l.tempVector3_2)),l.cutByPlane(r,c,l.tempResultObjects);const x=l.tempResultObjects.object1,P=l.tempResultObjects.object2;x&&u(x,g,v,p+1),P&&u(P,v,f,p+1)}return u(e,0,2*Math.PI,0),i}cutByPlane(e,t,n){const o=e.geometry,s=o.attributes.position.array,i=o.attributes.normal.array,a=s.length/3;let c=a/3,h=o.getIndex();h&&(h=h.array,c=h.length/3);function l(m,w){const M=m*3+w;return h?h[M]:M}const u=[],r=[],g=this.smallDelta,f=a*a;for(let m=0;m<f;m++)this.segments[m]=!1;const p=this.tempVector3_P0,v=this.tempVector3_P1,x=this.tempVector3_N0,P=this.tempVector3_N1;for(let m=0;m<c-1;m++){const w=l(m,0),M=l(m,1),I=l(m,2);x.set(i[w],i[w]+1,i[w]+2);for(let b=m+1;b<c;b++){const _=l(b,0),E=l(b,1),J=l(b,2);P.set(i[_],i[_]+1,i[_]+2),1-x.dot(P)<g&&(w===_||w===E||w===J?M===_||M===E||M===J?(this.segments[w*a+M]=!0,this.segments[M*a+w]=!0):(this.segments[I*a+w]=!0,this.segments[w*a+I]=!0):(M===_||M===E||M===J)&&(this.segments[I*a+M]=!0,this.segments[M*a+I]=!0))}}const d=this.tempPlane_Cut;e.updateMatrix(),Q.transformPlaneToLocalSpace(t,e.matrix,d);for(let m=0;m<c;m++){const w=l(m,0),M=l(m,1),I=l(m,2);for(let b=0;b<3;b++){const _=b===0?w:b===1?M:I,E=b===0?M:b===1?I:w;if(this.segments[_*a+E])continue;this.segments[_*a+E]=!0,this.segments[E*a+_]=!0,p.set(s[3*_],s[3*_+1],s[3*_+2]),v.set(s[3*E],s[3*E+1],s[3*E+2]);let H=0,G=d.distanceToPoint(p);G>g?(H=2,r.push(p.clone())):G<-g?(H=1,u.push(p.clone())):(H=3,u.push(p.clone()),r.push(p.clone()));let q=0;if(G=d.distanceToPoint(v),G>g?(q=2,r.push(v.clone())):G<-g?(q=1,u.push(v.clone())):(q=3,u.push(v.clone()),r.push(v.clone())),H===1&&q===2||H===2&&q===1){this.tempLine1.start.copy(p),this.tempLine1.end.copy(v);let U=new y;if(U=d.intersectLine(this.tempLine1,U),U===null)return console.error("Internal error: segment does not intersect plane."),n.segmentedObject1=null,n.segmentedObject2=null,0;u.push(U),r.push(U.clone())}}}const F=e.userData.mass*.5;this.tempCM1.set(0,0,0);let C=0;const V=u.length;if(V>0){for(let m=0;m<V;m++)this.tempCM1.add(u[m]);this.tempCM1.divideScalar(V);for(let m=0;m<V;m++){const w=u[m];w.sub(this.tempCM1),C=Math.max(C,w.x,w.y,w.z)}this.tempCM1.add(e.position)}this.tempCM2.set(0,0,0);let z=0;const T=r.length;if(T>0){for(let m=0;m<T;m++)this.tempCM2.add(r[m]);this.tempCM2.divideScalar(T);for(let m=0;m<T;m++){const w=r[m];w.sub(this.tempCM2),z=Math.max(z,w.x,w.y,w.z)}this.tempCM2.add(e.position)}let B=null,S=null,Y=0;return V>4&&(B=new se(new me(u),e.material),B.position.copy(this.tempCM1),B.quaternion.copy(e.quaternion),this.prepareBreakableObject(B,F,e.userData.velocity,e.userData.angularVelocity,2*C>this.minSizeForBreak),Y++),T>4&&(S=new se(new me(r),e.material),S.position.copy(this.tempCM2),S.quaternion.copy(e.quaternion),this.prepareBreakableObject(S,F,e.userData.velocity,e.userData.angularVelocity,2*z>this.minSizeForBreak),Y++),n.object1=B,n.object2=S,Y}static transformFreeVector(e,t){const n=e.x,o=e.y,s=e.z,i=t.elements;return e.x=i[0]*n+i[4]*o+i[8]*s,e.y=i[1]*n+i[5]*o+i[9]*s,e.z=i[2]*n+i[6]*o+i[10]*s,e}static transformFreeVectorInverse(e,t){const n=e.x,o=e.y,s=e.z,i=t.elements;return e.x=i[0]*n+i[1]*o+i[2]*s,e.y=i[4]*n+i[5]*o+i[6]*s,e.z=i[8]*n+i[9]*o+i[10]*s,e}static transformTiedVectorInverse(e,t){const n=e.x,o=e.y,s=e.z,i=t.elements;return e.x=i[0]*n+i[1]*o+i[2]*s-i[12],e.y=i[4]*n+i[5]*o+i[6]*s-i[13],e.z=i[8]*n+i[9]*o+i[10]*s-i[14],e}static transformPlaneToLocalSpace(e,t,n){n.normal.copy(e.normal),n.constant=e.constant;const o=Q.transformTiedVectorInverse(e.coplanarPoint(Ze),t);Q.transformFreeVectorInverse(n.normal,t),n.constant=-o.dot(n.normal)}}const pe=new Q;function Pe(k,e){ie(e,!0);let t=O(e,"fixed",3,!1),n=O(e,"depth",3,0),o=O(e,"maxDepth",3,1),s=O(e,"minBreakForce",3,100),i=De(e,["$$slots","$$events","$$legacy","fixed","depth","maxDepth","minBreakForce","mesh"]),a=Ve(ne([]));n()===0&&pe.prepareBreakableObject(e.mesh,1,new y,new y,!0);let c,h;const l=x=>{if(n()>=o()||x.manifold.numContacts()===0)return;const d=x.manifold.localContactPoint1(0);d&&(c=new y(d.x,d.y,d.z))},u=new y,r=x=>{var F,C;if(!c)return;if(x.totalForceMagnitude<s()){c=void 0;return}const P=x.maxForceDirection;h=new y(P.x,P.y,P.z),_e(a,ne(pe.subdivideByImpact(e.mesh,c,h,2,1))),console.log(A(a)),e.mesh.getWorldPosition(u);const d=(C=(F=e.mesh.parent)==null?void 0:F.parent)==null?void 0:C.position;if(d)for(const V of A(a))V.position.add(d)};var g=W(),f=L(g);{var p=x=>{var P=ae(()=>t()?"fixed":"dynamic");ve(x,Te({get type(){return A(P)},oncollisionenter:l,oncontact:r,canSleep:!1},()=>i,{children:(d,F)=>{we(d,{shape:"convexHull",children:(C,V)=>{R(C,{get is(){return e.mesh}})},$$slots:{default:!0}})},$$slots:{default:!0}}))},v=x=>{var P=W(),d=L(P);ge(d,17,()=>A(a),F=>F.uuid,(F,C)=>{var V=W(),z=L(V);N(z,()=>R.Group,(T,B)=>{B(T,{scale:.98,children:(S,Y)=>{var m=ae(()=>n()+1);Pe(S,{get mesh(){return A(C)},get depth(){return A(m)},get maxDepth(){return o()},get minBreakForce(){return s()}})},$$slots:{default:!0}})}),j(F,V)}),j(x,P)};Qe(f,x=>{A(a).length===0?x(p):x(v,!1)})}j(k,g),oe()}var $e=fe("<!> <!>",1),et=fe("<!> <!> <!> <!>",1);function tt(k,e){ie(e,!0);const{world:t}=ye();re(()=>{let l=t.gravity.y;return t.gravity.y=0,()=>t.gravity.y=l});const n=()=>{const l=new Re,u=new Le,r=new se(u,l);return r.position.y=3,r.rotation.x=Math.PI/4+Math.random(),r.rotation.z=Math.PI/4+Math.random(),r};let o=ne([n()]);re(()=>{const l=setInterval(()=>o.push(n()),5e3);return()=>clearInterval(l)});var s=et(),i=L(s);N(i,()=>R.PerspectiveCamera,(l,u)=>{u(l,{makeDefault:!0,"position.y":1,"position.z":5,oncreate:r=>r.lookAt(0,0,0)})});var a=K(i,2);N(a,()=>R.DirectionalLight,(l,u)=>{u(l,{})});var c=K(a,2);ge(c,17,()=>o,be,(l,u)=>{Pe(l,{get mesh(){return A(u)},minBreakForce:0,maxDepth:2,oncreate:r=>{console.log("hi"),r.applyImpulse({x:0,y:-4,z:0},!0)}})});var h=K(c,2);ve(h,{type:"fixed",children:(l,u)=>{we(l,{shape:"cuboid",children:(r,g)=>{var f=W(),p=L(f);N(p,()=>R.Mesh,(v,x)=>{x(v,{"position.y":-1,children:(P,d)=>{var F=$e(),C=L(F);N(C,()=>R.BoxGeometry,(z,T)=>{T(z,{args:[10,.1,10]})});var V=K(C,2);N(V,()=>R.MeshStandardMaterial,(z,T)=>{T(z,{})}),j(P,F)},$$slots:{default:!0}})}),j(r,f)},$$slots:{default:!0}})},$$slots:{default:!0}}),j(k,s),oe()}const dt=Object.freeze(Object.defineProperty({__proto__:null,default:tt},Symbol.toStringTag,{value:"Module"}));export{tt as _,dt as a};
