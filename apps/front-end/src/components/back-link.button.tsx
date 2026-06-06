import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";

function BackLinkButton({ title }: { title?: string }) {
	const router = useRouter();

	return (
		<Button variant="outline">
			<Link
				to=".."
				onClick={(e) => {
					e.preventDefault();
					router.history.back();
				}}
			>
				{title ?? "Voltar"}
			</Link>
		</Button>
	);
}

export { BackLinkButton };
