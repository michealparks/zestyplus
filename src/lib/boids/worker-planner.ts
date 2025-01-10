import type { BoidsController } from './controller'
import Worker from './worker?worker'

/**
 * @module BoidsWorkerPlanner
 * BoidsWorkerPlanner is a class to help creating multiple workers and
 * distributing the work to these separate workers. It also deals with
 * synchronization of the data among workers and the application
 */
export class BoidsWorkerPlanner {
	boidsController: BoidsController
	updateCallback: () => void
	workerCount: number

	workers: Worker[] = []

	workerCompletedCount = 0

	constructor(
		boidsController: BoidsController,
		updateCallback: () => void,
		workerCount = 4
	) {
		this.boidsController = boidsController
		this.updateCallback = updateCallback
		this.workerCount = workerCount

		for (let i = 0; i < this.workerCount; i += 1) {
			this.workers.push(new Worker())
		}

		this.workers.forEach((worker, index) => {
			worker.onmessage = this.onWorkerMessageReceived.bind(this, index)
		})
	}

	/**
	 * Initializes the worker planner
	 */
	init() {
		this.sendInitialData()
	}

	/**
	 * Sends the BoidsController data to all workers for initial setup.
	 */
	sendInitialData() {
		// copy boids controller state to web worker
		const data = this.boidsController.serialize()
		this.workers.forEach((worker) => {
			worker.postMessage({ action: 'initialData', data })
		})
	}

	/**
	 * This method is called when the application wants all workers to calculate the next iteration.
	 * This can only be called when the previous request was completed.
	 */
	requestIterate() {
		if (this.workerCompletedCount != 0) {
			console.log('Previous request must be completed first!')
			return
		}

		const config = {
			aligmentWeight: this.boidsController.aligmentWeight,
			cohesionWeight: this.boidsController.cohesionWeight,
			separationWeight: this.boidsController.separationWeight,
			maxEntitySpeed: this.boidsController.maxEntitySpeed,
		}

		const len = this.boidsController.getFlockEntities().length
		const increaseAmount = Math.round(len / this.workerCount)
		this.workers.forEach((worker, index) => {
			const start = index * increaseAmount
			const end =
				index == this.workerCount - 1 ? len : (index + 1) * increaseAmount - 1
			worker.postMessage({ action: 'iterate', start, end, config })
		})
	}

	/**
	 * Message handler for worker classes. This method synchronizes the data and
	 * lets application know when the data is ready.
	 */
	onWorkerMessageReceived(index: number, e: MessageEvent) {
		if (e.data.action == 'iterateCompleted') {
			this.boidsController.applyBoidsData(e.data.data)
			this.workers.forEach((worker, wIndex) => {
				if (index != wIndex) {
					// send this update to other workers
					worker.postMessage({ action: 'updateBoidsData', data: e.data.data })
				}
			})

			this.workerCompletedCount++
			if (this.workerCompletedCount == this.workerCount) {
				this.workerCompletedCount = 0
				this.updateCallback()
			}
		}
	}
}
