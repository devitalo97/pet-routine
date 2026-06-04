import { Calendar, Heart, PawPrint, Plus, Scale } from "lucide-react";
import { Label } from "#/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function PetCreationForm() {
	return (
		<div className="min-h-screen bg-background relative pb-24">
			{/* Hero Section */}
			<section className="pt-24 pb-8 bg-gradient-to-b from-primary-fixed to-background flex flex-col items-center relative overflow-hidden transition-all duration-300">
				<div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 -ml-16 w-48 h-48 bg-primary opacity-5 rounded-full blur-2xl"></div>

				<div className="relative w-32 h-32 mb-6 z-10 group">
					<div className="w-full h-full rounded-full border-4 border-dashed border-primary/50 bg-white flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
						<Plus className="w-12 h-12 text-primary" />
					</div>
				</div>

				<div className="w-full max-w-lg px-6 flex flex-col items-center">
					<Input
						type="text"
						placeholder="Qual o nome do seu parceiro?"
						className="w-full h-auto py-2 font-display-lg text-3xl md:text-4xl text-center text-on-surface font-extrabold z-10 tracking-tight bg-transparent border-none focus-visible:ring-0 placeholder:text-slate-300 transition-all shadow-none"
					/>

					<div className="flex flex-col sm:flex-row gap-3 mt-6 z-10 w-full justify-center">
						<Select>
							<SelectTrigger className="px-4 py-2 h-auto bg-primary-fixed text-primary font-label-sm text-xs uppercase rounded-full shadow-sm font-bold tracking-wider border-none focus:ring-2 focus:ring-primary outline-none cursor-pointer text-center flex-1 justify-center">
								<SelectValue placeholder="Cachorro, Gato, Pássaro?" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="cachorro">Cachorro</SelectItem>
								<SelectItem value="gato">Gato</SelectItem>
								<SelectItem value="passaro">Pássaro</SelectItem>
								<SelectItem value="outro">Outro</SelectItem>
							</SelectContent>
						</Select>
						<Input
							type="text"
							placeholder="Qual a raça dele?"
							className="px-4 py-2 h-auto bg-white text-on-surface font-label-sm text-xs uppercase rounded-full shadow-sm font-bold tracking-wider border-none focus-visible:ring-2 focus-visible:ring-primary outline-none text-center placeholder:text-slate-400 flex-1"
						/>
					</div>
				</div>
			</section>

			{/* Main Content Area */}
			<main className="px-6 mt-8 max-w-4xl mx-auto">
				<section className="block animate-[fadeIn_0.3s_ease-out]">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Nascimento Field */}
						<Card className="rounded-2xl shadow-sm border-slate-100 hover:border-primary/20 transition-all overflow-hidden border">
							<CardContent className="p-6 flex items-center gap-4">
								<div className="w-14 h-14 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
									<Calendar className="w-6 h-6" />
								</div>
								<div className="flex-1">
									<Label className="font-label-sm text-xs uppercase font-bold tracking-widest text-slate-500 mb-2 block">
										Data de Nascimento
									</Label>
									<Input
										type="date"
										className="w-full bg-surface-container-lowest border-slate-100 rounded-xl px-3 py-5 font-body-md text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-none"
									/>
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
										Peso (kg)
									</Label>
									<Input
										type="number"
										placeholder="Quanto ele pesa?"
										className="w-full bg-surface-container-lowest border-slate-100 rounded-xl px-3 py-5 font-body-md text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all shadow-none"
									/>
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
										Personalidade e Bio
									</h3>
								</div>
								<Textarea
									placeholder="Conte um pouco sobre as manias e o jeito dele..."
									rows={4}
									className="w-full bg-surface-container-lowest border-slate-100 rounded-xl px-4 py-3 font-body-md text-on-surface focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary transition-all resize-none shadow-none"
								/>
							</CardContent>
						</Card>
					</div>

					<div className="mt-12 mb-12">
						<Button className="w-full bg-primary text-white font-headline-lg-mobile text-lg font-bold py-7 rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
							<PawPrint className="w-6 h-6" />
							Cadastrar Pet
						</Button>
						<p className="text-center text-slate-400 font-body-md text-sm mt-4">
							Você poderá adicionar rotinas e fotos logo em seguida.
						</p>
					</div>
				</section>
			</main>
		</div>
	);
}

export { PetCreationForm };
