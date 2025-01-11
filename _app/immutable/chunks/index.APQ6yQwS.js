import"./disclose-version.n6tle2S8.js";import{c as D}from"./T.CjKvhq6h.js";import{a4 as P,V as h,r as re,J as A,j as le,g as U,A as de,y as T,u as j,z as fe,H as F,L as ve,M as ue,a5 as g,C as pe,a6 as xe,p as me,F as ee}from"./three.module.iKKkBh6O.js";const w=e=>({subscribe:e.subscribe,get current(){return e.current}});let z=0;const $=D(!1),H=D(!1),Y=D(void 0),q=D(0),K=D(0),ie=D([]),J=D(0),{onStart:k,onLoad:L,onError:Z}=P;P.onStart=(e,n,t)=>{k==null||k(e,n,t),H.set(!0),Y.set(e),q.set(n),K.set(t);const o=(n-z)/(t-z);J.set(o),o===1&&$.set(!0)};P.onLoad=()=>{L==null||L(),H.set(!1)};P.onError=e=>{Z==null||Z(e),ie.update(n=>[...n,e])};P.onProgress=(e,n,t)=>{n===t&&(z=t),H.set(!0),Y.set(e),q.set(n),K.set(t);const o=(n-z)/(t-z)||1;J.set(o),o===1&&$.set(!0)};w(H),w(Y),w(q),w(K),w(ie),w(J),w($);new h;new h;new h;new re;new A;new le;new h;new h;new h;new h;new U;new j;new h;T.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new U(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};fe.line={uniforms:de.merge([T.common,T.fog,T.line]),vertexShader:`
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
		`};new h;new h;new F;new F;new F;new h;new A;new ve;new h;new j;new re;new F;new A;new A;new ue;const Le=`
    #include <common>
    ${g.logdepthbuf_pars_vertex}
    ${g.fog_pars_vertex}

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

        ${g.logdepthbuf_vertex}
        ${g.fog_vertex}
    }
`;`${g.tonemapping_fragment}${g.colorspace_fragment}`;const Ze=`
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

	${g.tonemapping_fragment}
	${g.colorspace_fragment}
}`,ye=`

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
`,he=`

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
`,ge=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,we=ge,be=`
	${ye}
	${he}
`;`${we}${be}${g.tonemapping_fragment}${g.colorspace_fragment}`;new j;new pe;typeof window<"u"&&document.createElement("div");for(let e=0;e<256;e++)(e<16?"0":"")+e.toString(16);new xe(-1,1,1,-1,0,1);class De extends me{constructor(){super(),this.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ee([0,2,0,0,2,0],2))}}new De;var oe={exports:{}};oe.exports=R;oe.exports.default=R;function R(e,n,t){t=t||2;var o=n&&n.length,r=o?n[0]*t:e.length,i=ae(e,0,r,t,!0),a=[];if(!i||i.next===i.prev)return a;var c,l,s,d,p,f,y;if(o&&(i=Ie(e,n,i,t)),e.length>80*t){c=s=e[0],l=d=e[1];for(var x=t;x<r;x+=t)p=e[x],f=e[x+1],p<c&&(c=p),f<l&&(l=f),p>s&&(s=p),f>d&&(d=f);y=Math.max(s-c,d-l),y=y!==0?32767/y:0}return I(i,a,t,c,l,y,0),a}function ae(e,n,t,o,r){var i,a;if(r===W(e,n,t,o)>0)for(i=n;i<t;i+=o)a=te(i,e[i],e[i+1],a);else for(i=t-o;i>=n;i-=o)a=te(i,e[i],e[i+1],a);return a&&B(a,a.next)&&(O(a),a=a.next),a}function b(e,n){if(!e)return e;n||(n=e);var t=e,o;do if(o=!1,!t.steiner&&(B(t,t.next)||m(t.prev,t,t.next)===0)){if(O(t),t=n=t.prev,t===t.next)break;o=!0}else t=t.next;while(o||t!==n);return n}function I(e,n,t,o,r,i,a){if(e){!a&&i&&Ee(e,o,r,i);for(var c=e,l,s;e.prev!==e.next;){if(l=e.prev,s=e.next,i?_e(e,o,r,i):Se(e)){n.push(l.i/t|0),n.push(e.i/t|0),n.push(s.i/t|0),O(e),e=s.next,c=s.next;continue}if(e=s,e===c){a?a===1?(e=Ce(b(e),n,t),I(e,n,t,o,r,i,2)):a===2&&ze(e,n,t,o,r,i):I(b(e),n,t,o,r,i,1);break}}}}function Se(e){var n=e.prev,t=e,o=e.next;if(m(n,t,o)>=0)return!1;for(var r=n.x,i=t.x,a=o.x,c=n.y,l=t.y,s=o.y,d=r<i?r<a?r:a:i<a?i:a,p=c<l?c<s?c:s:l<s?l:s,f=r>i?r>a?r:a:i>a?i:a,y=c>l?c>s?c:s:l>s?l:s,x=o.next;x!==n;){if(x.x>=d&&x.x<=f&&x.y>=p&&x.y<=y&&S(r,c,i,l,a,s,x.x,x.y)&&m(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function _e(e,n,t,o){var r=e.prev,i=e,a=e.next;if(m(r,i,a)>=0)return!1;for(var c=r.x,l=i.x,s=a.x,d=r.y,p=i.y,f=a.y,y=c<l?c<s?c:s:l<s?l:s,x=d<p?d<f?d:f:p<f?p:f,_=c>l?c>s?c:s:l>s?l:s,C=d>p?d>f?d:f:p>f?p:f,X=V(y,x,n,t,o),Q=V(_,C,n,t,o),v=e.prevZ,u=e.nextZ;v&&v.z>=X&&u&&u.z<=Q;){if(v.x>=y&&v.x<=_&&v.y>=x&&v.y<=C&&v!==r&&v!==a&&S(c,d,l,p,s,f,v.x,v.y)&&m(v.prev,v,v.next)>=0||(v=v.prevZ,u.x>=y&&u.x<=_&&u.y>=x&&u.y<=C&&u!==r&&u!==a&&S(c,d,l,p,s,f,u.x,u.y)&&m(u.prev,u,u.next)>=0))return!1;u=u.nextZ}for(;v&&v.z>=X;){if(v.x>=y&&v.x<=_&&v.y>=x&&v.y<=C&&v!==r&&v!==a&&S(c,d,l,p,s,f,v.x,v.y)&&m(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;u&&u.z<=Q;){if(u.x>=y&&u.x<=_&&u.y>=x&&u.y<=C&&u!==r&&u!==a&&S(c,d,l,p,s,f,u.x,u.y)&&m(u.prev,u,u.next)>=0)return!1;u=u.nextZ}return!0}function Ce(e,n,t){var o=e;do{var r=o.prev,i=o.next.next;!B(r,i)&&ce(r,o,o.next,i)&&M(r,i)&&M(i,r)&&(n.push(r.i/t|0),n.push(o.i/t|0),n.push(i.i/t|0),O(o),O(o.next),o=e=i),o=o.next}while(o!==e);return b(o)}function ze(e,n,t,o,r,i){var a=e;do{for(var c=a.next.next;c!==a.prev;){if(a.i!==c.i&&Ue(a,c)){var l=se(a,c);a=b(a,a.next),l=b(l,l.next),I(a,n,t,o,r,i,0),I(l,n,t,o,r,i,0);return}c=c.next}a=a.next}while(a!==e)}function Ie(e,n,t,o){var r=[],i,a,c,l,s;for(i=0,a=n.length;i<a;i++)c=n[i]*o,l=i<a-1?n[i+1]*o:e.length,s=ae(e,c,l,o,!1),s===s.next&&(s.steiner=!0),r.push(Ae(s));for(r.sort(Me),i=0;i<r.length;i++)t=Oe(r[i],t);return t}function Me(e,n){return e.x-n.x}function Oe(e,n){var t=Pe(e,n);if(!t)return n;var o=se(t,e);return b(o,o.next),b(t,t.next)}function Pe(e,n){var t=n,o=e.x,r=e.y,i=-1/0,a;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){var c=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(c<=o&&c>i&&(i=c,a=t.x<t.next.x?t:t.next,c===o))return a}t=t.next}while(t!==n);if(!a)return null;var l=a,s=a.x,d=a.y,p=1/0,f;t=a;do o>=t.x&&t.x>=s&&o!==t.x&&S(r<d?o:i,r,s,d,r<d?i:o,r,t.x,t.y)&&(f=Math.abs(r-t.y)/(o-t.x),M(t,e)&&(f<p||f===p&&(t.x>a.x||t.x===a.x&&Ne(a,t)))&&(a=t,p=f)),t=t.next;while(t!==l);return a}function Ne(e,n){return m(e.prev,e,n.prev)<0&&m(n.next,e,e.next)<0}function Ee(e,n,t,o){var r=e;do r.z===0&&(r.z=V(r.x,r.y,n,t,o)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==e);r.prevZ.nextZ=null,r.prevZ=null,Te(r)}function Te(e){var n,t,o,r,i,a,c,l,s=1;do{for(t=e,e=null,i=null,a=0;t;){for(a++,o=t,c=0,n=0;n<s&&(c++,o=o.nextZ,!!o);n++);for(l=s;c>0||l>0&&o;)c!==0&&(l===0||!o||t.z<=o.z)?(r=t,t=t.nextZ,c--):(r=o,o=o.nextZ,l--),i?i.nextZ=r:e=r,r.prevZ=i,i=r;t=o}i.nextZ=null,s*=2}while(a>1);return e}function V(e,n,t,o,r){return e=(e-t)*r|0,n=(n-o)*r|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e|n<<1}function Ae(e){var n=e,t=e;do(n.x<t.x||n.x===t.x&&n.y<t.y)&&(t=n),n=n.next;while(n!==e);return t}function S(e,n,t,o,r,i,a,c){return(r-a)*(n-c)>=(e-a)*(i-c)&&(e-a)*(o-c)>=(t-a)*(n-c)&&(t-a)*(i-c)>=(r-a)*(o-c)}function Ue(e,n){return e.next.i!==n.i&&e.prev.i!==n.i&&!Fe(e,n)&&(M(e,n)&&M(n,e)&&He(e,n)&&(m(e.prev,e,n.prev)||m(e,n.prev,n))||B(e,n)&&m(e.prev,e,e.next)>0&&m(n.prev,n,n.next)>0)}function m(e,n,t){return(n.y-e.y)*(t.x-n.x)-(n.x-e.x)*(t.y-n.y)}function B(e,n){return e.x===n.x&&e.y===n.y}function ce(e,n,t,o){var r=E(m(e,n,t)),i=E(m(e,n,o)),a=E(m(t,o,e)),c=E(m(t,o,n));return!!(r!==i&&a!==c||r===0&&N(e,t,n)||i===0&&N(e,o,n)||a===0&&N(t,e,o)||c===0&&N(t,n,o))}function N(e,n,t){return n.x<=Math.max(e.x,t.x)&&n.x>=Math.min(e.x,t.x)&&n.y<=Math.max(e.y,t.y)&&n.y>=Math.min(e.y,t.y)}function E(e){return e>0?1:e<0?-1:0}function Fe(e,n){var t=e;do{if(t.i!==e.i&&t.next.i!==e.i&&t.i!==n.i&&t.next.i!==n.i&&ce(t,t.next,e,n))return!0;t=t.next}while(t!==e);return!1}function M(e,n){return m(e.prev,e,e.next)<0?m(e,n,e.next)>=0&&m(e,e.prev,n)>=0:m(e,n,e.prev)<0||m(e,e.next,n)<0}function He(e,n){var t=e,o=!1,r=(e.x+n.x)/2,i=(e.y+n.y)/2;do t.y>i!=t.next.y>i&&t.next.y!==t.y&&r<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(o=!o),t=t.next;while(t!==e);return o}function se(e,n){var t=new G(e.i,e.x,e.y),o=new G(n.i,n.x,n.y),r=e.next,i=n.prev;return e.next=n,n.prev=e,t.next=r,r.prev=t,o.next=t,t.prev=o,i.next=o,o.prev=i,o}function te(e,n,t,o){var r=new G(e,n,t);return o?(r.next=o.next,r.prev=o,o.next.prev=r,o.next=r):(r.prev=r,r.next=r),r}function O(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function G(e,n,t){this.i=e,this.x=n,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}R.deviation=function(e,n,t,o){var r=n&&n.length,i=r?n[0]*t:e.length,a=Math.abs(W(e,0,i,t));if(r)for(var c=0,l=n.length;c<l;c++){var s=n[c]*t,d=c<l-1?n[c+1]*t:e.length;a-=Math.abs(W(e,s,d,t))}var p=0;for(c=0;c<o.length;c+=3){var f=o[c]*t,y=o[c+1]*t,x=o[c+2]*t;p+=Math.abs((e[f]-e[x])*(e[y+1]-e[f+1])-(e[f]-e[y])*(e[x+1]-e[f+1]))}return a===0&&p===0?0:Math.abs((p-a)/a)};function W(e,n,t,o){for(var r=0,i=n,a=t-o;i<t;i+=o)r+=(e[a]-e[i])*(e[i+1]+e[a+1]),a=i;return r}R.flatten=function(e){for(var n=e[0][0].length,t={vertices:[],holes:[],dimensions:n},o=0,r=0;r<e.length;r++){for(var i=0;i<e[r].length;i++)for(var a=0;a<n;a++)t.vertices.push(e[r][i][a]);r>0&&(o+=e[r-1].length,t.holes.push(o))}return t};new U;new U;var ne;(e=>{function n(r){let i=r.slice();return i.sort(e.POINT_COMPARATOR),e.makeHullPresorted(i)}e.makeHull=n;function t(r){if(r.length<=1)return r.slice();let i=[];for(let c=0;c<r.length;c++){const l=r[c];for(;i.length>=2;){const s=i[i.length-1],d=i[i.length-2];if((s.x-d.x)*(l.y-d.y)>=(s.y-d.y)*(l.x-d.x))i.pop();else break}i.push(l)}i.pop();let a=[];for(let c=r.length-1;c>=0;c--){const l=r[c];for(;a.length>=2;){const s=a[a.length-1],d=a[a.length-2];if((s.x-d.x)*(l.y-d.y)>=(s.y-d.y)*(l.x-d.x))a.pop();else break}a.push(l)}return a.pop(),i.length==1&&a.length==1&&i[0].x==a[0].x&&i[0].y==a[0].y?i:i.concat(a)}e.makeHullPresorted=t;function o(r,i){return r.x<i.x?-1:r.x>i.x?1:r.y<i.y?-1:r.y>i.y?1:0}e.POINT_COMPARATOR=o})(ne||(ne={}));export{Ze as f,Le as v};
