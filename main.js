const CONTENT_TYPE = "application/json";

/**
 * Strip comments from a JSON string
 *
 * @param data the JSON string with comments
 * @returns the JSON string without comments
 */
const stripCommentsFromJson = (data) =>
  data.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
    g ? "" : m
  );

/**
 * Remove comment from the body
 * @param context insomnia request context
 * @link https://docs.insomnia.rest/insomnia/context-object-reference
 */
const bodyHook = (context) => {
  const body = context.request.getBody();
  if (body.mimeType === CONTENT_TYPE) {
    context.request.setBody({
      ...body,
      text: stripCommentsFromJson(body.text),
    });
  }
};

module.exports.requestHooks = [bodyHook];
