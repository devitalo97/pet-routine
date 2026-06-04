import type { Entity, EntityData } from "./entity";

interface IRepository<E extends Entity<EntityData>> {
	insert(entity: E): Promise<void>;
	update(entity: E): Promise<void>;
	delete(id: string): Promise<void>;
	findById(id: string): Promise<E | null>;
}

export type { IRepository };
