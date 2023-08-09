export interface Options {
  request: Record<string, string | string[] | null>;
  response: Record<string, string | string[] | null>;
}

export interface ServerConfig {
  port: number;
  upstream: string;
  options: Options;
}
