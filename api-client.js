function transformHeaders (mapHeaders) {
  let headers = {};
  for (let key of mapHeaders.keys()) {
    headers[key] = mapHeaders.get(key);
  }
  return headers;
}

async function transformResponsePromise (res) {
  return {
    headers: transformHeaders(res.headers),
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    data: await res.json()
  };
}

export default class API {
  constructor (url, options = {}) {
    this._url = url;
    this._options = {};

    this._options.headers = options.headers || {};
    this._options.headers['Content-Type'] = 'application/json';
    this._options.mode = 'same-origin';
    if (options.cors === true) {
      this._options.mode = 'cors';
    }

    this._mapRevalidatedURLs = new Map();
  }

  async get (path, cacheMode) {
    if (cacheMode === 'force-cache-if-revalidated') {
      if (this._mapRevalidatedURLs.get(path) === true) {
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
        this._mapRevalidatedURLs.set(path, true);
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
