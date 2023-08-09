import { Prxi } from 'prxi';
import { onShutdown } from "node-graceful-shutdown";

import getLogger from "./Logger";
import { ProxyHandler } from './handlers/ProxyHandler';
import { errorHandler } from './handlers/ErrorHandler';
import { ServerConfig } from './ServerConfig';

// Prepare logger
const logger = getLogger('Server');

/**
 * Configuration
 * @param config
 */
export const handler = async (config: ServerConfig) => {
  // Prepare proxy configuration
  const prxi = new Prxi({
    logInfo: (message: any, ...params: any[]) => {
      logger.child({params}).info(message);
    },
    logError: (message: any, ...params: any[]) => {
      logger.child({params}).error(message);
    },
    port: config.port,
    errorHandler,
    upstream: [
      {
        target: config.upstream,
        requestHandlers: [
          ProxyHandler,
        ]
      }
    ],
    proxyRequestHeaders: config.options.request,
    responseHeaders: config.options.response,
  });

  try {
    logger.child({config}).info('Starting listening connections');
    await prxi.start();

    onShutdown(async () => {
      logger.info('Gracefully shutting down the server');
      await prxi.stop();
    });
  } catch (e) {
    logger.child({error: e, config}).error('Failed to start proxy server');
    process.exit(1);
  }
}
