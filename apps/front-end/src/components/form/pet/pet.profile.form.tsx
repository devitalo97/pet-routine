import type { PetData } from "@pack/back-end/core/domain/pet/pet.entity";
import { format } from "date-fns";
import {
	Bell,
	Calendar as CalendarIcon,
	Camera,
	Check,
	Heart,
	PawPrint,
	Pencil,
	Plus,
	Scale,
	X,
} from "lucide-react";
import { Controller, FormProvider } from "react-hook-form";
import { Calendar } from "#/components/ui/calendar";
import { Label } from "#/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import { cn } from "#/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePetProfileForm } from "./use-pet.profile.form";

const speciesOptions = [
	{ value: "cachorro", label: "Cachorro" },
	{ value: "gato", label: "Gato" },
	{ value: "passaro", label: "Pássaro" },
	{ value: "coelho", label: "Coelho" },
	{ value: "hamster", label: "Hamster" },
	{ value: "outro", label: "Outro" },
];

const breedsBySpecies: Record<string, { value: string; label: string }[]> = {
	cachorro: [
		{ value: "golden retriever", label: "Golden Retriever" },
		{ value: "labrador", label: "Labrador" },
		{ value: "bulldog", label: "Bulldog" },
		{ value: "poodle", label: "Poodle" },
		{ value: "beagle", label: "Beagle" },
		{ value: "outro", label: "Outro" },
	],
	gato: [
		{ value: "persa", label: "Persa" },
		{ value: "siames", label: "Siamês" },
		{ value: "maine coon", label: "Maine Coon" },
		{ value: "ragdoll", label: "Ragdoll" },
		{ value: "outro", label: "Outro" },
	],
};

function PetProfileForm({ pet }: { pet: PetData }) {
	const {
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
	} = usePetProfileForm(pet);

	const values = form.watch();

	const handleCancel = () => {
		form.reset();
		setIsEditing(false);
	};

	return (
		<div className="min-h-screen bg-background relative pb-24">
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
					{/* Hero Section */}
					<section className="pt-24 pb-8 bg-gradient-to-b from-primary-fixed to-background flex flex-col items-center relative overflow-hidden transition-all duration-300">
						<div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl"></div>
						<div className="absolute bottom-0 left-0 -ml-16 w-48 h-48 bg-primary opacity-5 rounded-full blur-2xl"></div>

						<div className="relative w-32 h-32 mb-6 z-10 group">
							<div className="relative w-full h-full">
								<img
									alt={values.name || "Foto do pet"}
									className="w-full h-full object-cover rounded-full border-4 border-surface shadow-xl"
									src={values.imageUrl}
								/>
								{isEditing && (
									<button
										type="button"
										className="absolute inset-0 rounded-full bg-on-surface/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
									>
										<Camera className="h-8 w-8 text-white" />
									</button>
								)}
							</div>

							{/* Edit button (view mode only) */}
							{!isEditing && (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="absolute -right-2 -top-2 bg-surface shadow-lg rounded-full hover:bg-primary-fixed"
									onClick={() => setIsEditing(true)}
								>
									<Pencil className="h-4 w-4 text-primary" />
								</Button>
							)}
						</div>

						<div className="w-full max-w-lg px-6 flex flex-col items-center">
							{isEditing ? (
								<Field className="w-full text-center">
									<Input
										type="text"
										placeholder="Qual o nome do seu parceiro?"
										className="w-full h-auto py-2 font-display-lg text-3xl md:text-4xl text-center text-on-surface font-extrabold z-10 tracking-tight bg-transparent border-none focus-visible:ring-0 placeholder:text-slate-300 transition-all shadow-none"
										{...form.register("name")}
									/>
									<FieldError
										errors={[form.formState.errors.name]}
										className="text-center"
									/>
								</Field>
							) : (
								<h1 className="font-display-lg text-4xl text-on-surface font-extrabold z-10 tracking-tight mb-2">
									{values.name}
								</h1>
							)}

							<div className="flex gap-2 mt-3 z-10 w-full justify-center">
								{isEditing ? (
									<>
										<Field className="flex-1 max-w-[140px]">
											<Controller
												control={form.control}
												name="specie"
												render={({ field }) => (
													<Select
														onValueChange={(val) => {
															field.onChange(val);
															form.setValue("breed", ""); // Reset breed when species changes
														}}
														defaultValue={field.value}
													>
														<SelectTrigger className="px-4 py-2 h-auto bg-primary-fixed text-primary font-label-sm text-xs uppercase rounded-full shadow-sm font-bold tracking-wider border-none focus:ring-2 focus:ring-primary outline-none cursor-pointer text-center flex-1 justify-center">
															<SelectValue placeholder="Espécie" />
														</SelectTrigger>
														<SelectContent>
															{speciesOptions.map((opt) => (
																<SelectItem key={opt.value} value={opt.value}>
																	{opt.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												)}
											/>
										</Field>
										<Field className="flex-1 max-w-[160px]">
											<Controller
												control={form.control}
												name="breed"
												render={({ field }) => (
													<Select
														onValueChange={field.onChange}
														value={field.value}
													>
														<SelectTrigger className="px-4 py-2 h-auto bg-surface-container text-on-surface font-label-sm text-xs uppercase rounded-full shadow-sm font-bold tracking-wider border-none focus-visible:ring-2 focus-visible:ring-primary outline-none text-center flex-1 justify-center">
															<SelectValue placeholder="Raça" />
														</SelectTrigger>
														<SelectContent>
															{(
																breedsBySpecies[
																	values.specie?.toLowerCase()
																] || [
																	{
																		value: values.breed || "outro",
																		label: values.breed || "Outro",
																	},
																]
															).map((opt) => (
																<SelectItem key={opt.value} value={opt.value}>
																	{opt.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												)}
											/>
										</Field>
									</>
								) : (
									<>
										<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs uppercase rounded-full shadow-sm">
											{values.specie}
										</span>
										<span className="px-3 py-1 bg-surface-container text-on-surface font-label-sm text-xs uppercase rounded-full shadow-sm">
											{values.breed}
										</span>
									</>
								)}
							</div>
						</div>
					</section>

					{/* Navigation Tabs */}
					<div className="px-6 mb-8 sticky top-16 z-40 bg-background/90 backdrop-blur-sm py-2">
						<div className="flex bg-surface-container-high p-1 rounded-full w-full max-w-md mx-auto shadow-sm">
							<button
								type="button"
								className={cn(
									"flex-1 py-2 font-label-sm text-xs uppercase text-center rounded-full transition-all duration-300 ease-out",
									activeTab === "caracteristicas"
										? "bg-surface shadow-md text-primary"
										: "text-on-surface-variant hover:bg-surface-variant/80",
								)}
								onClick={() => setActiveTab("caracteristicas")}
							>
								Características
							</button>
							<button
								type="button"
								className={cn(
									"flex-1 py-2 font-label-sm text-xs uppercase text-center rounded-full transition-all duration-300 ease-out",
									activeTab === "rotinas"
										? "bg-surface shadow-md text-primary"
										: "text-on-surface-variant hover:bg-surface-variant/80",
								)}
								onClick={() => setActiveTab("rotinas")}
							>
								Rotinas
							</button>
							<button
								type="button"
								className={cn(
									"flex-1 py-2 font-label-sm text-xs uppercase text-center rounded-full transition-all duration-300 ease-out",
									activeTab === "fotos"
										? "bg-surface shadow-md text-primary"
										: "text-on-surface-variant hover:bg-surface-variant/80",
								)}
								onClick={() => setActiveTab("fotos")}
							>
								Fotos
							</button>
						</div>
					</div>

					{/* Main Content Area */}
					<main className="px-6 max-w-4xl mx-auto">
						{/* TAB: Características */}
						{activeTab === "caracteristicas" && (
							<section className="block animate-[fadeIn_0.3s_ease-out]">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Idade Field */}
									<Card className="rounded-2xl shadow-sm border-slate-100 hover:border-primary/20 transition-all overflow-hidden border">
										<CardContent className="p-6 flex items-center gap-4">
											<div className="w-14 h-14 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
												<CalendarIcon className="w-6 h-6" />
											</div>
											<div className="flex-1">
												<Label className="font-label-sm text-xs uppercase font-bold tracking-widest text-slate-500 mb-2 block">
													Idade
												</Label>
												{isEditing ? (
													<Field className="flex-1">
														<Controller
															control={form.control}
															name="birthday"
															render={({ field }) => (
																<Popover open={isOpen} onOpenChange={setIsOpen}>
																	<PopoverTrigger asChild>
																		<Button
																			variant={"outline"}
																			className={cn(
																				"w-full justify-start bg-surface-container-lowest border-slate-100 rounded-xl px-3 py-5 font-body-md text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-none",
																				!date && "text-muted-foreground",
																			)}
																		>
																			{date ? (
																				format(date, "PPP")
																			) : (
																				<span>Pick a date</span>
																			)}
																		</Button>
																	</PopoverTrigger>
																	<PopoverContent className="w-auto p-0">
																		<Calendar
																			mode="single"
																			selected={date}
																			captionLayout="dropdown"
																			onSelect={(selectedDate) => {
																				setDate(selectedDate);
																				field.onChange(selectedDate);
																				setIsOpen(false);
																			}}
																		/>
																	</PopoverContent>
																</Popover>
															)}
														/>
														<FieldError
															errors={[form.formState.errors.birthday]}
														/>
													</Field>
												) : (
													<p className="font-display-lg text-2xl font-semibold text-on-surface">
														{calculateAge(values.birthday)}
													</p>
												)}
											</div>
										</CardContent>
									</Card>

									{/* Peso Field */}
									<Card className="rounded-2xl shadow-sm border-slate-100 hover:border-primary/20 transition-all overflow-hidden border">
										<CardContent className="p-6 flex items-center gap-4">
											<div className="w-14 h-14 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
												<Scale className="w-6 h-6" />
											</div>
											<div className="flex-1">
												<Label className="font-label-sm text-xs uppercase font-bold tracking-widest text-slate-500 mb-2 block">
													Peso
												</Label>
												{isEditing ? (
													<Field className="flex-1">
														<div className="flex items-center gap-2">
															<Input
																type="number"
																placeholder="Quanto ele pesa?"
																className="w-full bg-surface-container-lowest border-slate-100 rounded-xl px-3 py-5 font-body-md text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-none"
																{...form.register("weight")}
															/>
															<span className="font-body-md font-semibold text-on-surface">
																kg
															</span>
														</div>
														<FieldError
															errors={[form.formState.errors.weight]}
														/>
													</Field>
												) : (
													<p className="font-display-lg text-2xl font-semibold text-on-surface">
														{values.weight
															? `${values.weight} kg`
															: "Não informado"}
													</p>
												)}
											</div>
										</CardContent>
									</Card>

									{/* Personalidade/Sobre */}
									<Card className="rounded-2xl shadow-sm border-slate-100 p-0 md:col-span-2 relative overflow-hidden group border">
										<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary z-10"></div>
										<CardContent className="p-6 flex flex-col justify-center">
											<div className="flex items-center gap-2 mb-4">
												<Heart className="w-5 h-5 text-primary" />
												<h3 className="font-label-sm text-xs uppercase font-bold tracking-widest text-slate-500">
													Sobre {values.name ? `o ${values.name}` : "o pet"}
												</h3>
											</div>
											{isEditing ? (
												<Field>
													<Textarea
														placeholder="Conte um pouco sobre as manias e o jeito dele..."
														rows={4}
														className="w-full bg-surface-container-lowest border-slate-100 rounded-xl px-4 py-3 font-body-md text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all resize-none shadow-none"
														{...form.register("bio")}
													/>
													<FieldError errors={[form.formState.errors.bio]} />
												</Field>
											) : (
												<p className="font-body-md text-base text-on-surface leading-relaxed">
													{values.bio || "Nenhuma bio informada."}
												</p>
											)}
										</CardContent>
									</Card>
								</div>

								{/* Action Buttons */}
								{isEditing && (
									<div className="flex gap-3 mt-8 justify-center mb-12">
										<Button
											type="button"
											variant="outline"
											size="lg"
											onClick={handleCancel}
											className="rounded-full px-8 border-outline-variant font-headline-lg-mobile text-base"
										>
											<X className="h-4 w-4 mr-2" />
											Cancelar
										</Button>
										<Button
											type="submit"
											size="lg"
											className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-headline-lg-mobile text-base"
											disabled={form.formState.isSubmitting}
										>
											<Check className="h-4 w-4 mr-2" />
											Salvar Alterações
										</Button>
									</div>
								)}
							</section>
						)}

						{/* TAB: Rotinas */}
						{activeTab === "rotinas" && (
							<section className="block animate-[fadeIn_0.3s_ease-out]">
								<div className="flex justify-between items-center mb-6">
									<h2 className="font-headline-lg-mobile text-2xl font-semibold text-on-surface">
										Hoje
									</h2>
									<Button className="bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 font-label-sm uppercase text-xs h-auto py-2">
										<Plus className="h-4 w-4 mr-1" />
										Adicionar
									</Button>
								</div>

								{/* Timeline */}
								<div className="relative border-l-2 border-surface-variant ml-4 space-y-8 pb-8">
									{/* Item 1 */}
									<div className="relative pl-8">
										<div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-surface shadow-md flex items-center justify-center border-2 border-background">
											<Check className="h-4 w-4 text-primary" />
										</div>
										<Card className="rounded-2xl shadow-sm border-slate-100 hover:shadow-md transition-shadow">
											<CardContent className="p-5">
												<div className="flex justify-between items-start mb-2">
													<h3 className="font-headline-lg-mobile text-xl font-semibold text-on-surface">
														Alimentação
													</h3>
													<span className="font-label-sm text-xs uppercase text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">
														08:00 AM
													</span>
												</div>
												<p className="font-body-md text-base text-on-surface-variant">
													Ração seca, 2 copos.
												</p>
											</CardContent>
										</Card>
									</div>

									{/* Item 2 */}
									<div className="relative pl-8">
										<div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-primary text-white shadow-md flex items-center justify-center border-2 border-background">
											<PawPrint className="h-4 w-4" />
										</div>
										<Card className="rounded-2xl shadow-sm border-primary-fixed border hover:shadow-md transition-shadow">
											<CardContent className="p-5">
												<div className="flex justify-between items-start mb-2">
													<h3 className="font-headline-lg-mobile text-xl font-semibold text-on-surface">
														Passeio
													</h3>
													<span className="font-label-sm text-xs uppercase text-primary bg-primary-container px-2 py-1 rounded-md">
														10:00 AM
													</span>
												</div>
												<p className="font-body-md text-base text-on-surface-variant">
													Parque da cidade, 45 minutos.
												</p>
											</CardContent>
										</Card>
									</div>

									{/* Item 3 (Completed) */}
									<div className="relative pl-8 opacity-60">
										<div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant shadow-sm flex items-center justify-center border-2 border-background">
											<Check className="h-4 w-4" />
										</div>
										<Card className="rounded-2xl bg-surface-container border-none shadow-none">
											<CardContent className="p-5">
												<div className="flex justify-between items-start mb-2">
													<h3 className="font-headline-lg-mobile text-xl font-semibold text-on-surface line-through">
														Vitamina
													</h3>
													<span className="font-label-sm text-xs uppercase text-on-surface-variant">
														07:30 AM
													</span>
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
							</section>
						)}

						{/* TAB: Fotos */}
						{activeTab === "fotos" && (
							<section className="block animate-[fadeIn_0.3s_ease-out]">
								<div className="flex justify-end mb-4">
									<Button
										variant="secondary"
										className="bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed rounded-full shadow-sm font-label-sm uppercase text-xs h-auto py-2"
									>
										<Camera className="h-4 w-4 mr-2" />
										Fazer upload
									</Button>
								</div>

								{/* Masonry Grid */}
								<div className="columns-2 gap-4 space-y-4">
									<div className="break-inside-avoid">
										<img
											alt={`${values.name || "Pet"} brincando`}
											className="w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq-FPfu2CFlkyTaqdnf7uDgBnwV2COJkl0qU8-RupR9FZAtFDG9aI6qTpzLJNyk09mRbbFwTR96G1CgbNakK0V4Ua2VKAgrECOKniyPWi27NhUcinCflebg0RajDwRmjn6fWQRd3_wopy4SilLrniHWYHvlQwPEzSmEHb08hYXu0f1DekkptR2UiCyx8i8_kclDvibo5hOvkInq-ysf02yCbY-C_7AR4mRvKAL4K75lWp2LDAE8of1PJxr6rra4KywZOesLohz7Pb_"
										/>
									</div>
									<div className="break-inside-avoid">
										<img
											alt={`${values.name || "Pet"} dormindo`}
											className="w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR4VGl2yIELfN1YPwpD3jwgAEDt_vFA-QJz3UbcqJRBMN32oCs2Q80lRYqlWa0bjbxafLU3i2TMjc7pnLQMCGvkn8jW6-cv6g3-0TvMaULiP_8lZwkeNf6vuXrasf2r5YmPSuYy6Q4THi4bwTbLE1CFqCU4R873e4CaWIvQcalbXcpQC46PijdImz8YaN6GAaxc_o4J0MldsODc3nDxVGEor6Q_Vi-AKCKGUfYMbH6IxklCMfXy0S9-Yapo7Bo7CuqCTwycCG5q7fD"
										/>
									</div>
									<div className="break-inside-avoid">
										<img
											alt={`Retrato do ${values.name || "Pet"}`}
											className="w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp1ltwygaSQ0xbi_dtupSDg8iacX3ycmQELOIxErWGI3_XD6tNfitgOZe9QDdDn78gsOm1qnOUh03AumOwy86ECh3vFXvdh4F3b3VWcDfP7c_jLWvXLp-_im5-Q-7PFmQST1l8jCEq5vNvCcClHqNjr6eh0FMBcXYhKFrmCOD4uIM-HGqxQ2LLnPm7Pmcd78OGMkv3sPEPdX6EgddhBKwJUqFko6kD8e5RQZv0ZLkPwJob6BaOE6BX3DTQgkbNlrzyq-dM0gu91yqf"
										/>
									</div>
								</div>
							</section>
						)}
					</main>
				</form>
			</FormProvider>
		</div>
	);
}

export { PetProfileForm };
