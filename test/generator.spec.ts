import { expect } from "chai";
import { generateStackApps, type GeneratorOptions } from "../src/stackapps.js";
import { parseAuthor } from "../src/utils/author.js";
import { scase } from "../src/utils/common.js";
import { about, contributors, excerpt, installURL, minifiedURL, orgName, orgURL, packageInfo, roomURL, screenshotAlt, screenshotURL, tags, testedIn, thumbnailURL, worksWith } from "./fixtures.spec.js";

describe(generateStackApps.name, async () => {
    const generatorOptions: GeneratorOptions = {
        about,
        excerpt,
        installURL,
        languages: ["TypeScript"],
        minifiedURL,
        orgName,
        orgURL,
        roomURL,
        screenshotAlt,
        screenshotURL,
        tags,
        testedIn,
        thumbnailURL,
        worksWith
    };

    const output = generateStackApps(packageInfo, generatorOptions);

    const { body, tags: generatedTags, title } = output;

    it('should correctly generate meta headers', () => {
        expect(body).to.match(new RegExp(`<!-- excerpt: ${excerpt} -->`));
        expect(body).to.match(new RegExp(`<!-- tag: ${tags[0]} -->`));
        expect(body).to.match(new RegExp(`<!-- thumbnail: ${thumbnailURL} -->`));
        expect(body).to.match(new RegExp(`<!-- version: ${packageInfo.version} -->`));
    });

    it('should correctly generate the about section', () => {
        expect(body).to.match(new RegExp(`^${about}$`, "m"));
    });

    it('should correctly generate author info', () => {
        const { name, url } = parseAuthor(packageInfo.author);
        expect(body).to.match(new RegExp(`\\[${name}\\]\\(${url}\\)`));
    });

    it('should correctly generate contributors list', () => {
        contributors.forEach(({ name, url }) => {
            expect(body).to.match(new RegExp(`\\[${name}\\]\\(${url}\\)`));
        });
    });

    it('should correctly generate code info', () => {
        const { homepage } = packageInfo;

        expect(body).to.match(
            new RegExp(`\\[Source code\\]\\(${homepage}/blob/master/src/index\\.ts\\)`)
        );
        expect(body).to.match(
            new RegExp(`\\[submit a PR here\\]\\(${homepage}/pulls\\)`)
        );
        expect(body).to.match(
            new RegExp(`\\[on the source repository\\]\\(${homepage}/issues\\)`)
        );
    });

    it('should correctly generate the download section', () => {
        expect(body).to.match(new RegExp(`\\[Install\\]\\(${packageInfo.repository.url.replace(/([.+])/g, "\\$1")}\\)`));
        expect(body).to.match(new RegExp(`\\[Minified\\]\\(${minifiedURL.replace(/([.+])/g, "\\$1")}\\)`));
    });

    it('should correctly generate the license section', () => {
        const { license } = packageInfo;

        expect(body).to.match(
            new RegExp(`\\[${license}\\]\\(https://spdx.org/licenses/${license}\\)`)
        );
    });

    it('should correctly generate the platform section', () => {
        const browserNames = Object.keys(testedIn).map(scase).join(" | ");
        expect(body).to.include(`| ${browserNames} |`);
        expect(body).to.include(`| ✔ ${testedIn.chrome || "-"} |`);

        const managers = worksWith.map((n) => `- ${scase(n)}`).join("\n");
        expect(body).to.include(managers);
    });

    it('should skip the platform section on no testing data', () => {
        const { worksWith, testedIn, ...options } = generatorOptions;
        const { body } = generateStackApps(packageInfo, options);
        expect(body).to.not.include("## Platform");
        expect(body).to.not.include("Supported userscript managers");
    });

    it('should correctly generate org info', () => {
        expect(body).to.match(new RegExp(`\\[${orgName}\\]\\(${orgURL}\\)`));
    });

    it('should correctly generate room info', () => {
        expect(body).to.match(new RegExp(`\\[drop by to chat\\]\\(${roomURL}\\)`));
    });

    it('should correctly generate version info', () => {
        expect(body).to.match(new RegExp(`Latest version: ${packageInfo.version}`));
    });

    it('should correctly generate the screenshot section', () => {
        expect(body).to.match(new RegExp(`!\\[${screenshotAlt}\\]\\(${screenshotURL}\\)`));
    });

    it('should correctly generate tags', () => {
        expect(generatedTags).to.equal(tags.join(" "));
    });

    it('should correctly generate title', () => {
        expect(title.endsWith(packageInfo.description)).to.be.true;
    });
});