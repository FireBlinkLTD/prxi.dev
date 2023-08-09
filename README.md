# @prxi/dev

Local development proxy server. Mainly used to inject custom headers to both request and response.

## Usage

Install globally:

```bash
npm i -g @prxi/dev
```

Create `.prxi.yml` inside you project like the following:

```yaml
# port to listen connections on
port: 4444
# upstream endpoint
upstream: http://localhost:8080
```

Run `prxi`

## CLI Options

- `-c --config [path]` - optional path to the configuration file, default one `.prxi.yml`
- `-o --option [name]` - optional name for the options file

## Custom Headers

Update `.prxi.yml` and add

```yaml
default:
  # additional request headers
  request:
    Authorization: Bearer 1

  # addition response headers
  response:
    X-Custom-Header: value
```

### Options

It is possible to define different options for the request/response headers that will be added to the default set, add the following to the `.prxi.yml`:

```yaml
options:
  option-name:
    # additional request headers
    request:
      Authorization: Bearer 2

    # addition response headers
    response:
      X-Custom-Header: value
```

Note: in the example above both `Authorization` and `X-Custom-Header` values will override the ones used in the `default` section.

To apply the options run `prxi` cli with the `-o --option` parameter, e.g:

```bash
prxi -o option-name
```
