import { drizzle } from "drizzle-orm/postgres-js";
import { PetRepository } from "#/adapter/repository/pet.repository";
import { PetCreationUseCase } from "#/core/application/use-case/pet.creation.use-case";
import type * as schemas from "../db/schema";

type Config = {
	databaseUrl: string;
};

class AppBootstrap {
	build(config: Config) {
		const db = drizzle<typeof schemas>(config.databaseUrl);
		const petRepository = new PetRepository(db);
		const petCreationUseCase = new PetCreationUseCase(petRepository);
		return { petCreationUseCase };
	}
}

export { AppBootstrap };
