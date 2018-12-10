# API-Client
A API client

## API
- constructor(url[, options])
  ```
  options:
  {
    cors: false,
    headers: {}
  }
  ```
- Headers => <Headers\>
- get(path[, cacheMode]) => <Ppromise<response\>>
  ```
  cacheMode: "value of default|no-store|reload|no-cache|force-cache|only-if-cached|force-cache-if-revalidate"
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
  
