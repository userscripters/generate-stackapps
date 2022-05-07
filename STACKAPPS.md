Generate Stackapps - StackApps post generator for userscripts

library typescript

<!-- thumbnail: https://i.stack.imgur.com/Cbt4Z.png -->
<!-- version: 1.0.2 -->
<!-- tag: library -->
<!-- excerpt: Tired of writing Stack Apps posts by hand? With Generate StackApps you can focus on what's really important — userscripts and delegate the busywork to automation. -->

## Screenshot / Code Snippet

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
    --thumbnail "https://i.stack.imgur.com/Cbt4Z.png"
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
    thumbnailURL: "https://i.stack.imgur.com/Cbt4Z.png"
});
```

### License

The script is licensed under the [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later) license.

### Download

Latest version: 1.0.2

The package is published as both an [NPM package](https://www.npmjs.com/package/@userscripters/generate-stackapps) and a [GitHub package](https://github.com/userscripters/generate-stackapps/packages/1408794). Can be installed via a package manager like NPM as usual:

```shell
npm install --save-dev @userscripters/generate-stackapps
```

If you opt to install it from the GitHub registry, please note that it only supports scoped packages, you will need a simple .npmrc file at your project root:

```npmrc
@userscripters:registry=https://npm.pkg.github.com
```

You will also need to be logged in to GitHub. An easy way to do so is to have a global `.npmrc` with your PAT ([personal access token][5]) set as an access token:

```npmrc
//npm.pkg.github.com/:_authToken=<your token here>
```

### CLI Usage

The package exposes a CLI interface with the following syntax:

```
generate-stackapps [options]
```

There are various options one can provide to customize the output:

| Long             | Short | Required | Default                      | Value      | Description                                |
| ---------------- | ----- | -------- | ---------------------------- | ---------- | ------------------------------------------ |
| `about`          | `a`   | no       | `<pkg.description>`          | string     | Long project description                   |
| `chrome`         | `cr`  | no       | -                            | string     | Last tested Chrome version                 |
| `direct`         | `d`   | no       | `false`                      | boolean    | Send output to `process.stdout` (CLI-only) |
| `excerpt`        | `e`   | no       | `<pkg.description>`          | string     | Short project description                  |
| `edge`           | `ed`  | no       | -                            | string     | Last tested Edge version                   |
| `explorer`       | `ie`  | no       | -                            | string     | Last tested Internet Explorer version      |
| `firefox`        | `ff`  | no       | -                            | string     | Last tested Firefox version                |
| `install`        | `iu`  | yes      | -                            | valid URL  | Project installation URL                   |
| `language`       | `l`   | no       | -                            | `string[]` | Programming languages used (repeatable)    |
| `minified`       | `mu`  | no       | -                            | valid URL  | Minified version installation URL          |
| `opera`          | `op`  | no       | -                            | string     | Last tested Opera version                  |
| `org-name`       | `on`  | no       | -                            | string     | GitHub organization name                   |
| `org-url`        | `ou`  | no       | -                            | valid URL  | GitHub organization URL                    |
| `output`         | `o`   | no       | `./STACKAPPS.md`             | filepath   | Output file path (CLI-only)                |
| `package`        | `p`   | no       | `./package.json`             | filepath   | Path to project's package.json             |
| `room`           | `r`   | no       | -                            | valid URL  | Chat room URL                              |
| `screenshot-alt` | `sa`  | no       | -                            | string     | Project screenshot alt text                |
| `screenshot-url` | `su`  | no       | -                            | valid URL  | Project screenshot URL                     |
| `tag`            | `tg`  | no       | `["script"]`                 | `string[]` | StackApps post tag (repeatable)            |
| `thumbnail`      | `th`  | no       | -                            | valid URL  | StackApps post thumbnail                   |
| `title`          | `tl`  | no       | `<pkg.name> - <description>` | string     | StackApps post title                       |

### Platform

This is a [Node.js](https://nodejs.org/en/) package (tested on LTS 16.13.2), so it requires Node to be installed.
Best used with [TypeScript](https://www.typescriptlang.org/download), but contains type declaration files for autocompletion as well.

## Contact

Author: [Oleg Valter](https://stackoverflow.com/users/11407695)
Organization: [UserScripters](https://github.com/userscripters)

Please, submit bug reports [on the source repository](https://github.com/userscripters/generate-stackapps/issues)
Before adding a new one, please check if it hasn't been raised before.

You can also [drop by to chat](https://chat.stackoverflow.com/rooms/214345), we are a friendly bunch.

## Code

[Source code](https://github.com/userscripters/generate-stackapps/blob/master/src/index.ts) is written in TypeScript.

Contributions are welcome, you can always [submit a PR here](https://github.com/userscripters/generate-stackapps/pulls).
