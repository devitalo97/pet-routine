import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	plugins: [tanstackStartCookies()],
});
