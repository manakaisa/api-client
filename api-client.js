function transformHeaders (headers) {
  let oHeaders = {};
  for (let key of headers.keys()) {
    oHeaders[key] = headers.get(key);
  }
  return oHeaders;
}

async function transformResponsePromise (res) {
  return {
    headers: transformHeaders(res.headers),
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    body: await res.json()
  };
}

export default class API {
  constructor (url, options = {}) {
    this._url = url;
    this._options = {};

    this._options.headers = new Headers(options.headers);
    this._options.headers.append('Content-Type', 'application/json');
    
    this._options.mode = options.mode;

    this._setRevalidatedURLs = new Set();
  }
  
  get headers () {
    return this._options.headers;
  }

  async get (path, cache) {
    let cacheMode = cache;
    if (cacheMode === 'force-cache-if-revalidated') {
      if (this._setRevalidatedURLs.has(path)) {
        cacheMode = 'force-cache';
      } else {
        cacheMode = 'default';
      }
    }

    let result = await fetch(this._url + path, {
      mode: this._options.mode,
      headers: this._options.headers,
      cache: cacheMode
    }).then((res) => transformResponsePromise(res));

    if (result.ok === true) {
      if (cacheMode == null || cacheMode === 'default' || cacheMode === 'reload' || cacheMode === 'no-cache') {
        this._setRevalidatedURLs.add(path);
      }
    }

    return result;
  }

  async post (path, data) {
    return fetch(this._url + path, {
      mode: this._options.mode,
      headers: this._options.headers,
      method: 'POST',
      body: JSON.stringify(data)
    }).then((res) => transformResponsePromise(res));
  }

  async put (path, data) {
    return fetch(this._url + path, {
      mode: this._options.mode,
      headers: this._options.headers,
      method: 'PUT',
      body: JSON.stringify(data)
    }).then((res) => transformResponsePromise(res));
  }

  async patch (path, data) {
    return fetch(this._url + path, {
      mode: this._options.mode,
      headers: this._options.headers,
      method: 'PATCH',
      body: JSON.stringify(data)
    }).then((res) => transformResponsePromise(res));
  }

  async delete (path, data) {
    return fetch(this._url + path, {
      mode: this._options.mode,
      headers: this._options.headers,
      method: 'DELETE',
      body: JSON.stringify(data)
    }).then((res) => transformResponsePromise(res));
  }
}
