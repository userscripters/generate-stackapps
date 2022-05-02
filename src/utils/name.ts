import { scase } from "./common.js";

export interface PackageName {
    packageName: string;
    scope?: string;
    scopedName: string;
    normalizedScopedName: string;
}

/**
 * @summary parses package name
 * @param name string containing the name
 */
export const parsePackageName = (name: string): PackageName => {
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
export const prettifyPackageName = (name: string) =>
    name.split("-").map(scase).join(" ");
