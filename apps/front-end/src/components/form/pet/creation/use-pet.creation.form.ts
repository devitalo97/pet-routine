import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { createPetFn } from "@/lib/function/pet.function";

const createPetSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	breed: z.string().min(1, "A raça é obrigatória"),
	specie: z.string().min(1, "A espécie é obrigatória"),
	birthday: z.string().optional(),
	weight: z.string().optional(),
	bio: z.string().optional(),
});

function usePetCreationForm() {
	const [date, setDate] = useState<Date | undefined>();
	const [isOpen, setIsOpen] = useState(false);

	const submitPet = useServerFn(createPetFn);

	const form = useForm<z.infer<typeof createPetSchema>>({
		resolver: zodResolver(createPetSchema),
		defaultValues: {
			name: "",
			breed: "",
			specie: "",
			birthday: "",
			weight: "",
			bio: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof createPetSchema>) => {
		try {
			await submitPet({
				data: {
					name: values.name,
					breed: values.breed,
					specie: values.specie,
					sex: "male",
					birthday: values.birthday ? new Date(values.birthday) : new Date(),
				},
			});

			toast("Pet created successfully", {
				position: "top-right",
				classNames: {
					content: "flex flex-col gap-2",
				},
				style: {
					"--border-radius": "calc(var(--radius)  + 4px)",
				} as React.CSSProperties,
			});
		} catch {
			toast.error("Failed to create pet", {
				position: "top-right",
				classNames: {
					content: "flex flex-col gap-2",
				},
				style: {
					"--border-radius": "calc(var(--radius)  + 4px)",
				} as React.CSSProperties,
			});
		}
	};

	return { form, date, setDate, isOpen, setIsOpen, onSubmit };
}

export { usePetCreationForm };
