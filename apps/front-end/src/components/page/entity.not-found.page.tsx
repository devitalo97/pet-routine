import { PawPrint } from "lucide-react";
import { BackLinkButton } from "../back-link.button";

function NotFoundEntityPage({
	title,
	description,
	icon,
}: {
	title: string;
	description?: string;
	icon?: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-background relative pb-24">
			<section className="pt-24 pb-8 bg-gradient-to-b from-primary-fixed to-background flex flex-col items-center relative overflow-hidden transition-all duration-300">
				<div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 -ml-16 w-48 h-48 bg-primary opacity-5 rounded-full blur-2xl"></div>

				<div className="relative w-32 h-32 mb-6 z-10 group">
					<div className="w-full h-full rounded-full border-4 border-primary/50 bg-white flex items-center justify-center cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
						{icon ?? <PawPrint className="w-12 h-12 text-primary" />}
					</div>
				</div>

				<div className="w-full max-w-lg px-6 flex flex-col items-center">
					<h1 className="text-display-sm font-extrabold text-on-surface">
						{title}
					</h1>
					{description && (
						<p className="text-center font-body-md text-on-surface-variant mt-4">
							{description}
						</p>
					)}
					<div className="flex flex-col sm:flex-row gap-3 mt-6 z-10 w-full justify-center">
						<BackLinkButton />
					</div>
				</div>
			</section>
		</div>
	);
}

export { NotFoundEntityPage };
