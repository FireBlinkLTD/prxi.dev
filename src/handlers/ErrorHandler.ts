import { IncomingMessage, ServerResponse } from "http";
import { ErrorHandler } from "prxi";
import { sendErrorResponse } from "../utils/ResponseUtils";

export const errorHandler: ErrorHandler = async (req: IncomingMessage, res: ServerResponse, err: Error) => {
  await sendErrorResponse(req, 500, 'Unexpected error occurred', res);
}

