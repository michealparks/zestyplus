<script lang="ts">
	import { T, useTask } from '@threlte/core'

	import {
		BoidsController,
		ControlHelper,
		BoidsWorkerPlanner,
	} from '$lib/boids'
	import {
		InstancedMesh,
		Object3D,
		Matrix4,
		Vector3,
		Quaternion,
		Color,
	} from 'three'
	import { OrbitControls } from '@threlte/extras'
	import { hueShift, useAnalyser } from '$lib'

	const { frequencyData } = useAnalyser()

	let iterateRequested = false

	// create a boids controller with the given boundary [2000, 600, 2000]
	// subdivide the world in to 10*10*10 cubes by passing subDivisionCount as 10
	// this will reduce the time spent for finding nearby entities
	const boidsController = new BoidsController(2000, 1000, 2000, 10)
	boidsController.aligmentWeight = 4
	boidsController.maxEntitySpeed = 3

	const flockEntityCount = 2000
	const obstacleEntityCount = 100

	// create worker planner to run the simulation in WebWorker thread.
	// keep the default worker count as 4
	const workerPlanner = new BoidsWorkerPlanner(boidsController, () => {
		iterateRequested = false
	})
	workerPlanner.init()

	const controlHelper = new ControlHelper(boidsController, workerPlanner)
	// controlHelper.addDebugControls()

	// add initial entities for an interesting view
	controlHelper.addBoids(flockEntityCount)
	controlHelper.addObstacles(obstacleEntityCount)

	useTask(() => {
		// if the iterate is not requested, make a new iteration request
		if (!iterateRequested) {
			workerPlanner.requestIterate()
			iterateRequested = true
		}
	})

	const boidMesh = new InstancedMesh(undefined, undefined, 5000)
	const obstacleMesh = new InstancedMesh(undefined, undefined, 1000)

	const boundary = boidsController.getBoundary()

	// const createGrid = (subdivisionCount: number) => {
	// 	this.gridVisual = new THREE.Group()
	// 	const b = this.boidsController.getBoundary()
	// 	const maxLen = Math.max(b[0], b[1], b[2])
	// 	const len = maxLen / subdivisionCount
	// 	for (let x = 0; x < subdivisionCount; x++) {
	// 		for (let y = 0; y < subdivisionCount; y++) {
	// 			for (let z = 0; z < subdivisionCount; z++) {
	// 				if (
	// 					(x + 0.5) * len > b[0] ||
	// 					(y + 0.5) * len > b[1] ||
	// 					(z + 0.5) * len > b[2]
	// 				) {
	// 					continue
	// 				}

	// 				// create boundary wireframe
	// 				const geometry = new THREE.BoxGeometry(len, len, len)
	// 				const wireframe = new THREE.EdgesGeometry(geometry)
	// 				const line = new THREE.LineSegments(wireframe)
	// 				//line.material.depthTest = false;
	// 				line.material.color = new THREE.Color(0x999999)
	// 				line.material.transparent = false
	// 				line.position.x = len / 2 + x * len
	// 				line.position.y = len / 2 + y * len
	// 				line.position.z = len / 2 + z * len
	// 				//this.scene.add(line);
	// 				this.gridVisual.add(line)
	// 			}
	// 		}
	// 	}

	// 	this.scene.add(this.gridVisual)
	// 	this.gridVisual.visible = false
	// }

	const color = new Color()
	const object = new Object3D()
	const matrix = new Matrix4()
	const position = new Vector3()
	const quaternion = new Quaternion()
	const scale = new Vector3(1, 1, 1)

	useTask(() => {
		const entities = boidsController.getFlockEntities()

		for (let i = 0, l = entities.length; i < l; i += 1) {
			const { x, y, z, vx, vy, vz, localVelocity } = entities[i]

			boidMesh.getMatrixAt(i, matrix)
			matrix.decompose(position, quaternion, scale)

			// apply asymptotic smoothing
			position.x = 0.9 * position.x + 0.1 * x
			position.y = 0.9 * position.y + 0.1 * y
			position.z = 0.9 * position.z + 0.1 * z
			localVelocity.x = 0.9 * localVelocity.x + 0.1 * vx
			localVelocity.y = 0.9 * localVelocity.y + 0.1 * vy
			localVelocity.z = 0.9 * localVelocity.z + 0.1 * vz

			object.position.copy(position)
			object.lookAt(
				position.x + localVelocity.x,
				position.y + localVelocity.y,
				position.z + localVelocity.z
			)
			matrix.compose(position, object.quaternion, scale)

			boidMesh.setMatrixAt(i, matrix)
		}

		boidMesh.instanceMatrix.needsUpdate = true

		const obstacles = boidsController.getObstacleEntities()
		for (let i = 0, l = obstacles.length; i < l; i += 1) {
			obstacleMesh.setColorAt(i, hueShift(color, frequencyData.current[i]))
		}
		if (obstacleMesh.instanceColor) {
			obstacleMesh.instanceColor.needsUpdate = true
		}
	})

	$effect(() => {
		const obstacles = boidsController.getObstacleEntities()
		for (let i = 0, l = obstacles.length; i < l; i += 1) {
			const { x, y, z } = obstacles[i]
			obstacleMesh.getMatrixAt(i, matrix)
			matrix.decompose(position, quaternion, scale)
			position.set(x, y, z)
			matrix.compose(position, quaternion, scale)
			obstacleMesh.setMatrixAt(i, matrix)
			obstacleMesh.setColorAt(i, color)
		}
		obstacleMesh.instanceMatrix.needsUpdate = true
		if (obstacleMesh.instanceColor) {
			obstacleMesh.instanceColor.needsUpdate = true
		}
	})
</script>

<T.PerspectiveCamera
	makeDefault
	fov={70}
	position.z={-10}
	near={0.1}
	far={5000}
	oncreate={(ref) => ref.lookAt(0, 0, 0)}
>
	<OrbitControls
		autoRotate
		autoRotateSpeed={1}
		enablePan={false}
		enableRotate={false}
		enableZoom={false}
	/>
</T.PerspectiveCamera>

<T
	is={boidMesh}
	frustumCulled={false}
	position={[-boundary[0] / 2, -boundary[1] / 2, -boundary[2] / 2]}
>
	<T.ConeGeometry
		args={[2, 5]}
		oncreate={(ref) => {
			ref.rotateX(Math.PI / 2)
		}}
	/>
	<T.MeshNormalMaterial />
</T>

<T
	is={obstacleMesh}
	frustumCulled={false}
	position={[-boundary[0] / 2, -boundary[1] / 2, -boundary[2] / 2]}
>
	<T.SphereGeometry args={[20]} />
	<T.MeshBasicMaterial />
</T>

<!-- <T.LineSegments args={[]}>
	<T.EdgesGeometry args={[new BoxGeometry(...boundary)]} />
</T.LineSegments> -->
