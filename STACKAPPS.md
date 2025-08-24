Generate Stackapps - StackApps post generator for userscripts

library typescript

<!-- thumbnail: https://i.stack.imgur.com/Cbt4Z.png -->
<!-- version: 1.4.0 -->
<!-- tag: library -->
<!-- excerpt: Tired of writing Stack Apps posts by hand? With Generate StackApps you can focus on what's really important — userscripts and delegate the busywork to automation. -->

## About

Generate StackApps is a post Markdown generator for userscript projects reducing the amount of busywork required to publish userscripts for the benefit of the Stack Exchange network users. The package is highly customizable and takes a lot of the information from the project's package.json file (on an off-chance you are unfamiliar, here are the [NPM docs](https://docs.npmjs.com/creating-a-package-json-file)).

### Usage example

CLI usage:

```shell
generate-stackapps \
    --install "https://www.npmjs.com/package/@userscripters/generate-stackapps" \
    --language "TypeScript" \
    --org-name "UserScripters" \
    --org-url "https://github.com/userscripters" \
    --room "https://chat.stackoverflow.com/rooms/214345" \
    --tag "library" \
    --tag "typescript" \
    --thumbnail "https://i.stack.imgur.com/Cbt4Z.png" \
    --works-with "tampermonkey" "greasemonkey"
```

Programmatic usage as a module:

```javascript
import { generate } from "@userscripters/generate-stackapps";

const { body, tags, title } = await generate({
    installURL: "https://www.npmjs.com/package/@userscripters/generate-stackapps",
    languages: ["TypeScript"],
    orgName: "UserScripters",
    orgURL: "https://github.com/userscripters",
    roomURL: "https://chat.stackoverflow.com/rooms/214345",
    tags: ["library", "typescript"],
    testedIn: {
        chrome: "100.0.0"
    },
    thumbnailURL: "https://i.stack.imgur.com/Cbt4Z.png",
    worksWith: ["tampermonkey", "greasemonkey"]
});
```

### License

The script is licensed under the [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later) license.

### Download

Latest version: 1.4.0

The package is published as both an [NPM package](https://www.npmjs.com/package/@userscripters/generate-stackapps) and a [GitHub package](https://github.com/userscripters/generate-stackapps/packages/1408794). Can be installed via a package manager like NPM as usual:

```shell
npm install --save-dev @userscripters/generate-stackapps
```

If you opt to install it from the GitHub registry, please note that it only supports scoped packages, you will need a simple .npmrc file at your project root:

```npmrc
@userscripters:registry=https://npm.pkg.github.com
```

You will also need to be logged in to GitHub. An easy way to do so is to have a global `.npmrc` with your PAT ([personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)) set as an access token:

```npmrc
//npm.pkg.github.com/:_authToken=<your token here>
```

### CLI Usage

The package exposes a CLI interface with the following syntax:

```
generate-stackapps [options]
```

There are various options one can provide to customize the output:

```
Options:
      --version               Show version number                      [boolean]
      --help                  Show help                                [boolean]
  -a, --about                 Long project description                  [string]
      --cr, --chrome          Last tested Chrome version                [string]
  -d, --direct                Send output to process.stdout (CLI-only)
                                                      [boolean] [default: false]
  -e, --excerpt               Short project description                 [string]
      --ed, --edge            Last tested Edge version                  [string]
      --ie, --explorer        Last tested Internet Explorer version     [string]
      --ff, --firefox         Last tested Firefox version               [string]
      --iu, --install         Project installation URL       [string] [required]
  -l, --language              Programming languages used (repeatable)    [array]
      --mu, --minified        Minified version installation URL         [string]
  -o, --output                Output file path (CLI-only)
                                            [string] [default: "./STACKAPPS.md"]
      --on, --org-name        GitHub organization name                  [string]
      --op, --opera           Last tested Opera version                 [string]
      --ou, --org-url         GitHub organization URL                   [string]
  -p, --package               Path to project's package.json
                                            [string] [default: "./package.json"]
  -r, --room                  Chat room URL                             [string]
      --sa, --screenshot-alt  Project screenshot alt text               [string]
      --su, --screenshot-url  Project screenshot URL                    [string]
      --tg, --tag             StackApps post tag (repeatable)
                                                   [array] [default: ["script"]]
      --tl, --title           StackApps post title                      [string]
      --th, --thumbnail       StackApps post thumbnail                  [string]
      --ww, --works-with      Supported userscript manager (repeatable)
              [array] [choices: "greasemonkey", "tampermonkey", "violentmonkey"]
```

### Platform

This is a [Node.js](https://nodejs.org/en/) package (tested on LTS 16.13.2), so it requires Node to be installed.
Best used with [TypeScript](https://www.typescriptlang.org/download), but contains type declaration files for autocompletion as well.

## Contact

Author: [Oleg Valter](https://stackoverflow.com/users/11407695)
<br>Organization: [UserScripters](https://github.com/userscripters)

Contributors:
<br>[double beep](https://github.com/double-beep)

Please, submit bug reports [on the source repository](https://github.com/userscripters/generate-stackapps/issues).
<br>Before adding a new one, please check if it hasn't been raised before.

You can also [drop by to chat](https://chat.stackoverflow.com/rooms/214345), we are a friendly bunch.

## Code

[Source code](https://github.com/userscripters/generate-stackapps/blob/master/src/index.ts) is written in TypeScript.

Contributions are welcome, you can always [submit a PR here](https://github.com/userscripters/generate-stackapps/pulls).
