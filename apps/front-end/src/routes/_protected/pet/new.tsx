import { createFileRoute } from "@tanstack/react-router";
import { PetCreationPage } from "#/components/page/pet.creation.page";

export const Route = createFileRoute("/_protected/pet/new")({
	component: PetCreationPage,
});
