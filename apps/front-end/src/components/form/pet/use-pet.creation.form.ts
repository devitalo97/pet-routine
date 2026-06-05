import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const createPetSchema = z.object({
	name: z.string().min(1),
	breed: z.string().min(1),
	specie: z.string().min(1),
	sex: z.enum(["male", "female"]),
	birthday: z.string(),
});

function usePetCreationForm() {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<z.infer<typeof createPetSchema>>({
		resolver: zodResolver(createPetSchema),
		defaultValues: {
			name: "",
			breed: "",
			specie: "",
			sex: "male",
			birthday: "",
		},
	});

	return { form, date, setDate, isOpen, setIsOpen };
}

export { usePetCreationForm };
