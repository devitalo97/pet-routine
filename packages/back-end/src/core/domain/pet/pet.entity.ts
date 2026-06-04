import { randomUUIDv7 } from "bun";
import { Entity, type EntityData } from "#/core/domain/@shared/entity";

type Data = EntityData & {
	name: string;
	sex: "male" | "female";
	birthday: Date;
	breed: string;
	specie: string;
};

class Pet extends Entity<Data> {
	private state: Data;

	constructor(props: Data) {
		super();
		this.state = props;
	}

	static create(props: Omit<Data, "id" | "createdAt" | "updatedAt">): Pet {
		return new Pet({
			id: randomUUIDv7(),
			createdAt: new Date(),
			updatedAt: new Date(),
			...props,
		});
	}

	toState(): Data {
		return this.state;
	}
}

export { type Data as PetData, Pet };
