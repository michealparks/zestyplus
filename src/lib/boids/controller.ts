import { Entity } from './entity'
import { Grid } from './grid'

/**
 * @module BoidsController
 * BoidsController class defines a container for boids entities.
 * All entities (flock or obstalces) are added to BoidsController.
 * BoidsController calculates and updates entity positions and velocities.
 */
export class BoidsController {
	grid: Grid
	subDivisionCount: number
	flockEntities: Entity[] = []
	obstacleEntities: Entity[] = []

	boundaryX: number
	boundaryY: number
	boundaryZ: number

	aligmentWeight = 2.0
	cohesionWeight = 4
	separationWeight = 0.3

	maxEntitySpeed = 5

	aligmentRadius = 100
	cohesionRadius = 100
	separationRadius = 100
	obstacleRadius = 100

	/**
	 * Constructor for the BoidsController
	 * @param boundaryX world size in x axis
	 * @param boundaryY world size in y axis
	 * @param boundaryZ world size in z axis
	 * @param subDivisionCount subdivision count defines the grid size.
	 * If it is given 10, world will be splitted into 10*10*10 cubes for spatial partitioning.
	 */
	constructor(
		boundaryX = 500,
		boundaryY = 500,
		boundaryZ = 500,
		subDivisionCount = 1
	) {
		const maxSize = Math.max(boundaryX, boundaryY, boundaryZ)
		this.grid = new Grid(maxSize, maxSize / subDivisionCount)
		this.subDivisionCount = subDivisionCount
		this.boundaryX = boundaryX
		this.boundaryY = boundaryY
		this.boundaryZ = boundaryZ
	}

	/**
	 * Adds flock entity to boids container
	 */
	addFlockEntity(entity: Entity) {
		this.grid.addEntity(entity)
		this.flockEntities.push(entity)
	}

	/**
	 * Returns flock entities
	 */
	getFlockEntities() {
		return this.flockEntities
	}

	/**
	 * Adds obstacle entity to boids controller
	 */
	addObstacleEntity(entity: Entity) {
		this.grid.addEntity(entity)
		this.obstacleEntities.push(entity)
	}

	/**
	 * Returns obstacle entities
	 */
	getObstacleEntities() {
		return this.obstacleEntities
	}

	/**
	 * Returns world boundary
	 */
	getBoundary(): [number, number, number] {
		return [this.boundaryX, this.boundaryY, this.boundaryZ]
	}

	/**
	 * Sets max speed for flock entities.
	 */
	setMaxSpeed(s: number) {
		this.maxEntitySpeed = s
	}

	/**
	 * Sets aligment weight. This changes how much flock entities are effected by each others alignment
	 */
	setAligmentWeight(w: number) {
		this.aligmentWeight = w
	}

	/**
	 * Sets cohesion weight. This changes how much flock entities are inclined to stick together
	 */
	setCohesionWeight(w: number) {
		this.cohesionWeight = w
	}

	/**
	 * Sets separation weight. This changes how much flock entities are inclined to separate from each together
	 */
	setSeparationWeight(w: number) {
		this.separationWeight = w
	}

	/**
	 * Sets world boundary
	 */
	setBoundary(x: number, y: number, z: number) {
		this.boundaryX = x
		this.boundaryY = y
		this.boundaryZ = z
	}

	/**
	 * iterate calculates the new position for flock entities.
	 * start and end indices are used for parallelization of this calculation
	 * @param start start index for calculation
	 * @param  end end index for calculation
	 */
	iterate(start = 0, end = this.flockEntities.length) {
		for (let i = start; i < end; i++) {
			const entity = this.flockEntities[i]
			const aligmentVel = this.computeAlignment(entity)
			const cohVel = this.computeCohesion(entity)
			const sepVel = this.computeSeparation(entity)
			const obsVel = this.computeObstacles(entity)

			// add components
			const vx =
				this.aligmentWeight * aligmentVel[0] +
				this.cohesionWeight * cohVel[0] +
				50 * this.separationWeight * sepVel[0] +
				100 * obsVel[0]
			const vy =
				this.aligmentWeight * aligmentVel[1] +
				this.cohesionWeight * cohVel[1] +
				50 * this.separationWeight * sepVel[1] +
				100 * obsVel[1]
			const vz =
				this.aligmentWeight * aligmentVel[2] +
				this.cohesionWeight * cohVel[2] +
				50 * this.separationWeight * sepVel[2] +
				100 * obsVel[2]

			entity.addVelocity(vx, vy, vz)
			entity.move(
				this.maxEntitySpeed,
				this.boundaryX,
				this.boundaryY,
				this.boundaryZ
			)
		}
	}

	/**
	 * Computes alignment vector for the given entity
	 * @returns alignment vector
	 */
	computeAlignment(entity: Entity): [number, number, number] {
		let aligmentX = 0
		let aligmentY = 0
		let aligmentZ = 0
		let neighborCount = 0

		this.grid.getEntitiesInCube(
			entity.x,
			entity.y,
			entity.z,
			this.aligmentRadius,
			(currentEntity) => {
				if (
					currentEntity != entity &&
					currentEntity.getType() == Entity.FLOCK_ENTITY &&
					entity.getDistance(currentEntity) < this.aligmentRadius
				) {
					neighborCount++
					aligmentX += currentEntity.vx
					aligmentY += currentEntity.vy
					aligmentZ += currentEntity.vz
				}
			}
		)

		if (neighborCount > 0) {
			aligmentX /= neighborCount
			aligmentY /= neighborCount
			aligmentZ /= neighborCount
			const aligmentMag = Math.sqrt(
				aligmentX * aligmentX + aligmentY * aligmentY + aligmentZ * aligmentZ
			)
			if (aligmentMag > 0) {
				aligmentX /= aligmentMag
				aligmentY /= aligmentMag
				aligmentZ /= aligmentMag
			}
		}

		return [aligmentX, aligmentY, aligmentZ]
	}

	/**
	 * Computes cohesion vector for the given entity
	 * @returns cohesion vector
	 */
	computeCohesion(entity: Entity): [number, number, number] {
		let cohX = 0
		let cohY = 0
		let cohZ = 0
		let neighborCount = 0

		this.grid.getEntitiesInCube(
			entity.x,
			entity.y,
			entity.z,
			this.cohesionRadius,
			(currentEntity) => {
				if (
					currentEntity != entity &&
					currentEntity.getType() == Entity.FLOCK_ENTITY &&
					entity.getDistance(currentEntity) < this.cohesionRadius
				) {
					neighborCount++
					cohX += currentEntity.x
					cohY += currentEntity.y
					cohZ += currentEntity.z
				}
			}
		)

		if (neighborCount > 0) {
			cohX /= neighborCount
			cohY /= neighborCount
			cohZ /= neighborCount

			cohX = cohX - entity.x
			cohY = cohY - entity.y
			cohZ = cohZ - entity.z

			const cohMag = Math.sqrt(cohX * cohX + cohY * cohY + cohZ * cohZ)
			if (cohMag > 0) {
				cohX /= cohMag
				cohY /= cohMag
				cohZ /= cohMag
			}
		}

		return [cohX, cohY, cohZ]
	}

	/**
	 * Computes separation vector for the given entity
	 * @param {Entity} entity
	 * @returns {Array} separation vector
	 */
	computeSeparation(entity: Entity) {
		let sepX = 0
		let sepY = 0
		let sepZ = 0

		this.grid.getEntitiesInCube(
			entity.x,
			entity.y,
			entity.z,
			this.separationRadius,
			(currentEntity) => {
				let distance = entity.getDistance(currentEntity)
				if (distance <= 0) {
					distance = 0.01
				}

				if (
					currentEntity != entity &&
					currentEntity.getType() == Entity.FLOCK_ENTITY &&
					distance < this.separationRadius
				) {
					const sx = entity.x - currentEntity.x
					const sy = entity.y - currentEntity.y
					const sz = entity.z - currentEntity.z
					sepX += sx / distance / distance
					sepY += sy / distance / distance
					sepZ += sz / distance / distance
				}
			}
		)

		return [sepX, sepY, sepZ]
	}

	/**
	 * Computes obstacle avoidance vector for the given entity
	 * @param {Entity} entity
	 * @returns {Array} obstacle avoidance vector
	 */
	computeObstacles(entity: Entity) {
		let avoidX = 0
		let avoidY = 0
		let avoidZ = 0

		this.grid.getEntitiesInCube(
			entity.x,
			entity.y,
			entity.z,
			this.obstacleRadius,
			(currentObstacle) => {
				const distance = entity.getDistance(currentObstacle)
				if (
					distance > 0 &&
					currentObstacle.getType() == Entity.OBSTACLE_ENTITY &&
					distance < this.obstacleRadius
				) {
					const ox = entity.x - currentObstacle.x
					const oy = entity.y - currentObstacle.y
					const oz = entity.z - currentObstacle.z
					avoidX += ox / distance / distance
					avoidY += oy / distance / distance
					avoidZ += oz / distance / distance
				}
			}
		)

		// avoid boundary limits
		const boundaryObstacleRadius = this.obstacleRadius / 4
		const distX = this.boundaryX - entity.x
		const distY = this.boundaryY - entity.y
		const distZ = this.boundaryZ - entity.z
		if (entity.x < boundaryObstacleRadius && Math.abs(entity.x) > 0) {
			avoidX += 1 / entity.x
		} else if (distX < boundaryObstacleRadius && distX > 0) {
			avoidX -= 1 / distX
		}
		if (entity.y < boundaryObstacleRadius && Math.abs(entity.y) > 0) {
			avoidY += 1 / entity.y
		} else if (distY < boundaryObstacleRadius && distY > 0) {
			avoidY -= 1 / distY
		}
		if (entity.z < boundaryObstacleRadius && Math.abs(entity.z) > 0) {
			avoidZ += 1 / entity.z
		} else if (distZ < boundaryObstacleRadius && distZ > 0) {
			avoidZ -= 1 / distZ
		}

		return [avoidX, avoidY, avoidZ]
	}

	/**
	 * This methods serializes the whole boids controller with entities and
	 * returns as a simple object.
	 * @returns {Object} serialized BoidsController data
	 */
	serialize() {
		const flockEntities: unknown[] = []
		const obstacleEntities: unknown[] = []
		this.flockEntities.forEach((entity) => {
			flockEntities.push(entity.serialize())
		})

		this.obstacleEntities.forEach((entity) => {
			obstacleEntities.push(entity.serialize())
		})

		return {
			subDivisionCount: this.subDivisionCount,
			boundaryX: this.boundaryX,
			boundaryY: this.boundaryY,
			boundaryZ: this.boundaryZ,
			flockEntities,
			obstacleEntities,
			aligmentWeight: this.aligmentWeight,
			cohesionWeight: this.cohesionWeight,
			separationWeight: this.separationWeight,
			maxEntitySpeed: this.maxEntitySpeed,
			aligmentRadius: this.aligmentRadius,
			cohesionRadius: this.cohesionRadius,
			separationRadius: this.separationRadius,
			obstacleRadius: this.obstacleRadius,
		}
	}

	/**
	 * This methods serializes only the boids data for the given start and end indices.
	 * @param {Number} start
	 * @param {Number} end
	 * @returns {Object} serialized partial boids data
	 */
	serializeBoidsData(start = 0, end = this.flockEntities.length) {
		const flockEntities = []
		for (let i = start; i < end; i++) {
			flockEntities.push(this.flockEntities[i].serialize())
		}
		return { start, flockEntities }
	}

	/**
	 * Applies the serialized boids data.
	 * @param {Object} data
	 */
	applyBoidsData(data: { start: number; flockEntities: Entity[] }) {
		const { start, flockEntities } = data

		for (let i = 0; i < flockEntities.length; i++) {
			const entity = this.flockEntities[start + i]
			const updatedData = flockEntities[i]
			if (entity.id == updatedData.id) {
				entity.updateData(updatedData)
			} else {
				console.log('ids do not match!')
			}
		}
	}

	/**
	 * This static method deserializes a boids controller data
	 * and creates a new BoidsController instance.
	 * @param {Object} data
	 * @returns {BoidsController} deserialized BoidsController instance
	 */
	static deserialize(data: {
		boundaryX: number
		boundaryY: number
		boundaryZ: number
		subDivisionCount: number
		aligmentWeight: number
		cohesionWeight: number
		separationWeight: number
		maxEntitySpeed: number
		aligmentRadius: number
		cohesionRadius: number
		separationRadius: number
		obstacleRadius: number
		flockEntities: Entity[]
		obstacleEntities: Entity[]
	}) {
		const controller = new BoidsController(
			data.boundaryX,
			data.boundaryY,
			data.boundaryZ,
			data.subDivisionCount
		)
		controller.aligmentWeight = data.aligmentWeight
		controller.cohesionWeight = data.cohesionWeight
		controller.separationWeight = data.separationWeight
		controller.maxEntitySpeed = data.maxEntitySpeed
		controller.aligmentRadius = data.aligmentRadius
		controller.cohesionRadius = data.cohesionRadius
		controller.separationRadius = data.separationRadius
		controller.obstacleRadius = data.obstacleRadius

		data.flockEntities.forEach((entityData) => {
			const entity = Entity.deserialize(entityData)
			controller.addFlockEntity(entity)
		})

		data.obstacleEntities.forEach((entityData) => {
			const entity = Entity.deserialize(entityData)
			controller.addObstacleEntity(entity)
		})

		return controller
	}
}
