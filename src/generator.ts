import chalk from "chalk";
import { appendFile } from "fs/promises";
import { generateStackApps, type GeneratedPost, type GeneratorOptions } from "./stackapps.js";
import { getPackage } from "./utils/package.js";

export interface CLIGeneratorOptions extends GeneratorOptions {
    cli: boolean;
    direct?: boolean;
    outputPath: string;
    packagePath: string;
}

/**
 * @summary generates a StackApps post from options
 * @param options {@link CLIGeneratorOptions} to use
 */
export const generate = async (options: CLIGeneratorOptions): Promise<GeneratedPost | undefined> => {
    const { cli = false, direct, outputPath, packagePath } = options;

    try {
        const pkg = await getPackage(packagePath);
        if (!pkg) {
            console.log(chalk.bgRed`missing or corrupted package`);
            return;
        }

        if (cli && !outputPath) {
            console.log(chalk.bgRed`missing or output path`);
            return;
        }

        const output = generateStackApps(pkg, options);
        if (!cli) return output;

        const { body, tags, title } = output;

        const content = [title, tags, body].join("\n\n");

        if (direct) {
            process.stdout.write(content);
            return output;
        }

        await appendFile(outputPath, content, { encoding: "utf-8", flag: "w+" });

        return output;

    } catch (error) {
        const exceptionObject = error as NodeJS.ErrnoException;
        const { code, name } = exceptionObject;
        const errMap: {
            [code: string]: (err: NodeJS.ErrnoException) => [string, string];
        } = {
            ENOENT: ({ path }) => ["Missing path:", path!],
            default: ({ message }) => ["Something went wrong:", message],
        };

        const handler = errMap[code || "default"] || errMap.default;

        const [postfix, message] = handler(exceptionObject);

        console.log(chalk.bgRed`[${name}] ${postfix}` + `\n\n${message}`);
        return;
    }
};

export default generate;