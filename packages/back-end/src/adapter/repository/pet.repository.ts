import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { Pet } from "#/core/domain/pet/pet.entity";
import type { IPetRepository } from "#/core/domain/pet/pet.repository.interface";
import { petTable } from "#/infrastructure/db/schema/pet.schema";

class PetRepository implements IPetRepository {
	constructor(
		private readonly db: PostgresJsDatabase<{ petTable: typeof petTable }>,
	) {}

	async insert(entity: Pet): Promise<void> {
		const state = entity.toState();
		await this.db.insert(petTable).values({
			id: state.id,
			name: state.name,
			breed: state.breed,
			specie: state.specie,
			sex: state.sex,
			birthday: state.birthday,
			createdAt: state.createdAt,
			updatedAt: state.updatedAt,
		});
	}

	async update(entity: Pet): Promise<void> {
		const state = entity.toState();
		await this.db
			.update(petTable)
			.set({
				name: state.name,
				breed: state.breed,
				specie: state.specie,
				sex: state.sex,
				birthday: state.birthday,
				updatedAt: state.updatedAt,
			})
			.where(eq(petTable.id, state.id));
	}

	async delete(id: string): Promise<void> {
		await this.db.delete(petTable).where(eq(petTable.id, id));
	}

	async findById(id: string): Promise<Pet | null> {
		const [row] = await this.db
			.select()
			.from(petTable)
			.where(eq(petTable.id, id));

		if (!row) {
			return null;
		}

		return Pet.restore({
			id: row.id,
			name: row.name,
			breed: row.breed,
			specie: row.specie,
			sex: row.sex as "male" | "female",
			birthday: row.birthday,
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
		});
	}
}

export { PetRepository };
