import{V as u,B as U,e as z,f as G,g as N}from"./T.y93Wq12a.js";function H(n,l){if(l===z)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(l===G||l===N){let o=n.getIndex();if(o===null){const t=[],m=n.getAttribute("position");if(m!==void 0){for(let s=0;s<m.count;s++)t.push(s);n.setIndex(t),o=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const f=o.count-2,e=[];if(l===G)for(let t=1;t<=f;t++)e.push(o.getX(0)),e.push(o.getX(t)),e.push(o.getX(t+1));else for(let t=0;t<f;t++)t%2===0?(e.push(o.getX(t)),e.push(o.getX(t+1)),e.push(o.getX(t+2))):(e.push(o.getX(t+2)),e.push(o.getX(t+1)),e.push(o.getX(t)));e.length/3!==f&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const a=n.clone();return a.setIndex(e),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",l),n}function R(n,l=Math.PI/3){const o=Math.cos(l),f=(1+1e-10)*100,e=[new u,new u,new u],a=new u,t=new u,m=new u,s=new u;function X(r){const d=~~(r.x*f),i=~~(r.y*f),b=~~(r.z*f);return`${d},${i},${b}`}const A=n.index?n.toNonIndexed():n,c=A.attributes.position,x={};for(let r=0,d=c.count/3;r<d;r++){const i=3*r,b=e[0].fromBufferAttribute(c,i+0),g=e[1].fromBufferAttribute(c,i+1),T=e[2].fromBufferAttribute(c,i+2);a.subVectors(T,g),t.subVectors(b,g);const p=new u().crossVectors(a,t).normalize();for(let w=0;w<3;w++){const B=e[w],h=X(B);h in x||(x[h]=[]),x[h].push(p)}}const M=new Float32Array(c.count*3),D=new U(M,3,!1);for(let r=0,d=c.count/3;r<d;r++){const i=3*r,b=e[0].fromBufferAttribute(c,i+0),g=e[1].fromBufferAttribute(c,i+1),T=e[2].fromBufferAttribute(c,i+2);a.subVectors(T,g),t.subVectors(b,g),m.crossVectors(a,t).normalize();for(let p=0;p<3;p++){const w=e[p],B=X(w),h=x[B];s.set(0,0,0);for(let V=0,I=h.length;V<I;V++){const E=h[V];m.dot(E)>o&&s.add(E)}s.normalize(),D.setXYZ(i+p,s.x,s.y,s.z)}}return A.setAttribute("normal",D),A}export{H as a,R as t};
