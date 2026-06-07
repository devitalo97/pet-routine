import { createFileRoute, isNotFound, notFound } from "@tanstack/react-router";
import { NotFoundEntityPage } from "#/components/page/entity.not-found.page";
import { ErrorPage } from "#/components/page/error.page";
import { PetProfilePage } from "#/components/page/pet.profile.page";
import { findOnePetFn } from "#/lib/function/pet.function";

export const Route = createFileRoute("/_protected/pet/profile/$id")({
	notFoundComponent: () => (
		<NotFoundEntityPage title="Não foi possível encontrar o pet" />
	),
	errorComponent: ({ error }) => <ErrorPage title={error.message} />,
	component: PetProfilePage,
	loader: async ({ params }) => {
		try {
			const pet = await findOnePetFn({ data: { id: params.id.toString() } });
			if (!pet) throw notFound();
			return pet;
		} catch (error) {
			if (isNotFound(error)) {
				throw error;
			}
			throw Error("Erro ao buscar o pet");
		}
	},
});
