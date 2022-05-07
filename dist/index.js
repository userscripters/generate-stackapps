#!/usr/bin/env node
import { pathToFileURL } from "url";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generate } from "./generator.js";
const cli = yargs(hideBin(process.argv));
const defaultTags = ["script"];
const options = {
    a: {
        alias: "about",
        type: "string"
    },
    cr: {
        alias: "chrome",
        type: "string"
    },
    d: {
        alias: "direct",
        default: false,
        type: "boolean"
    },
    e: {
        alias: "excerpt",
        type: "string"
    },
    ed: {
        alias: "edge",
        type: "string"
    },
    ie: {
        alias: "explorer",
        type: "string"
    },
    ff: {
        alias: "firefox",
        type: "string",
    },
    iu: {
        alias: "install",
        demandOption: true,
        type: "string"
    },
    l: {
        alias: "language",
        type: "array"
    },
    mu: {
        alias: "minified",
        type: "string"
    },
    o: {
        alias: "output",
        default: "./STACKAPPS.md",
        type: "string"
    },
    on: {
        alias: "org-name",
        type: "string"
    },
    op: {
        alias: "opera",
        type: "string"
    },
    ou: {
        alias: "org-url",
        type: "string"
    },
    p: {
        alias: "package",
        default: "./package.json",
        type: "string",
    },
    r: {
        alias: "room",
        type: "string"
    },
    sa: {
        alias: "screenshot-alt",
        type: "string"
    },
    su: {
        alias: "screenshot-url",
        type: "string"
    },
    tg: {
        alias: "tag",
        default: defaultTags,
        type: "array"
    },
    tl: {
        alias: "title",
        type: "string"
    },
    th: {
        alias: "thumbnail",
        type: "string"
    },
};
cli.command("$0", `generates a StackApps post for the project`, options, async ({ a, cr, d, e, ed, ff, ie, iu, l = [], mu, o, on, ou, op, p, r, sa, su, tg = [], tl, th, }) => {
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
    });
});
cli.demandCommand().help().parse();
