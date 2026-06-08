const speciesOptions = [
	{ value: "dog", label: "Dog" },
	{ value: "cat", label: "Cat" },
	{ value: "bird", label: "Bird" },
	{ value: "rabbit", label: "Rabbit" },
	{ value: "hamster", label: "Hamster" },
	{ value: "other", label: "Other" },
];

const breedsBySpecies: Record<string, { value: string; label: string }[]> = {
	dog: [
		{ value: "golden retriever", label: "Golden Retriever" },
		{ value: "labrador", label: "Labrador" },
		{ value: "bulldog", label: "Bulldog" },
		{ value: "poodle", label: "Poodle" },
		{ value: "beagle", label: "Beagle" },
		{ value: "other", label: "Other" },
	],
	cat: [
		{ value: "persa", label: "Persa" },
		{ value: "siames", label: "Siamês" },
		{ value: "maine coon", label: "Maine Coon" },
		{ value: "ragdoll", label: "Ragdoll" },
		{ value: "other", label: "Other" },
	],
};

export { breedsBySpecies, speciesOptions };
