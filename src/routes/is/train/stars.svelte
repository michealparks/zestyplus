<script lang="ts">
	import * as THREE from 'three/webgpu'
	import {
		storage,
		Fn,
		instancedBufferAttribute,
		instanceIndex,
		sin,
		time,
		float,
		uniform,
		shapeCircle,
		mix,
		vec3,
	} from 'three/tsl'

	import * as GeometryUtils from 'three/addons/utils/GeometryUtils.js'
	import { T, useTask, useThrelte } from '@threlte/core'

	// compute
	let computeSize

	const effectController = {
		pulseSpeed: uniform(6),
		minWidth: uniform(6),
		maxWidth: uniform(20),
	}

	const divisions = 3000
	const point = new THREE.Vector3()
	const pointColor = new THREE.Color()

	const positions: number[] = []
	const colors: number[] = []
	const sizes = new Float32Array(divisions)

	for (let i = 0, l = divisions; i < l; i++) {
		point.randomDirection().multiplyScalar(1100)
		positions.push(point.x, point.y, point.z)

		// Star-like colors: mostly near-white, with some warm and cool variants
		const p = Math.random()
		let h: number
		let s: number
		let lgt: number

		if (p < 0.65) {
			// majority: white / slightly warm
			h = 0.13 + (Math.random() * 0.04 - 0.02) // around yellowish-white
			s = 0.05 + Math.random() * 0.1 // very low saturation
			lgt = 0.8 + Math.random() * 0.15 // bright
		} else if (p < 0.85) {
			// some: warmer yellow-orange giants
			h = 0.08 + (Math.random() * 0.06 - 0.03) // yellow to light orange
			s = 0.2 + Math.random() * 0.2
			lgt = 0.7 + Math.random() * 0.2
		} else {
			// few: blue-white stars
			h = 0.58 + (Math.random() * 0.06 - 0.03) // blue-ish
			s = 0.25 + Math.random() * 0.25
			lgt = 0.75 + Math.random() * 0.2
		}

		pointColor.setHSL(h, s, lgt, THREE.SRGBColorSpace)
		colors.push(pointColor.r, pointColor.g, pointColor.b)

		sizes[i] = 1.0
	}

	// Instanced Points

	const positionAttribute = new THREE.InstancedBufferAttribute(
		new Float32Array(positions),
		3
	)
	const colorsAttribute = new THREE.InstancedBufferAttribute(
		new Float32Array(colors),
		3
	)

	const instanceSizeBufferAttribute = new THREE.StorageInstancedBufferAttribute(
		sizes,
		1
	)
	const instanceSizeStorage = storage(
		instanceSizeBufferAttribute,
		'float',
		instanceSizeBufferAttribute.count
	)

	computeSize = Fn(() => {
		const { pulseSpeed, minWidth, maxWidth } = effectController

		const relativeTime = time.add(float(instanceIndex))

		const sizeFactor = sin(relativeTime.mul(pulseSpeed)).add(1).div(16)

		instanceSizeStorage
			.element(instanceIndex)
			.assign(sizeFactor.mul(maxWidth.sub(minWidth)).add(minWidth))
	})().compute(divisions)

	// Material / Sprites

	const attributeRange = instancedBufferAttribute(instanceSizeBufferAttribute)
	const pointColors = mix(
		vec3(0.0),
		instancedBufferAttribute(colorsAttribute),
		attributeRange.div(float(effectController.maxWidth))
	)

	const material = new THREE.PointsNodeMaterial({
		colorNode: pointColors,
		opacityNode: shapeCircle(),
		positionNode: instancedBufferAttribute(positionAttribute),
		// rotationNode: time,
		sizeNode: instancedBufferAttribute(instanceSizeBufferAttribute),
		// size: 40, // in pixels units
		vertexColors: true,
		sizeAttenuation: false,
		alphaToCoverage: true,
		fog: false,
	})

	const instancedPoints = new THREE.Sprite(material)
	instancedPoints.count = divisions

	const { renderer } = useThrelte<THREE.WebGPURenderer>()

	useTask(() => {
		renderer.compute(computeSize)
	})
</script>

<T is={instancedPoints} />
