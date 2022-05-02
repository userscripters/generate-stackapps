import { AssertionError } from "chai";
import { join } from "path";
import type { Browser } from "../src/stackapps.js";
import { getPackage } from "../src/utils/package.js";

export const basePath = process.cwd();
export const packagePath = join(basePath, "/package.json");

const pkg = await getPackage(packagePath);
if (!pkg) {
    throw new AssertionError("missing package.json");
}

export const about = "Generates a StackApps post for the project";
export const excerpt = pkg.description;
export const installURL = pkg.repository.url;
export const languages = ["TypeScript"];
export const minifiedURL = installURL;
export const orgName = "UserScripters";
export const orgURL = "https://github.com/orgs/userscripters";
export const packageInfo = pkg;
export const roomURL = "https://chat.stackoverflow.com/rooms/214345";
export const screenshotAlt = "example screenshot";
export const screenshotURL = `${pkg.homepage}/screenshot.jpg`;
export const tags = ["script", "package"];
export const testedIn: Partial<Record<Browser, string>> = {
    chrome: "100.0.0",
    edge: "no",
    explorer: "no",
    firefox: "99.0",
    opera: "no"
};
export const thumbnailURL = `${pkg.homepage}/thumb.png`;