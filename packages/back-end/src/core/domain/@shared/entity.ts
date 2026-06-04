type EntityData = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
};

abstract class Entity<Data extends EntityData> {
	abstract toState(): Data;

	static restore<S extends EntityData, T extends Entity<S>>(
		this: new (
			props: S,
		) => T,
		props: S,
	): T {
		return new this(props);
	}
}

export { Entity, type EntityData };
