import { IncomingMessage, ServerResponse } from "http";
import { HttpMethod, ProxyRequest, RequestHandlerConfig } from "prxi";

export const ProxyHandler: RequestHandlerConfig = {
  isMatching: (method: HttpMethod, path: string) => {
    return true;
  },

  handle: async (req: IncomingMessage, res: ServerResponse, proxyRequest: ProxyRequest) => {
    await proxyRequest();
  }
}
