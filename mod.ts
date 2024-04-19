import { bold, gray, green } from "jsr:@std/fmt@^0.220.1/colors";

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
`.trim();

let blank = `\
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>title</title>
		<link rel="stylesheet">
		<script></script>
	</head>
	<body></body>
</html>
`.trim();

function pyproject_toml(params: URLSearchParams) {
	return `\
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "${params.get("name") ?? "project"}"
version = "${params.get("version") ?? "0.0.0"}"
description = "${params.get("description") ?? ""}"
requires-python = "${params.get("requires-python") ?? ">=3.8"}"
dependencies = []

[tool.hatch.envs.default]
dependencies = []
uv = true

[tool.ruff.lint]
pydocstyle = { convention = "numpy" }
select = [
	"E",    # style errors
	"W",    # style warnings
	"F",    # flakes
	"D",    # pydocstyle
	"D417", # Missing argument descriptions in Docstrings
	"I",    # isort
	"UP",   # pyupgrade
	"C4",   # flake8-comprehensions
	"B",    # flake8-bugbear
	"A001", # flake8-builtins
	"RUF",  # ruff-specific rules
	"TCH",  # flake8-type-checking
	"TID",  # flake8-tidy-imports
]

[tool.ruff.lint.per-file-ignores]
"tests/*.py" = ["D", "S"]
`.trim();
}

Deno.serve(async (req: Request) => {
	let url = new URL(req.url);
	if (url.pathname === "/tsconfig.json") {
		let url = new URL("./tsconfig.json", import.meta.url);
		return new Response(await Deno.readTextFile(url), {
			headers: { "content-type": "application/json" },
		});
	}
	if (url.pathname === "/deno.json") {
		let url = new URL("./deno.json", import.meta.url);
		return new Response(await Deno.readTextFile(url), {
			headers: { "content-type": "application/json" },
		});
	}
	if (url.pathname === "/pyproject.toml") {
		return new Response(pyproject_toml(url.searchParams), {
			headers: { "content-type": "text/toml" },
		});
	}
	if (url.pathname === "/index.html") {
		return new Response(blank, {
			headers: { "content-type": "text/html" },
		});
	}
	if (req.headers.get("Accept")?.includes("text/html")) {
		return Response.redirect("https://trevorma.nz");
	}
	return new Response(text);
});
