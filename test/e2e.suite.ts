import {suite, test} from '@testdeck/mocha';
import { TestServer } from './helpers/TestServer';
import { Prxi } from 'prxi';
import { handler } from '../src/Server';
import { Options } from '../src/ServerConfig';
import { deepEqual } from 'assert';
import axios from 'axios';

@suite()
class E2ESuite {
  private static PROXY_PORT = 3333;
  private proxyUrl = `http://localhost:${E2ESuite.PROXY_PORT}`;
  private server: TestServer;
  private proxy: Prxi;

  /**
   * Before hook
   */
  async before(): Promise<void> {
    this.server = new TestServer();
    this.proxy = null;

    await this.server.start();
  }

  /**
   * After hook
   */
  async after(): Promise<void> {
    await this.proxy?.stop();
    await this.server.stop();
  }

  private async initProxy(options: Options): Promise<void> {
    this.proxy = await handler({
      port: E2ESuite.PROXY_PORT,
      upstream: `http://localhost:${TestServer.PORT}`,
      options,
    });
  }

  @test()
  async query(): Promise<void> {
    await this.initProxy({
      request: {},
      response: {},
    });

    const result = await axios.get(`${this.proxyUrl}/query?test=1`);
      deepEqual(result.data, {
        query: {
          test: '1',
        }
      });
  }

  @test()
  async headers(): Promise<void> {
    await this.initProxy({
      request: {
        'Additional': 'true',
      },
      response: {},
    });

    const result = await axios.get(`${this.proxyUrl}/headers`, {
      headers: {
        Test: 'true',
      }
    });
    const requestHeaders = {
      test: result.data.headers.test,
      additional: result.data.headers.additional,
    }

    deepEqual(requestHeaders, {
      test: 'true',
      additional: 'true',
    });
  }
}
