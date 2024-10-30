import { bold, gray, green } from "jsr:@std/fmt@^0.224.0/colors";

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

let pandoc_template = `\
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title$</title>
    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
</head>
<body class="prose prose-lg max-w-2xl m-auto">
    <header>
        <h1>$title$</h1>
        <div class="space-y-1">
            $for(authors)$
                <div class="text-lg font-medium text-gray-800">
                    $authors.name$
                </div>
            $endfor$
        </div>
    </header>
    <main>
        $body$
    </main>
    <footer>
        <hr>
        <p>WIP</p>
    </footer>
</body>
</html>
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

[tool.uv]

[tool.ruff.lint]
pydocstyle = { convention = "numpy" }
select = ["ALL"]

[tool.ruff.lint.per-file-ignores]
"tests/*.py" = ["D", "S"]
`.trim();
}

let pep723_script = `\
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "rich>=13.9.2",
# ]
# ///

import rich

rich.print("\\nHello from github.com/[bold green]manzt[/bold green]/[bold green]manzt[/bold green]!")
`;

let anywidget = `\
import anywidget
import traitlets


class Widget(anywidget.AnyWidget):
    _esm = """
    function render({ model, el }) {
      let count = () => model.get("value");
      let btn = document.createElement("button");
      btn.innerHTML = \`count is \${count()}\`;
      btn.addEventListener("click", () => {
        model.set("value", count() + 1);
        model.save_changes();
      });
      model.on("change:value", () => {
        btn.innerHTML = \`count is \${count()}\`;
      });
      el.appendChild(btn);
    }
    export default { render };
    """
    value = traitlets.Int(0).tag(sync=True)
    
Widget()
`.trim();


Deno.serve(async (req: Request) => {
	let url = new URL(req.url);
	switch (`${req.method} ${url.pathname}`) {
		case "GET /tsconfig.json": {
			let file = await Deno.open("tsconfig.json", {
				read: true,
			});
			return new Response(file.readable, {
				headers: { "content-type": "application/json" },
			});
		}
		case "GET /deno.json": {
			let file = await Deno.open("deno.json", { read: true });
			return new Response(file.readable, {
				headers: { "content-type": "application/json" },
			});
		}
		case "GET /pyproject.toml": {
			return new Response(pyproject_toml(url.searchParams), {
				headers: { "content-type": "text/toml" },
			});
		}
		case "GET /index.html": {
			return new Response(blank, {
				headers: { "content-type": "text/html" },
			});
		}
		case "GET /pandoc.html": {
			return new Response(pandoc_template, {
				headers: { "content-type": "text/html" },
			});
		}
		case "GET /hello.py": {
			return new Response(pep723_script, {
				headers: { "content-type": "text/plain" },
			});
		}
		case "GET /widget.py": {
			return new Response(anywidget, {
				headers: { "content-type": "text/plain" },
			});
		}
		case "GET /": {
			if (req.headers.get("Accept")?.includes("text/html")) {
				return Response.redirect("https://trevorma.nz");
			}
			return new Response(text);
		}
		default: {
			return new Response("Not Found", { status: 404 });
		}
	}
});
