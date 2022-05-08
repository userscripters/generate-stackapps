#!/usr/bin/env node
import { pathToFileURL } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generate } from "./generator.js";
const cli = yargs(hideBin(process.argv));
const defaultTags = ["script"];
const worksWithChoices = ["greasemonkey", "tampermonkey", "violentmonkey"];
const options = {
    a: {
        alias: "about",
        description: "Long project description",
        type: "string"
    },
    cr: {
        alias: "chrome",
        description: "Last tested Chrome version",
        type: "string"
    },
    d: {
        alias: "direct",
        default: false,
        description: "Send output to process.stdout (CLI-only)",
        type: "boolean"
    },
    e: {
        alias: "excerpt",
        description: "Short project description",
        type: "string"
    },
    ed: {
        alias: "edge",
        description: "Last tested Edge version",
        type: "string"
    },
    ie: {
        alias: "explorer",
        description: "Last tested Internet Explorer version",
        type: "string"
    },
    ff: {
        alias: "firefox",
        description: "Last tested Firefox version",
        type: "string",
    },
    iu: {
        alias: "install",
        demandOption: true,
        description: "Project installation URL",
        type: "string"
    },
    l: {
        alias: "language",
        description: "Programming languages used (repeatable)",
        type: "array"
    },
    mu: {
        alias: "minified",
        description: "Minified version installation URL",
        type: "string"
    },
    o: {
        alias: "output",
        default: "./STACKAPPS.md",
        description: "Output file path (CLI-only)",
        type: "string"
    },
    on: {
        alias: "org-name",
        description: "GitHub organization name",
        type: "string"
    },
    op: {
        alias: "opera",
        description: "Last tested Opera version",
        type: "string"
    },
    ou: {
        alias: "org-url",
        description: "GitHub organization URL",
        type: "string"
    },
    p: {
        alias: "package",
        default: "./package.json",
        description: "Path to project's package.json",
        type: "string",
    },
    r: {
        alias: "room",
        description: "Chat room URL",
        type: "string"
    },
    sa: {
        alias: "screenshot-alt",
        description: "Project screenshot alt text",
        type: "string"
    },
    su: {
        alias: "screenshot-url",
        description: "Project screenshot URL",
        type: "string"
    },
    tg: {
        alias: "tag",
        default: defaultTags,
        description: "StackApps post tag (repeatable)",
        type: "array"
    },
    tl: {
        alias: "title",
        description: "StackApps post title",
        type: "string"
    },
    th: {
        alias: "thumbnail",
        description: "StackApps post thumbnail",
        type: "string"
    },
    ww: {
        alias: "works-with",
        choices: worksWithChoices,
        description: "Supported userscript manager (repeatable)",
        type: "array"
    }
};
cli.command("$0", `generates a StackApps post for the project`, options, async ({ a, cr, d, e, ed, ff, ie, iu, l = [], mu, o, on, ou, op, p, r, sa, su, tg = [], tl, th, ww = [] }) => {
    await generate({
        about: a,
        cli: import.meta.url === pathToFileURL(process.argv[1]).href,
        direct: !!d,
        excerpt: e,
        installURL: iu,
        languages: l.map(String),
        minifiedURL: mu,
        outputPath: o,
        orgName: on,
        orgURL: ou,
        packagePath: p,
        postTitle: tl,
        roomURL: r,
        screenshotAlt: sa,
        screenshotURL: su,
        tags: tg.map(String),
        testedIn: {
            chrome: cr,
            edge: ed,
            explorer: ie,
            firefox: ff,
            opera: op
        },
        thumbnailURL: th,
        worksWith: ww
    });
});
cli.demandCommand().help().parse();
