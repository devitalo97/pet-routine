import { format } from "date-fns";
import { CalendarIcon, Check, Heart, Scale, X } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "#/components/ui/button";
import { Calendar } from "#/components/ui/calendar";
import { Card, CardContent } from "#/components/ui/card";
import { Field, FieldError } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import { Textarea } from "#/components/ui/textarea";
import { cn } from "#/lib/utils";
import type { PetProfileFormValues } from "./use-pet.profile.form";

function CharacteristicsForm({
	form,
	values,
	isEditing,
	date,
	setDate,
	isOpen,
	setIsOpen,
	calculateAge,
	handleCancel,
}: {
	form: UseFormReturn<PetProfileFormValues>;
	values: PetProfileFormValues;
	isEditing: boolean;
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	calculateAge: (birthday: Date | undefined) => string;
	handleCancel: () => void;
}) {
	return (
		<section className="block animate-[fadeIn_0.3s_ease-out]">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Idade Field */}
				<Card className="rounded-2xl shadow-sm border-slate-100 hover:border-primary/20 transition-all overflow-hidden border">
					<CardContent className="flex items-center gap-4">
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
															format(date, "dd/MM/yyyy")
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
									<FieldError errors={[form.formState.errors.birthday]} />
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
					<CardContent className="flex items-center gap-4">
						<div className="w-14 h-14 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
							<Scale className="w-6 h-6" />
						</div>
						<div className="flex-1">
							<Label className="font-label-sm text-xs uppercase font-bold tracking-widest text-slate-500 mb-2 block">
								Weight (kg)
							</Label>
							{isEditing ? (
								<Field className="flex-1">
									<Input
										type="number"
										placeholder="Quanto ele pesa?"
										className="w-full bg-surface-container-lowest border-slate-100 rounded-xl px-3 py-5 font-body-md text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-none"
										{...form.register("weight")}
									/>
									<FieldError errors={[form.formState.errors.weight]} />
								</Field>
							) : (
								<p className="font-display-lg text-2xl font-semibold text-on-surface">
									{values.weight ? `${values.weight} kg` : "Não informado"}
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Personalidade/Sobre */}
				<Card className="rounded-2xl shadow-sm border-slate-100 md:col-span-2 relative overflow-hidden group border">
					<CardContent className="flex flex-col justify-center">
						<div className="flex items-center gap-2 mb-4">
							<Heart className="w-5 h-5 text-primary" />
							<h3 className="font-label-sm text-xs uppercase font-bold tracking-widest text-slate-500">
								About {values.name ? `the ${values.name}` : "the pet"}
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
	);
}

export { CharacteristicsForm };
