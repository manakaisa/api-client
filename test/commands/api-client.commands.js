const tester = require('../tester.js');
const Webserver = require('../plug-ins/tester-plugin-webserver.js');
const Browser = require('../plug-ins/tester-plugin-browser.js');

var webserver = new Webserver();
var browser = new Browser({ debug: true });

tester.beforeTest(async () => {
  await webserver.staticFile('../../api-client.js');
  await webserver.start();
  await browser.connect(webserver.url);
  await browser.importJSModuleAsDefault('./api-client.js', 'API');
});

tester.afterTest(async () => {
  await browser.close();
  await webserver.stop();
});

var helpers = [
  {
    name: 'getWebServerURL',
    command: async () => {
      return webserver.url;
    }
  },
  {
    name: 'prepareWebAPI',
    command: async (inputData) => {
      if (inputData.method === 'GET') {
        webserver.get(inputData.path, (req, res) => {
          if (inputData.verifyRequestHeaders != null) {
            for (let key in inputData.verifyRequestHeaders) {
              if (req.get(key) !== inputData.verifyRequestHeaders[key]) return res.status(500).send({});
            }
          }
          res.set(inputData.responseHeaders);
          res.json(inputData.responseData);
        });
      } else if (inputData.method === 'POST') {
        webserver.post(inputData.path, (req, res) => {
          if (inputData.verifyRequestHeaders != null) {
            for (let key in inputData.verifyRequestHeaders) {
              if (req.get(key) !== inputData.verifyRequestHeaders[key]) return res.status(500).send({});
            }
          }
          if (inputData.verifyRequestData != null) {
            if (JSON.stringify(req.body) !== JSON.stringify(inputData.verifyRequestData)) return res.status(500).send({});
          }
          res.set(inputData.responseHeaders);
          res.json(inputData.responseData);
        });
      } else if (inputData.method === 'PUT') {
        webserver.put(inputData.path, (req, res) => {
          if (inputData.verifyRequestHeaders != null) {
            for (let key in inputData.verifyRequestHeaders) {
              if (req.get(key) !== inputData.verifyRequestHeaders[key]) return res.status(500).send({});
            }
          }
          if (inputData.verifyRequestData != null) {
            if (JSON.stringify(req.body) !== JSON.stringify(inputData.verifyRequestData)) return res.status(500).send({});
          }
          res.set(inputData.responseHeaders);
          res.json(inputData.responseData);
        });
      } else if (inputData.method === 'PATCH') {
        webserver.patch(inputData.path, (req, res) => {
          if (inputData.verifyRequestHeaders != null) {
            for (let key in inputData.verifyRequestHeaders) {
              if (req.get(key) !== inputData.verifyRequestHeaders[key]) return res.status(500).send({});
            }
          }
          if (inputData.verifyRequestData != null) {
            if (JSON.stringify(req.body) !== JSON.stringify(inputData.verifyRequestData)) return res.status(500).send({});
          }
          res.set(inputData.responseHeaders);
          res.json(inputData.responseData);
        });
      } else if (inputData.method === 'DELETE') {
        webserver.delete(inputData.path, (req, res) => {
          if (inputData.verifyRequestHeaders != null) {
            for (let key in inputData.verifyRequestHeaders) {
              if (req.get(key) !== inputData.verifyRequestHeaders[key]) return res.status(500).send({});
            }
          }
          if (inputData.verifyRequestData != null) {
            if (JSON.stringify(req.body) !== JSON.stringify(inputData.verifyRequestData)) return res.status(500).send({});
          }
          res.set(inputData.responseHeaders);
          res.json(inputData.responseData);
        });
      }
    }
  },
  {
    name: 'setBrowserOffline',
    command: async () => {
      await browser.setOfflineMode(true);
    }
  },
  {
    name: 'setBrowserOnline',
    command: async () => {
      await browser.setOfflineMode(false);
    }
  }
];

var commmands = [
  {
    name: 'constructor',
    command: async (inputData) => {
      webserver.use((req, res, next) => {
        res.status(404).send({});
      });

      await browser.evaluate((url, options) => {
        window.api = new window.API(url, options);
      }, inputData.url, inputData.options);
    }
  },
  {
    name: 'get',
    command: async (inputData) => {
      return browser.evaluate(async (path, cacheMode) => {
        return window.api.get(path, cacheMode);
      }, inputData.path, inputData.cacheMode);
    }
  },
  {
    name: 'post',
    command: async (inputData) => {
      return browser.evaluate((path, data) => {
        return window.api.post(path, data);
      }, inputData.path, inputData.data);
    }
  },
  {
    name: 'put',
    command: async (inputData) => {
      return browser.evaluate((path, data) => {
        return window.api.put(path, data);
      }, inputData.path, inputData.data);
    }
  },
  {
    name: 'patch',
    command: async (inputData) => {
      return browser.evaluate((path, data) => {
        return window.api.patch(path, data);
      }, inputData.path, inputData.data);
    }
  },
  {
    name: 'delete',
    command: async (inputData) => {
      return browser.evaluate((path, data) => {
        return window.api.delete(path, data);
      }, inputData.path, inputData.data);
    }
  }
];

module.exports = commmands.concat(helpers);
