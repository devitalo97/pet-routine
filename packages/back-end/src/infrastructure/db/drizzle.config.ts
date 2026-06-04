import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/infrastructure/db/migration",
	schema: "./src/infrastructure/db/schema/*.schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
