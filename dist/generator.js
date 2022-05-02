import { appendFile } from "fs/promises";
import { generateStackApps } from "./stackapps.js";
import { getPackage } from "./utils/package.js";
/**
 * @summary generates a StackApps post from options
 * @param options {@link CLIGeneratorOptions} to use
 */
export const generate = async (options) => {
    const { cli = false, direct, outputPath, packagePath } = options;
    try {
        const pkg = await getPackage(packagePath);
        if (!pkg) {
            // TODO: handle
            return;
        }
        if (!outputPath) {
            // TODO: handle
            return;
        }
        const output = generateStackApps(pkg, options);
        if (!cli)
            return output;
        const { body, tags, title } = output;
        const content = [title, tags, body].join("\n\n");
        if (direct) {
            process.stdout.write(content);
            return output;
        }
        await appendFile(outputPath, content, { encoding: "utf-8", flag: "w+" });
        return output;
    }
    catch (error) {
        console.log(error);
        // TODO: handle
    }
};
export default generate;
