import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { Discord } from "@/components/icons/discord";
import Logo from "@/components/icons/brand/logo";
import { XPlatform } from "@/components/icons/x";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Link from "next/link";

export default function Header() {
	return (
		<header className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between p-4">
			<h1 className="font-sans text-lg font-bold">
				<Link href="/" className="group flex items-center gap-2 select-none">
					<Logo className="h-9 w-9" aria-hidden="true" />
					<span className="group-hover:text-primary/80 transition-colors">Nimbus</span>
				</Link>
			</h1>
			<div className="flex items-center gap-4">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" asChild aria-label="Contributors" className="cursor-pointer">
							<Link href="/contributors">
								<Users />
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Contributors</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" aria-label="Discord" className="cursor-pointer">
							<a href="https://discord.gg/c9nWy26ubK" target="_blank" rel="noopener noreferrer">
								<Discord />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Discord</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" aria-label="X (Twitter)" className="cursor-pointer">
							<a href="https://x.com/nimbusdotcloud" target="_blank" rel="noopener noreferrer">
								<XPlatform />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>X (Twitter)</TooltipContent>
				</Tooltip>
				<ModeToggle />
			</div>
		</header>
	);
}
