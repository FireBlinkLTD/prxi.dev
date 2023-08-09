import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';
import { parse } from 'yamljs';
import { handler } from './Server';
import { ServerConfig } from './ServerConfig';

const args = parseArgs({
  options: {
    config: {
      type: 'string',
      short: 'c',
      default: '.prxi.yml'
    },
    option: {
      type: 'string',
      short: 'o'
    }
  },
});

const { config, option } = args.values;
const raw = readFileSync(config, 'utf-8');
const configObj: any = parse(raw);

const serverConfig: ServerConfig = {
  port: configObj.port,
  upstream: configObj.upstream,
  options: {
    request: configObj.default?.request || {},
    response: configObj.default?.response || {},
  },
};

if (option && configObj.options?.[option]?.request) {
  serverConfig.options.request = {... serverConfig.options.request, ...configObj.options[option].request }
}

if (option && configObj.options?.[option]?.response) {
  serverConfig.options.response = {... serverConfig.options.response, ...configObj.options[option].response }
}

handler(serverConfig);
