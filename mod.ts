import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { bold, green, gray, cyan, yellow, blue } from "https://deno.land/std@0.147.0/fmt/colors.ts";

let text = `\
${green("   ╭───────────────────────────────────────────────────╮")}
${green("   │                                                   │")}
${green("   │")}               trevor manz  ${green("/")}  manzt               ${green("│")}
${green("   │                                                   │")}
${green("   │")}           phd student in bioinformatics           ${green("│")}
${green("   │")}         interested in data visualization          ${green("│")}
${green("   │")}             and open-source software              ${green("│")}
${green("   │                                                   │")}
${green("   │")}    ${bold("twitter:")}  ${gray("https://twitter.com/")}${cyan("trevmanz")}         ${green("│")}
${green("   │")}    ${bold(" github:")}  ${gray("https://github.com/")}${yellow("manzt")}             ${green("│")}
${green("   │")}   ${bold("linkedin:")}  ${gray("https://linkedin.com/in/")}${blue("trevor-manz")}  ${green("│")}
${green("   │")}   ${bold("     web:")}  ${cyan("https://trevorma.nz")}                  ${green("│")}
${green("   │                                                   │")}
${green("   ╰───────────────────────────────────────────────────╯")}
`;

let html = `\
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
</samp>`;

serve((req: Request) => {
	if (req.headers.get("Accept")?.includes("text/html")) {
		return new Response(html, {
			headers: { "content-type": "text/html" },
		});
	}
	return new Response(text);
});
