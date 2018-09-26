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
- get(path[, cacheMode]) => promise<response\>
- post(path, data) => promise<response\>
- put(path, data) => promise<response\>
- patch(path, data) => promise<response\>
- delete(path) => promise<response\>
  ```
  response:
  {
    headers: {},
    ok: <boolean>,
    status: <number>,
    statusText: 'HTTP Status Text',
    data: {}
  }
  ```

## cacheMode: "force-cache-if-revalidate"
- check if response in cache is revalidated since API-Client initiates
- if response is revalidated, cacheMode will be "force-cache"
- if response is not revalidated, cacheMode will be "default" and response will be marked as revalidated

## Step Test
- copy tester.js to test/
- copy tester-plugin-webserver.js to test/plug-ins/
- copy tester-plugin-browser.js to test/plug-ins/
