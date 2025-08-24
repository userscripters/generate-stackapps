import { scase } from "./common.js";
/**
 * @summary parses package name
 * @param name string containing the name
 */
export const parsePackageName = (name) => {
    const [, scope, packageName] = name.match(/(?:@([\w-]+)\/)?([\w-]+)/) || [];
    const scopedName = (scope ? `@${scope}/${packageName}` : packageName).toLowerCase();
    const normalizedScopedName = scopedName.replace(/^@/, "");
    return {
        scope,
        packageName,
        scopedName,
        normalizedScopedName
    };
};
/**
 *
 */
export const prettifyPackageName = (name) => name.split("-").map(scase).join(" ");
