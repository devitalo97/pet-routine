import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const petProfileSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	breed: z.string().min(1, "A raça é obrigatória"),
	specie: z.string().min(1, "A espécie é obrigatória"),
	birthday: z.date().optional(),
	weight: z.string().optional(),
	bio: z.string().optional(),
	imageUrl: z.string().optional(),
});

export type PetProfileFormValues = z.infer<typeof petProfileSchema>;

export function usePetProfileForm(initialData?: Partial<PetProfileFormValues>) {
	const [isEditing, setIsEditing] = useState(false);
	const [activeTab, setActiveTab] = useState<
		"caracteristicas" | "rotinas" | "fotos"
	>("caracteristicas");
	const [date, setDate] = useState<Date | undefined>(
		initialData?.birthday ? new Date(initialData.birthday) : undefined,
	);
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<PetProfileFormValues>({
		resolver: zodResolver(petProfileSchema),
		defaultValues: {
			name: initialData?.name || "Buddy",
			breed: initialData?.breed || "Golden Retriever",
			specie: initialData?.specie || "cachorro",
			birthday: initialData?.birthday || new Date("2021-06-15"),
			weight: initialData?.weight || "32",
			bio:
				initialData?.bio ||
				"Adora correr no parque e comer petiscos de maçã. É muito sociável com outros cachorros e ama um carinho na barriga depois do jantar.",
			imageUrl:
				initialData?.imageUrl ||
				"https://lh3.googleusercontent.com/aida-public/AB6AXuAg9XW__Skgx3jabvpKkIrIxuT6T8FcuKl2geyHS-kYC8IvJKKQi0QFR8GyZe4gru4q5c5B7gNW439IA8kIwJr35vrN_EweOGMOn0soeS5ORzxxKVHZUAOmIHiZL7y-8tWYffiFD2ccmffvUuL-g3qkob6R3m58f7OsVwTA5RpLuIDS8x3eYOgc_s7bGlM7IQx8O8byHNvHAY3vp8EYR4JOmov7zN503MkDyp1QjwbIZuWcUGAy6lYzHM8cWELhWWF-l2DjsKkfK3Dl",
		},
	});

	const onSubmit = async (values: PetProfileFormValues) => {
		try {
			// Mocking server update
			await new Promise((resolve) => setTimeout(resolve, 500));
			setIsEditing(false);

			toast("Perfil atualizado com sucesso", {
				position: "top-right",
				classNames: {
					content: "flex flex-col gap-2",
				},
				style: {
					"--border-radius": "calc(var(--radius)  + 4px)",
				} as React.CSSProperties,
			});
		} catch {
			toast.error("Falha ao atualizar perfil", {
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

	const calculateAge = (birthDateString?: Date) => {
		if (!birthDateString) return "Desconhecida";
		const birth = new Date(birthDateString);
		const today = new Date();
		let years = today.getFullYear() - birth.getFullYear();
		const monthDiff = today.getMonth() - birth.getMonth();
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birth.getDate())
		) {
			years--;
		}
		if (years === 0) {
			const months =
				(today.getFullYear() - birth.getFullYear()) * 12 +
				today.getMonth() -
				birth.getMonth();
			return `${months} ${months === 1 ? "mês" : "meses"}`;
		}
		return `${years} ${years === 1 ? "ano" : "anos"}`;
	};

	return {
		form,
		isEditing,
		setIsEditing,
		activeTab,
		setActiveTab,
		date,
		setDate,
		isOpen,
		setIsOpen,
		onSubmit,
		calculateAge,
	};
}
