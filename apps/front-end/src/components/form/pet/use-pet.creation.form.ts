import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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

	return { form, date, setDate, isOpen, setIsOpen };
}

export { usePetCreationForm };
