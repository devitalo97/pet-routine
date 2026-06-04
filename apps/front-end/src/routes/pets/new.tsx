import { createFileRoute } from "@tanstack/react-router";
import { PetCreationPage } from "#/components/page/pet.creation.page";

export const Route = createFileRoute("/pets/new")({
	component: PetCreationPage,
});
