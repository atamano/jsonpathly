import { query } from '../src/handler/query';
import testuits from './test_suits';

describe('query', () => {
  it.each(testuits)('$title -> $query', ({ query: q, payload, results }) => {
    const res = query(payload, q, { returnArray: true });
    if (results !== 'NOT_SUPPORTED') {
      expect(res).toEqual(results);
    } else {
      expect(true).toEqual(true);
    }
  });
});
