# API-Client
A API client

## API
- constructor(url[, options])
  ```
  options:
  {
    mode: "value of same-origin|no-cors|cors",
    headers: {}
  }
  ```
- Headers => <Headers\>
- get(path[, cache]) => <Promise<response\>>
  ```
  cache: "value of default|no-store|reload|no-cache|force-cache|only-if-cached|force-cache-if-revalidate"
  ```
- post(path, data) => <Promise<response\>>
- put(path, data) => <Promise<response\>>
- patch(path, data) => <Promise<response\>>
- delete(path) => <Promise<response\>>
  ```
  response:
  {
    headers: {},
    ok: <boolean>,
    status: <number>,
    statusText: 'HTTP Status Text',
    body: {}
  }
  ```
