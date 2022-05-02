/**
 * @summary formats author link from {@link PackagePerson}
 * @param info {@link PackagePerson} information
 */
export const formatAuthor = (info) => {
    const { name, email, url, } = info;
    return name + (email ? ` <${email}>` : "") + (url ? ` (${url})` : "");
};
/**
 * @summary parses author or contributors field from package.json
 * @param info {@link PackagePerson} information
 */
export const parseAuthor = (info) => {
    if (typeof info === "object")
        return info;
    const authorRegex = /(\w+(?:\s\w+)?)(?:\s<(.+?)>)?(?:\s\((.+?)\))?$/i;
    const match = authorRegex.exec(info);
    if (!match)
        throw new Error(`unable to parse author field: ${info}`);
    const [_full, name, email, url] = match;
    return {
        name,
        email,
        url,
    };
};
