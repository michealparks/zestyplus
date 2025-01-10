import type { Grid } from './grid'

let idCounter = 0

/**
 * @module Entity
 * Entity class defines an entitiy model which has a position and a velocity.
 * Also it has some utiliy methods.
 */
export class Entity {
	id: number
	type: number
	x: number
	y: number
	z: number
	vx: number
	vy: number
	vz: number
	grid: Grid | undefined = undefined
	localVelocity = { x: 0, y: 0, z: 0 }

	static FLOCK_ENTITY = 1
	static OBSTACLE_ENTITY = 1

	/**
	 * Constructor for the Entity class
	 * @param type entitiy type that defines it as flock or obstacle entitiy
	 * @param x x position
	 * @param y y position
	 * @param z z position
	 * @param vx x velocity
	 * @param vy y velocity
	 * @param vz z velocity
	 */
	constructor(type: number, x = 0, y = 0, z = 0, vx = 0, vy = 0, vz = 0) {
		this.id = ++idCounter
		this.type = type
		this.x = x
		this.y = y
		this.z = z
		this.vx = vx
		this.vy = vy
		this.vz = vz
	}

	/**
	 * Sets the grid instance
	 */
	setGrid(grid: Grid | undefined) {
		this.grid = grid
	}

	/**
	 * @returns type of the entity
	 */
	getType(): number {
		return this.type
	}

	/**
	 * @returns the current scalar velocity of the entity.
	 */
	getVelocity(): number {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy + this.vz * this.vz)
	}

	/**
	 * Checks the velocity of the entitiy and limits it to the given parameter
	 */
	checkVelocity(maxVelocity = 1) {
		const velocity = this.getVelocity()
		if (velocity > maxVelocity && velocity > 0) {
			this.vx = (maxVelocity * this.vx) / velocity
			this.vy = (maxVelocity * this.vy) / velocity
			this.vz = (maxVelocity * this.vz) / velocity
		}
	}

	/**
	 * This method adds the given velocity to the current velocity.
	 * @param vx x velocity
	 * @param vy y velocity
	 * @param vz z velocity
	 */
	addVelocity(vx: number, vy: number, vz: number) {
		this.vx += vx
		this.vy += vy
		this.vz += vz
	}

	/**
	 * This method moves the entity.
	 */
	move(maxVelocity: number, bx: number, by: number, bz: number): void {
		this.checkVelocity(maxVelocity)

		let nx = this.x + this.vx
		let ny = this.y + this.vy
		let nz = this.z + this.vz

		nx = Math.max(0, nx)
		nx = Math.min(bx, nx)
		ny = Math.max(0, ny)
		ny = Math.min(by, ny)
		nz = Math.max(0, nz)
		nz = Math.min(bz, nz)

		this.grid?.moveEntity(this, nx, ny, nz)
	}

	/**
	 * Calculate the distance between the entity and the given entity
	 * @returns {Number} the distance between two entities
	 */
	getDistance(otherEntity: Entity) {
		const dx = this.x - otherEntity.x
		const dy = this.y - otherEntity.y
		const dz = this.z - otherEntity.z
		return Math.sqrt(dx * dx + dy * dy + dz * dz)
	}

	/**
	 * Serialize the entitiy
	 */
	serialize() {
		const { id, type, x, y, z, vx, vy, vz } = this
		return {
			id,
			type,
			x,
			y,
			z,
			vx,
			vy,
			vz,
		}
	}

	/**
	 * Updates the internal data of the entity if the IDs match
	 * @param {Object} data
	 */
	updateData(data: {
		id: number
		vx: number
		vy: number
		vz: number
		x: number
		y: number
		z: number
	}) {
		if (this.id == data.id) {
			this.vx = data.vx
			this.vy = data.vy
			this.vz = data.vz
			this.grid?.moveEntity(this, data.x, data.y, data.z)
		}
	}

	/**
	 * This static method deserializes the given data and returns new Entity instance.
	 * @returns deserialized Entitiy instance
	 */
	static deserialize(data: {
		type: number
		id: number
		vx: number
		vy: number
		vz: number
		x: number
		y: number
		z: number
	}): Entity {
		const e = new Entity(
			data.type,
			data.x,
			data.y,
			data.z,
			data.vx,
			data.vy,
			data.vz
		)
		e.id = data.id
		return e
	}
}
