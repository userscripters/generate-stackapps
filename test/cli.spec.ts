import { expect } from "chai";
import { exec } from "child_process";
import { stat, unlink } from "fs/promises";
import { promisify } from "util";
import { parseAuthor } from "../src/utils/author.js";
import { scase } from "../src/utils/common.js";
import { about, contributors, excerpt, installURL, languages, minifiedURL, orgName, orgURL, packageInfo, packagePath, roomURL, screenshotAlt, screenshotURL, tags, testedIn, thumbnailURL, worksWith } from "./fixtures.spec.js";

const aexec = promisify(exec);

describe("CLI", function () {
    this.timeout(5000); // CLI runs can be slow

    const entry = "./src/index.ts";
    const output = "./test/stackapps.md";

    const cliPfx = `node --loader ts-node/esm ${entry}`;

    const args: string[] = [
        `-a "${about}"`,
        `--cr "${testedIn.chrome || ""}"`,
        `-e "${excerpt}"`,
        `--ed "${testedIn.edge || ""}"`,
        `--ie "${testedIn.explorer || ""}"`,
        `--ff "${testedIn.firefox || ""}"`,
        `--iu "${installURL}"`,
        ...languages.map((l) => `-l "${l}"`),
        `--mu "${minifiedURL}"`,
        `--on "${orgName}"`,
        `--op "${testedIn.opera || ""}"`,
        `--ou "${orgURL}"`,
        `-o "${output}"`,
        `-p "${packagePath}"`,
        `-r "${roomURL}"`,
        `--sa "${screenshotAlt}"`,
        `--su "${screenshotURL}"`,
        ...tags.map((t) => `--tg "${t}"`),
        `--th "${thumbnailURL}"`,
        ...worksWith.map((w) => `--ww "${w}"`)
    ];

    const cliRuns: string[] = [];
    before(async () => {
        const runs = await Promise.all([
            aexec(`${cliPfx} ${[...args, "-d"].join(" ")}`),
            aexec(`${cliPfx} ${args.join(" ")}`),
        ]);

        cliRuns.push(...runs.map((r) => r.stdout));
    });

    after(() => stat(output).then(() => unlink(output)));

    it('should correctly generate meta headers', () => {
        const [output] = cliRuns;

        expect(output).to.match(new RegExp(`<!-- excerpt: ${excerpt} -->`));
        expect(output).to.match(new RegExp(`<!-- tag: ${tags[0]} -->`));
        expect(output).to.match(new RegExp(`<!-- thumbnail: ${thumbnailURL} -->`));
        expect(output).to.match(new RegExp(`<!-- version: ${packageInfo.version} -->`));
    });

    it('should correctly generate the about section', () => {
        expect(cliRuns[0]).to.match(new RegExp(`^${about}$`, "m"));
    });

    it('should correctly generate author info', () => {
        const { name, url } = parseAuthor(packageInfo.author);
        expect(cliRuns[0]).to.match(new RegExp(`\\[${name}\\]\\(${url}\\)`));
    });

    it('should correctly generate contributors list', () => {
        contributors.forEach(({ name, url }) => {
            expect(cliRuns[0]).to.match(new RegExp(`\\[${name}\\]\\(${url}\\)`));
        });
    });

    it('should correctly generate code info', () => {
        const { homepage } = packageInfo;

        const [output] = cliRuns;

        expect(output).to.match(
            new RegExp(`\\[Source code\\]\\(${homepage}/blob/master/src/index\\.ts\\)`)
        );
        expect(output).to.match(
            new RegExp(`\\[submit a PR here\\]\\(${homepage}/pulls\\)`)
        );
        expect(output).to.match(
            new RegExp(`\\[on the source repository\\]\\(${homepage}/issues\\)`)
        );
    });

    it('should correctly generate the download section', () => {
        const [output] = cliRuns;

        expect(output).to.match(new RegExp(`\\[Install\\]\\(${packageInfo.repository.url.replace(/([.+])/g, "\\$1")}\\)`));
        expect(output).to.match(new RegExp(`\\[Minified\\]\\(${minifiedURL.replace(/([.+])/g, "\\$1")}\\)`));
    });

    it('should correctly generate the license section', () => {
        const { license } = packageInfo;

        expect(cliRuns[0]).to.match(
            new RegExp(`\\[${license}\\]\\(https://spdx.org/licenses/${license}\\)`)
        );
    });

    it('should correctly generate the platform section', () => {
        const [output] = cliRuns;

        const browserNames = Object.keys(testedIn).map(scase).join(" | ");
        expect(output).to.include(`| ${browserNames} |`);
        expect(output).to.include(`| ✔ ${testedIn.chrome || "-"} |`);

        const managers = worksWith.map((n) => `- ${scase(n)}`).join("\n");
        expect(output).to.include(managers);
    });

    it('should correctly generate org info', () => {
        expect(cliRuns[0]).to.match(new RegExp(`\\[${orgName}\\]\\(${orgURL}\\)`));
    });

    it('should correctly generate room info', () => {
        expect(cliRuns[0]).to.match(new RegExp(`\\[drop by to chat\\]\\(${roomURL}\\)`));
    });

    it('should correctly generate version info', () => {
        expect(cliRuns[0]).to.match(new RegExp(`Latest version: ${packageInfo.version}`));
    });

    it('should correctly generate the screenshot section', () => {
        expect(cliRuns[0]).to.match(new RegExp(`!\\[${screenshotAlt}\\]\\(${screenshotURL}\\)`));
    });

    it('should correctly generate tags', () => {
        const generatedTags = cliRuns[0].split("\n\n")[1];
        expect(generatedTags).to.equal(tags.join(" "));
    });

    it('should correctly generate title', () => {
        const [title] = cliRuns[0].split("\n\n");
        expect(title.endsWith(packageInfo.description)).to.be.true;
    });
});