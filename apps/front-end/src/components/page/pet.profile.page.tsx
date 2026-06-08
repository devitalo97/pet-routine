import { PetProfileForm } from "#/components/form/pet/profile/pet.profile.form";
import { Route } from "#/routes/_protected/pet/profile.$id";

function PetProfilePage() {
	const pet = Route.useLoaderData();
	return <PetProfileForm pet={pet} />;
}

export { PetProfilePage };
