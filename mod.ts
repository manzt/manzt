import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { bold, gray, green } from "https://deno.land/std@0.147.0/fmt/colors.ts";

// deno-fmt-ignore
let text = `\
${green("   ╭───────────────────────────────────────────────────╮")}
${green("   │                                                   │")}
${green("   │")}               trevor manz  ${green("/")}  manzt               ${green("│")}
${green("   │                                                   │")}
${green("   │")}           phd student in bioinformatics           ${green("│")}
${green("   │")}         interested in data visualization          ${green("│")}
${green("   │")}             and open-source software              ${green("│")}
${green("   │                                                   │")}
${green("   │")}     ${bold("   orcid:")}  ${gray("orcid.org/")}${green("0000-0001-7694-5164")}      ${green("│")}
${green("   │")}      ${bold("twitter:")}  ${gray("twitter.com/")}${green("trevmanz")}               ${green("│")}
${green("   │")}      ${bold(" github:")}  ${gray("github.com/")}${green("manzt")}                   ${green("│")}
${green("   │")}     ${bold("linkedin:")}  ${gray("linkedin.com/in/")}${green("trevor-manz")}        ${green("│")}
${green("   │                                                   │")}
${green("   ╰───────────────────────────────────────────────────╯")}
`;

let tsconfig = {
	"compilerOptions": {
		"module": "node16",
		"moduleResolution": "node16",
		"moduleDetection": "force",
		"target": "ES2020",
		"lib": ["DOM", "DOM.Iterable", "ES2020"],
		"declaration": true,
		"strict": true,
		"noImplicitReturns": true,
		"noImplicitOverride": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true,
		"noUncheckedIndexedAccess": true,
		"noPropertyAccessFromIndexSignature": true,
		"noEmitOnError": true,
		"useDefineForClassFields": true,
		"forceConsistentCasingInFileNames": true,
		"skipLibCheck": true,
	},
};

let _html = `\
<!doctype html>
<samp>
	<p align="center">
		<span>I'm a graduate student in bioinformatics interested in data visualization and open-source software.</span>
		<br>
		<br>
		<a href="https://trevorma.nz">me</a> .
		<a href="mailto:trevor_manz@g.harvard.edu">email</a> .
		<a href="https://twitter.com/trevmanz">twitter</a> .
		<a href="https://www.buymeacoffee.com/manzt">buy me a coffee</a>
	</p>
</samp>
`;

serve((req: Request) => {
	let url = new URL(req.url);
	if (url.pathname === "/tsconfig.json") {
		return new Response(JSON.stringify(tsconfig, null, "\t"), {
			headers: { "content-type": "application/json" },
		});
	}
	if (req.headers.get("Accept")?.includes("text/html")) {
		return Response.redirect("https://trevorma.nz");
	}
	return new Response(text);
});
