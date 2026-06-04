import type { IUseCase } from "#/core/application/@shared/use-case.interface";
import { Pet } from "#/core/domain/pet/pet.entity";
import type { IPetRepository } from "#/core/domain/pet/pet.repository.interface";

type Input = {
	name: string;
	breed: string;
	specie: string;
	sex: "male" | "female";
	birthday: Date;
	weight: number;
};

type Output = {
	id: string;
	name: string;
	breed: string;
	specie: string;
	sex: "male" | "female";
	birthday: Date;
	createdAt: Date;
	updatedAt: Date;
};

class PetCreationUseCase implements IUseCase<Input, Output> {
	constructor(private readonly repository: IPetRepository) {}

	async execute(data: Input): Promise<Output> {
		const pet = Pet.create(data);
		await this.repository.insert(pet);
		return pet.toState();
	}
}

export {
	type Input as PetCreationInput,
	type Output as PetCreationOutput,
	PetCreationUseCase,
};
