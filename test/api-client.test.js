const tester = require('./tester.js');
const cmdsAPIClient = require('./commands/api-client.commands.js');
const tcsAPIClient = require('./testcases/api-client.testcases.json');

tester.use(cmdsAPIClient);
tester.test(tcsAPIClient);
