import"./disclose-version.Bg9kRutz.js";import{ah as E,c as _,V as g,J as ce,a3 as H,p as pe,j as R,n as U,a1 as xe,$ as A,W as K,a0 as me,a2 as B,a4 as he,M as ye,ai as w,C as ge,aj as we,A as be,F as ie}from"./T.D7KAkooU.js";const b=e=>({subscribe:e.subscribe,get current(){return e.current}});let I=0;const J=_(!1),j=_(!1),X=_(void 0),Q=_(0),ee=_(0),se=_([]),te=_(0),{onStart:$,onLoad:L,onError:Z}=E;E.onStart=(e,n,t)=>{$==null||$(e,n,t),j.set(!0),X.set(e),Q.set(n),ee.set(t);const r=(n-I)/(t-I);te.set(r),r===1&&J.set(!0)};E.onLoad=()=>{L==null||L(),j.set(!1)};E.onError=e=>{Z==null||Z(e),se.update(n=>[...n,e])};E.onProgress=(e,n,t)=>{n===t&&(I=t),j.set(!0),X.set(e),Q.set(n),ee.set(t);const r=(n-I)/(t-I)||1;te.set(r),r===1&&J.set(!0)};b(j),b(X),b(Q),b(ee),b(se),b(te),b(J);new g;new g;new g;new ce;new H;new pe;new g;const D=new g,k=new g,De=new g,Se=new R,Ge=(e,n,t)=>{const r=D.setFromMatrixPosition(e.matrixWorld);r.project(n);const i=t.width/2,o=t.height/2;return[r.x*i+i,-(r.y*o)+o]},Ye=(e,n)=>{const t=D.setFromMatrixPosition(e.matrixWorld),r=k.setFromMatrixPosition(n.matrixWorld),i=t.sub(r),o=n.getWorldDirection(De);return i.angleTo(o)>Math.PI/2},qe=(e,n,t,r)=>{const i=D.setFromMatrixPosition(e.matrixWorld),o=k.copy(D);o.project(n),t.setFromCamera(Se.set(o.x,o.y),n);const a=t.intersectObjects(r,!0);if(a.length){const c=a[0].distance;return i.distanceTo(t.ray.origin)<c}return!0},Ke=(e,n)=>{if(U(n,"OrthographicCamera"))return n.zoom;if(U(n,"PerspectiveCamera")){const t=D.setFromMatrixPosition(e.matrixWorld),r=k.setFromMatrixPosition(n.matrixWorld),i=n.fov*Math.PI/180,o=t.distanceTo(r);return 1/(2*Math.tan(i/2)*o)}else return 1},Je=(e,n,t)=>{const r=D.setFromMatrixPosition(e.matrixWorld),i=k.setFromMatrixPosition(n.matrixWorld),o=r.distanceTo(i),a=(t[1]-t[0])/(n.far-n.near),c=t[1]-a*n.far;return Math.round(a*o+c)},y=e=>Math.abs(e)<1e-10?0:e,le=(e,n,t="")=>{const{elements:r}=e;return`${t}matrix3d(
    ${y(n[0]*r[0])},${y(n[1]*r[1])},${y(n[2]*r[2])},${y(n[3]*r[3])},
    ${y(n[4]*r[4])},${y(n[5]*r[5])},${y(n[6]*r[6])},${y(n[7]*r[7])},
    ${y(n[8]*r[8])},${y(n[9]*r[9])},${y(n[10]*r[10])},${y(n[11]*r[11])},
    ${y(n[12]*r[12])},${y(n[13]*r[13])},${y(n[14]*r[14])},${y(n[15]*r[15])}
  )`},Xe=(e=>n=>le(n,e))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Qe=(e=>(n,t)=>le(n,e(t),"translate(-50%,-50%)"))(e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1]),et=(e,n,t)=>{if(U(e,"OrthographicCamera"))return 1;if(U(e,"PerspectiveCamera")){const{width:r,height:i}=t,o=e.getWorldPosition(D).distanceTo(n),a=e.fov*Math.PI/180,s=2*Math.tan(a/2)*o*(r/i);return r/s}throw new Error("getViewportFactor needs a Perspective or Orthographic Camera")};new K;new g;A.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new R(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};me.line={uniforms:xe.merge([A.common,A.fog,A.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};new g;new g;new B;new B;new B;new g;new H;new he;new g;new K;new ce;new B;new H;new H;new ye;const tt=`
    #include <common>
    ${w.logdepthbuf_pars_vertex}
    ${w.fog_pars_vertex}

    attribute vec3 previous;
    attribute vec3 next;
    attribute float side;
    attribute float width;
    attribute float counters;

    uniform vec2 resolution;
    uniform float lineWidth;
    uniform vec3 color;
    uniform float opacity;
    uniform float sizeAttenuation;
    uniform float scaleDown;

    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;

    vec2 intoScreen(vec4 i) {
        return resolution * (0.5 * i.xy / i.w + 0.5);
    }

    void main() {
        float aspect = resolution.y / resolution.x;

        mat4 m = projectionMatrix * modelViewMatrix;

        vec4 currentClip = m * vec4( position, 1.0 );
        vec4 prevClip = m * vec4( previous, 1.0 );
        vec4 nextClip = m * vec4( next, 1.0 );

        vec4 currentNormed = currentClip / currentClip.w;
        vec4 prevNormed = prevClip / prevClip.w;
        vec4 nextNormed = nextClip / nextClip.w;

        vec2 currentScreen = intoScreen(currentNormed);
        vec2 prevScreen = intoScreen(prevNormed);
        vec2 nextScreen = intoScreen(nextNormed);

        float actualWidth = lineWidth * width;

        vec2 dir;
        if(nextScreen == currentScreen) {
            dir = normalize( currentScreen - prevScreen );
        } else if(prevScreen == currentScreen) {
            dir = normalize( nextScreen - currentScreen );
        } else {
            vec2 inDir = currentScreen - prevScreen;
            vec2 outDir = nextScreen - currentScreen;
            vec2 fullDir = nextScreen - prevScreen;

            if(length(fullDir) > 0.0) {
                dir = normalize(fullDir);
            } else if(length(inDir) > 0.0){
                dir = normalize(inDir);
            } else {
                dir = normalize(outDir);
            }
        }

        vec2 normal = vec2(-dir.y, dir.x);

        if(sizeAttenuation != 0.0) {
            normal /= currentClip.w;
            normal *= min(resolution.x, resolution.y);
        }

        if (scaleDown > 0.0) {
            float dist = length(nextNormed - prevNormed);
            normal *= smoothstep(0.0, scaleDown, dist);
        }

        vec2 offsetInScreen = actualWidth * normal * side * 0.5;

        vec2 withOffsetScreen = currentScreen + offsetInScreen;
        vec3 withOffsetNormed = vec3((2.0 * withOffsetScreen/resolution - 1.0), currentNormed.z);

        vCounters = counters;
        vColor = vec4( color, opacity );
        vUV = uv;

        gl_Position = currentClip.w * vec4(withOffsetNormed, 1.0);

        ${w.logdepthbuf_vertex}
        ${w.fog_vertex}
    }
`;`${w.tonemapping_fragment}${w.colorspace_fragment}`;const nt=`
uniform sampler2D pointTexture;
uniform float fade;
uniform float opacity;

varying vec3 vColor;
void main() {
	float pointOpacity = 1.0;
	if (fade == 1.0) {
		float d = distance(gl_PointCoord, vec2(0.5, 0.5));
		pointOpacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
	}
	gl_FragColor = vec4(vColor, pointOpacity * opacity);

	${w.tonemapping_fragment}
	${w.colorspace_fragment}
}`,_e=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,Me=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,Ce=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,Pe=Ce,Ie=`
	${_e}
	${Me}
`;`${Pe}${Ie}${w.tonemapping_fragment}${w.colorspace_fragment}`;new K;new ge;typeof window<"u"&&document.createElement("div");for(let e=0;e<256;e++)(e<16?"0":"")+e.toString(16);new we(-1,1,1,-1,0,1);class ze extends be{constructor(){super(),this.setAttribute("position",new ie([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ie([0,2,0,0,2,0],2))}}new ze;var de={exports:{}};de.exports=V;de.exports.default=V;function V(e,n,t){t=t||2;var r=n&&n.length,i=r?n[0]*t:e.length,o=fe(e,0,i,t,!0),a=[];if(!o||o.next===o.prev)return a;var c,s,l,d,p,f,h;if(r&&(o=Te(e,n,o,t)),e.length>80*t){c=l=e[0],s=d=e[1];for(var x=t;x<i;x+=t)p=e[x],f=e[x+1],p<c&&(c=p),f<s&&(s=f),p>l&&(l=p),f>d&&(d=f);h=Math.max(l-c,d-s),h=h!==0?32767/h:0}return z(o,a,t,c,s,h,0),a}function fe(e,n,t,r,i){var o,a;if(i===q(e,n,t,r)>0)for(o=n;o<t;o+=r)a=oe(o,e[o],e[o+1],a);else for(o=t-r;o>=n;o-=r)a=oe(o,e[o],e[o+1],a);return a&&W(a,a.next)&&(N(a),a=a.next),a}function S(e,n){if(!e)return e;n||(n=e);var t=e,r;do if(r=!1,!t.steiner&&(W(t,t.next)||m(t.prev,t,t.next)===0)){if(N(t),t=n=t.prev,t===t.next)break;r=!0}else t=t.next;while(r||t!==n);return n}function z(e,n,t,r,i,o,a){if(e){!a&&o&&Be(e,r,i,o);for(var c=e,s,l;e.prev!==e.next;){if(s=e.prev,l=e.next,o?Ne(e,r,i,o):Oe(e)){n.push(s.i/t|0),n.push(e.i/t|0),n.push(l.i/t|0),N(e),e=l.next,c=l.next;continue}if(e=l,e===c){a?a===1?(e=Ee(S(e),n,t),z(e,n,t,r,i,o,2)):a===2&&Fe(e,n,t,r,i,o):z(S(e),n,t,r,i,o,1);break}}}}function Oe(e){var n=e.prev,t=e,r=e.next;if(m(n,t,r)>=0)return!1;for(var i=n.x,o=t.x,a=r.x,c=n.y,s=t.y,l=r.y,d=i<o?i<a?i:a:o<a?o:a,p=c<s?c<l?c:l:s<l?s:l,f=i>o?i>a?i:a:o>a?o:a,h=c>s?c>l?c:l:s>l?s:l,x=r.next;x!==n;){if(x.x>=d&&x.x<=f&&x.y>=p&&x.y<=h&&M(i,c,o,s,a,l,x.x,x.y)&&m(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function Ne(e,n,t,r){var i=e.prev,o=e,a=e.next;if(m(i,o,a)>=0)return!1;for(var c=i.x,s=o.x,l=a.x,d=i.y,p=o.y,f=a.y,h=c<s?c<l?c:l:s<l?s:l,x=d<p?d<f?d:f:p<f?p:f,C=c>s?c>l?c:l:s>l?s:l,P=d>p?d>f?d:f:p>f?p:f,ne=G(h,x,n,t,r),re=G(C,P,n,t,r),v=e.prevZ,u=e.nextZ;v&&v.z>=ne&&u&&u.z<=re;){if(v.x>=h&&v.x<=C&&v.y>=x&&v.y<=P&&v!==i&&v!==a&&M(c,d,s,p,l,f,v.x,v.y)&&m(v.prev,v,v.next)>=0||(v=v.prevZ,u.x>=h&&u.x<=C&&u.y>=x&&u.y<=P&&u!==i&&u!==a&&M(c,d,s,p,l,f,u.x,u.y)&&m(u.prev,u,u.next)>=0))return!1;u=u.nextZ}for(;v&&v.z>=ne;){if(v.x>=h&&v.x<=C&&v.y>=x&&v.y<=P&&v!==i&&v!==a&&M(c,d,s,p,l,f,v.x,v.y)&&m(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;u&&u.z<=re;){if(u.x>=h&&u.x<=C&&u.y>=x&&u.y<=P&&u!==i&&u!==a&&M(c,d,s,p,l,f,u.x,u.y)&&m(u.prev,u,u.next)>=0)return!1;u=u.nextZ}return!0}function Ee(e,n,t){var r=e;do{var i=r.prev,o=r.next.next;!W(i,o)&&ve(i,r,r.next,o)&&O(i,o)&&O(o,i)&&(n.push(i.i/t|0),n.push(r.i/t|0),n.push(o.i/t|0),N(r),N(r.next),r=e=o),r=r.next}while(r!==e);return S(r)}function Fe(e,n,t,r,i,o){var a=e;do{for(var c=a.next.next;c!==a.prev;){if(a.i!==c.i&&Ve(a,c)){var s=ue(a,c);a=S(a,a.next),s=S(s,s.next),z(a,n,t,r,i,o,0),z(s,n,t,r,i,o,0);return}c=c.next}a=a.next}while(a!==e)}function Te(e,n,t,r){var i=[],o,a,c,s,l;for(o=0,a=n.length;o<a;o++)c=n[o]*r,s=o<a-1?n[o+1]*r:e.length,l=fe(e,c,s,r,!1),l===l.next&&(l.steiner=!0),i.push(ke(l));for(i.sort(Ae),o=0;o<i.length;o++)t=Ue(i[o],t);return t}function Ae(e,n){return e.x-n.x}function Ue(e,n){var t=He(e,n);if(!t)return n;var r=ue(t,e);return S(r,r.next),S(t,t.next)}function He(e,n){var t=n,r=e.x,i=e.y,o=-1/0,a;do{if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){var c=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(c<=r&&c>o&&(o=c,a=t.x<t.next.x?t:t.next,c===r))return a}t=t.next}while(t!==n);if(!a)return null;var s=a,l=a.x,d=a.y,p=1/0,f;t=a;do r>=t.x&&t.x>=l&&r!==t.x&&M(i<d?r:o,i,l,d,i<d?o:r,i,t.x,t.y)&&(f=Math.abs(i-t.y)/(r-t.x),O(t,e)&&(f<p||f===p&&(t.x>a.x||t.x===a.x&&Re(a,t)))&&(a=t,p=f)),t=t.next;while(t!==s);return a}function Re(e,n){return m(e.prev,e,n.prev)<0&&m(n.next,e,e.next)<0}function Be(e,n,t,r){var i=e;do i.z===0&&(i.z=G(i.x,i.y,n,t,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,je(i)}function je(e){var n,t,r,i,o,a,c,s,l=1;do{for(t=e,e=null,o=null,a=0;t;){for(a++,r=t,c=0,n=0;n<l&&(c++,r=r.nextZ,!!r);n++);for(s=l;c>0||s>0&&r;)c!==0&&(s===0||!r||t.z<=r.z)?(i=t,t=t.nextZ,c--):(i=r,r=r.nextZ,s--),o?o.nextZ=i:e=i,i.prevZ=o,o=i;t=r}o.nextZ=null,l*=2}while(a>1);return e}function G(e,n,t,r,i){return e=(e-t)*i|0,n=(n-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e|n<<1}function ke(e){var n=e,t=e;do(n.x<t.x||n.x===t.x&&n.y<t.y)&&(t=n),n=n.next;while(n!==e);return t}function M(e,n,t,r,i,o,a,c){return(i-a)*(n-c)>=(e-a)*(o-c)&&(e-a)*(r-c)>=(t-a)*(n-c)&&(t-a)*(o-c)>=(i-a)*(r-c)}function Ve(e,n){return e.next.i!==n.i&&e.prev.i!==n.i&&!We(e,n)&&(O(e,n)&&O(n,e)&&$e(e,n)&&(m(e.prev,e,n.prev)||m(e,n.prev,n))||W(e,n)&&m(e.prev,e,e.next)>0&&m(n.prev,n,n.next)>0)}function m(e,n,t){return(n.y-e.y)*(t.x-n.x)-(n.x-e.x)*(t.y-n.y)}function W(e,n){return e.x===n.x&&e.y===n.y}function ve(e,n,t,r){var i=T(m(e,n,t)),o=T(m(e,n,r)),a=T(m(t,r,e)),c=T(m(t,r,n));return!!(i!==o&&a!==c||i===0&&F(e,t,n)||o===0&&F(e,r,n)||a===0&&F(t,e,r)||c===0&&F(t,n,r))}function F(e,n,t){return n.x<=Math.max(e.x,t.x)&&n.x>=Math.min(e.x,t.x)&&n.y<=Math.max(e.y,t.y)&&n.y>=Math.min(e.y,t.y)}function T(e){return e>0?1:e<0?-1:0}function We(e,n){var t=e;do{if(t.i!==e.i&&t.next.i!==e.i&&t.i!==n.i&&t.next.i!==n.i&&ve(t,t.next,e,n))return!0;t=t.next}while(t!==e);return!1}function O(e,n){return m(e.prev,e,e.next)<0?m(e,n,e.next)>=0&&m(e,e.prev,n)>=0:m(e,n,e.prev)<0||m(e,e.next,n)<0}function $e(e,n){var t=e,r=!1,i=(e.x+n.x)/2,o=(e.y+n.y)/2;do t.y>o!=t.next.y>o&&t.next.y!==t.y&&i<(t.next.x-t.x)*(o-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next;while(t!==e);return r}function ue(e,n){var t=new Y(e.i,e.x,e.y),r=new Y(n.i,n.x,n.y),i=e.next,o=n.prev;return e.next=n,n.prev=e,t.next=i,i.prev=t,r.next=t,t.prev=r,o.next=r,r.prev=o,r}function oe(e,n,t,r){var i=new Y(e,n,t);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function N(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Y(e,n,t){this.i=e,this.x=n,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}V.deviation=function(e,n,t,r){var i=n&&n.length,o=i?n[0]*t:e.length,a=Math.abs(q(e,0,o,t));if(i)for(var c=0,s=n.length;c<s;c++){var l=n[c]*t,d=c<s-1?n[c+1]*t:e.length;a-=Math.abs(q(e,l,d,t))}var p=0;for(c=0;c<r.length;c+=3){var f=r[c]*t,h=r[c+1]*t,x=r[c+2]*t;p+=Math.abs((e[f]-e[x])*(e[h+1]-e[f+1])-(e[f]-e[h])*(e[x+1]-e[f+1]))}return a===0&&p===0?0:Math.abs((p-a)/a)};function q(e,n,t,r){for(var i=0,o=n,a=t-r;o<t;o+=r)i+=(e[a]-e[o])*(e[o+1]+e[a+1]),a=o;return i}V.flatten=function(e){for(var n=e[0][0].length,t={vertices:[],holes:[],dimensions:n},r=0,i=0;i<e.length;i++){for(var o=0;o<e[i].length;o++)for(var a=0;a<n;a++)t.vertices.push(e[i][o][a]);i>0&&(r+=e[i-1].length,t.holes.push(r))}return t};new R;new R;var ae;(e=>{function n(i){let o=i.slice();return o.sort(e.POINT_COMPARATOR),e.makeHullPresorted(o)}e.makeHull=n;function t(i){if(i.length<=1)return i.slice();let o=[];for(let c=0;c<i.length;c++){const s=i[c];for(;o.length>=2;){const l=o[o.length-1],d=o[o.length-2];if((l.x-d.x)*(s.y-d.y)>=(l.y-d.y)*(s.x-d.x))o.pop();else break}o.push(s)}o.pop();let a=[];for(let c=i.length-1;c>=0;c--){const s=i[c];for(;a.length>=2;){const l=a[a.length-1],d=a[a.length-2];if((l.x-d.x)*(s.y-d.y)>=(l.y-d.y)*(s.x-d.x))a.pop();else break}a.push(s)}return a.pop(),o.length==1&&a.length==1&&o[0].x==a[0].x&&o[0].y==a[0].y?o:o.concat(a)}e.makeHullPresorted=t;function r(i,o){return i.x<o.x?-1:i.x>o.x?1:i.y<o.y?-1:i.y>o.y?1:0}e.POINT_COMPARATOR=r})(ae||(ae={}));export{qe as a,Qe as b,Ke as c,Ge as d,y as e,et as f,Xe as g,nt as h,Ye as i,Je as o,tt as v};
