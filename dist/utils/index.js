/**
 * @summary makes a Markdown link
 * @param url URL to format
 * @param title title of the link
 */
export const mdLink = (url, title) => `[${title}](${url})`;
/**
 * @summary creates a StackApps template comment
 * @param type template comment type
 * @param value templace comment value
 */
export const makeTemplateComment = (type, value) => `<!-- ${type}: ${value} -->`;
