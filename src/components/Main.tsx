import React from "react";
import { About } from "./About";
import { CipherMap } from "./CipherMap";
import { Socials } from "./Socials";
import { Security } from "./Security";
import { ProfessionalInformation } from "./ProfessionalInformation";
import { Interests } from "./Interests";
export function Main() {
	return (
		<main className="bg-slate-100 pb-28">
			<About />
			<CipherMap />
			<Socials />
			<ProfessionalInformation />
			<Security />
			<Interests />
		</main>
	);
}
