/*
 * Limits shared by the server and the chat page. They live apart from the modules that use them so
 * the page can import them without pulling Zod or the AI SDK into the browser.
 */

/** How many of the latest messages are sent to the model (ADR-0015). */
export const HISTORY_LIMIT = 6;

/** The longest message a parent can send. The page's text box enforces it, and so does the server. */
export const MAX_MESSAGE_LENGTH = 1000;
