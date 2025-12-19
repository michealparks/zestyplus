<script
	module
	lang="ts"
>
	import { Bone, DoubleSide } from 'three'

	const createBones = (
		halfHeight: number,
		segmentCount: number,
		segmentHeight: number
	) => {
		const bones: Bone[] = []

		let prevBone = new Bone()
		bones.push(prevBone)
		prevBone.position.y = -halfHeight

		for (let i = 0; i < segmentCount; i++) {
			const bone = new Bone()
			bone.position.y = segmentHeight
			bones.push(bone)
			prevBone.add(bone)
			prevBone = bone
		}

		return bones
	}
</script>

<script lang="ts">
	import { T, useTask } from '@threlte/core'
	import {
		Vector3,
		SkinnedMesh,
		Uint16BufferAttribute,
		Float32BufferAttribute,
		CylinderGeometry,
		Skeleton,
	} from 'three'

	interface Props {
		radius?: number
		height?: number
		radialSegments?: number
		heightSegments: number
		segmentHeight: number
		segments: number
		positions: Float32Array | undefined
	}

	let {
		radius,
		radialSegments,
		heightSegments,
		segmentHeight,
		segments,
		positions,
	}: Props = $props()

	const height = $derived(segmentHeight * segments)
	const halfHeight = $derived(height * 0.5)

	const bones = $derived(createBones(halfHeight, segments, segmentHeight))
	const mesh = new SkinnedMesh()
	const skeleton = $derived(new Skeleton(bones))
	mesh.add(bones[0])
	mesh.bind(skeleton)

	const geometry = new CylinderGeometry(
		radius,
		radius,
		height,
		radialSegments,
		heightSegments,
		true
	)

	const skinIndices: number[] = []
	const skinWeights: number[] = []

	const { position } = geometry.attributes

	const vertex = new Vector3()

	for (let i = 0, l; i < position.count; i++) {
		vertex.fromBufferAttribute(position, i)

		// compute skinIndex and skinWeight based on some configuration data
		const y = vertex.y + halfHeight
		const skinIndex = Math.floor(y / segmentHeight)
		const skinWeight = (y % segmentHeight) / segmentHeight
		skinIndices.push(skinIndex, skinIndex + 1, 0, 0)
		skinWeights.push(1 - skinWeight, skinWeight, 0, 0)
	}

	geometry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndices, 4))
	geometry.setAttribute(
		'skinWeight',
		new Float32BufferAttribute(skinWeights, 4)
	)

	useTask(() => {
		if (positions === undefined) {
			return
		}
		for (let i = 0, j = 0, l = bones.length; i < l; i += 1, j += 3) {
			skeleton.bones[i].position.set(
				positions[j + 0],
				positions[j + 1],
				positions[j + 2]
			)
			skeleton.bones[i].rotation.x = 0.2
		}
	})
</script>

<T is={mesh}>
	<T is={geometry} />
	<T.MeshStandardMaterial side={DoubleSide} />
</T>
