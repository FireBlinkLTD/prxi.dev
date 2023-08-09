import pino from 'pino';

/**
 * Get logger
 * @param context
 * @param tag
 * @returns
 */
const getLogger = (tag: string) => {
  return pino({
    name: '@prxi/dev',
    level: 'debug',
    mixin() {
      return { tag }
    },
    base: {
      pid: undefined,
    },
    transport: {
      target: 'pino-pretty'
    }
  });
};

export default getLogger;
