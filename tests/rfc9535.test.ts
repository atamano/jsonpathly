import assert from 'assert';
import { promises as fs } from 'fs'; // Utilisation de fs.promises pour la lecture asynchrone des fichiers
import { query } from '../src/handler/query';

// From https://github.com/jsonpath-standard/jsonpath-compliance-test-suite
describe('JSONPath Compliance Test Suite', async function () {
  const testData = JSON.parse(await fs.readFile('./cts.json', 'utf8'));
  testData.tests.forEach((test: any) => {
    it(test.name, function () {
      if (test.invalid_selector) {
        assert.throws(() => query(test.document, test.selector), Error, 'Invalid selector should throw an error');
      } else {
        const result = query(test.document, test.selector);
        assert.deepStrictEqual(
          result,
          test.result,
          `Expected: ${JSON.stringify(test.result)}, but got: ${JSON.stringify(result)}`,
        );
      }
    });
  });
});
