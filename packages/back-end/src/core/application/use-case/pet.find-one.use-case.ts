import type { IUseCase } from "#/core/application/@shared/use-case.interface";
import type { IPetRepository } from "#/core/domain/pet/pet.repository.interface";

type Input = {
	id: string;
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
} | null;

class PetFindOneUseCase implements IUseCase<Input, Output> {
	constructor(private readonly repository: IPetRepository) {}

	async execute(data: Input): Promise<Output> {
		const pet = await this.repository.findById(data.id);

		if (!pet) return null;

		return pet.toState();
	}
}

export {
	type Input as PetFindOneInput,
	type Output as PetFindOneOutput,
	PetFindOneUseCase,
};
