import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const petTable = pgTable("pet", {
	id: uuid().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	breed: varchar({ length: 255 }).notNull(),
	specie: varchar({ length: 255 }).notNull(),
	sex: varchar({ length: 255 }).notNull(),
	birthday: timestamp({ withTimezone: true }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
