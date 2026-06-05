import { AppBootstrap } from "@pack/back-end";

const globalForBackend = globalThis as unknown as {
	backendInstance: ReturnType<AppBootstrap["build"]> | undefined;
};

export const backend =
	globalForBackend.backendInstance ??
	new AppBootstrap().build({
		databaseUrl: process.env.DATABASE_URL as string,
	});

if (process.env.NODE_ENV !== "production") {
	globalForBackend.backendInstance = backend;
}
