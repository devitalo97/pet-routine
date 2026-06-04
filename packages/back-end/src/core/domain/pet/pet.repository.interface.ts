import type { IRepository } from "#/core/domain/@shared/repository.interface";
import type { Pet } from "./pet.entity";

interface IPetRepository extends IRepository<Pet> {}

export type { IPetRepository };
