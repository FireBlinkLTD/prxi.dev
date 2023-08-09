import { IncomingMessage, ServerResponse } from "http"

/**
 * Send error response based on the "Accept" header
 * @param req
 * @param statusCode
 * @param message
 * @param resp
 */
export const sendErrorResponse = async (req: IncomingMessage, statusCode: number, message: string, resp: ServerResponse): Promise<void>  => {
  if (req.headers.accept === 'application/json') {
    return await sendJsonResponse(statusCode, {
      error: true,
      details: {
        errorMessage: message,
        statusCode: statusCode,
      },
    }, resp);
  }

  await sendResponse(statusCode, 'text/plain', `${statusCode}: ${message}`, resp);
}

/**
 * Send JSON response
 * @param statusCode
 * @param json
 * @param resp
 */
export const sendJsonResponse = async (statusCode: number, json: any, resp: ServerResponse): Promise<void> => {
  await sendResponse(statusCode, 'application/json', JSON.stringify(json), resp);
}

/**
 * Send response
 * @param statusCode
 * @param contentType
 * @param content
 * @param resp
 */
export const sendResponse = async (statusCode: number, contentType: string, content: any, resp: ServerResponse): Promise<void> => {
  resp.statusCode = statusCode;
  resp.setHeader('content-type', contentType);

  await new Promise<void>((res, rej) => {
    resp.write(content, (error: Error) => {
      resp.end();

      if (error) {
        return rej(error);
      }
      res();
    });
  })
}
