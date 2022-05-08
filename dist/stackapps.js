import { parseAuthor } from "./utils/author.js";
import { scase } from "./utils/common.js";
import { makeTemplateComment, mdLink } from "./utils/index.js";
import { parsePackageName, prettifyPackageName } from "./utils/name.js";
/**
 * @summary generates StackApps post content
 * @param pkg package.json JSON
 * @param options parsed {@link GeneratorOptions}
 */
export const generateStackApps = (pkg, options) => {
    const { author, description = "", license = "", name, version = "1.0.0" } = pkg;
    const { about = description, excerpt = description, installURL, languages = [], minifiedURL, orgName, orgURL, postTitle, roomURL, screenshotAlt = "screenshot of the script", screenshotURL = "", tags = [], testedIn = {}, thumbnailURL = "", } = options;
    const browserNames = Object.keys(testedIn);
    const testingData = Object.values(testedIn);
    const { name: authorName, url: authorUrl = "" } = parseAuthor(author);
    const { packageName, normalizedScopedName } = parsePackageName(name);
    const title = postTitle || `${prettifyPackageName(packageName)} - ${description}`;
    const minified = minifiedURL ? ` | ${mdLink(minifiedURL, "Minified")}` : "";
    const org = orgName ? `<br>Organization: ${orgURL ? mdLink(orgURL, orgName) : orgName}` : "";
    const room = roomURL ? `\nYou can also ${mdLink(roomURL, "drop by to chat")}, we are a friendly bunch.` : "";
    const screenshot = screenshotURL ? `!${mdLink(screenshotURL, screenshotAlt)}` : "";
    const body = `
${makeTemplateComment("thumbnail", thumbnailURL)}
${makeTemplateComment("version", version)}
${makeTemplateComment("tag", tags[0])}
${makeTemplateComment("excerpt", excerpt)}

## Screenshot / Code Snippet

${screenshot}

## About

${about}

### License

The script is licensed under the ${mdLink(`https://spdx.org/licenses/${license}`, license)} license.

### Download

Latest version: ${version}

${mdLink(installURL, "Install")}${minified}

### Platform

Version number means "last tested on":

| ${browserNames.map(scase).join(" | ")} |
| ${new Array(browserNames.length).fill("-").join(" | ")} |
| ${testingData.map((data) => data && !data.startsWith("no") ? `✔ ${data}` : "-").join(" | ")} |

## Change log

| Version    | Description |
| ---------- | ----------- |
| ${version} |             |

## Contact

Author: ${authorUrl ? mdLink(authorUrl, authorName) : authorName}
${org}

Please, submit bug reports ${mdLink(`https://github.com/${normalizedScopedName}/issues`, "on the source repository")}.
<br>Before adding a new one, please check if it hasn't been raised before.
${room}

## Code

${mdLink(`https://github.com/${normalizedScopedName}/blob/master/src/index.ts`, "Source code")} is written in ${languages.join(", ")}.

Contributions are welcome, you can always ${mdLink(`https://github.com/${normalizedScopedName}/pulls`, "submit a PR here")}.`;
    return { title, body, tags: tags.join(" ") };
};
