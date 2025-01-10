import { Entity } from './entity'
import type { BoidsController } from './controller.js'
import type { BoidsWorkerPlanner } from './worker-planner'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

/**
 * @module ControlHelper
 * A helper class to make examples easier.
 */
export class ControlHelper {
	boidsController: BoidsController
	workerPlanner: BoidsWorkerPlanner

	constructor(
		boidsController: BoidsController,
		workerPlanner: BoidsWorkerPlanner
	) {
		this.boidsController = boidsController
		this.workerPlanner = workerPlanner
	}

	addDebugControls() {
		const gui = new GUI()
		gui.add(this.boidsController, 'aligmentWeight', 0, 5).name('Alignment')
		gui.add(this.boidsController, 'cohesionWeight', 0, 5).name('Cohesion')
		gui.add(this.boidsController, 'separationWeight', 0, 5).name('Separation')
		gui.add(this.boidsController, 'maxEntitySpeed', 1, 10).name('Max Speed')

		this.boidsButton = gui.add(this, 'addBoids')
		this.obstacleButton = gui.add(this, 'addObstacles')

		this.updateButtonLabels()
	}

	addBoids(count = 50) {
		const boundary = this.boidsController.getBoundary()
		for (let i = 0; i < count; i++) {
			const x = Math.floor(Math.random() * boundary[0])
			const y = Math.floor(Math.random() * boundary[1])
			const z = Math.floor(Math.random() * boundary[2])
			const vx = Math.random() * 4 - 2
			const vy = Math.random() * 4 - 2
			const vz = Math.random() * 4 - 2

			const entity = new Entity(Entity.FLOCK_ENTITY, x, y, z, vx, vy, vz)
			this.boidsController.addFlockEntity(entity)
		}

		if (this.workerPlanner) {
			this.workerPlanner.sendInitialData()
		}

		this.updateButtonLabels()
	}

	addObstacles(obstacleCount = 5) {
		const boundary = this.boidsController.getBoundary()
		for (let i = 0; i < obstacleCount; i++) {
			const x = Math.floor(Math.random() * boundary[0])
			const y = Math.floor(Math.random() * boundary[1])
			const z = Math.floor(Math.random() * boundary[2])

			const entity = new Entity(Entity.OBSTACLE_ENTITY, x, y, z)
			this.boidsController.addObstacleEntity(entity)
		}

		if (this.workerPlanner) {
			this.workerPlanner.sendInitialData()
		}

		this.updateButtonLabels()
	}

	updateButtonLabels() {
		this.boidsButton?.name(
			'Add Boids (' + this.boidsController.getFlockEntities().length + ')'
		)
		this.obstacleButton?.name(
			'Add Obs (' + this.boidsController.getObstacleEntities().length + ')'
		)
	}
}
