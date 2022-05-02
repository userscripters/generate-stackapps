type TemplateCommentType = "excerpt" | "tag" | "thumbnail" | "version";

/**
 * @summary makes a Markdown link
 * @param url URL to format
 * @param title title of the link
 */
export const mdLink = (url: string, title: string) => `[${title}](${url})`;

/**
 * @summary creates a StackApps template comment
 * @param type template comment type
 * @param value templace comment value
 */
export const makeTemplateComment = (type: TemplateCommentType, value: string) => `<!-- ${type}: ${value} -->`;