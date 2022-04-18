import { query } from '../../src/handler';

const PAYLOAD = {
  string: 'stringValue',
  number: 0,
  arrayOfNumber: [1, 2, 3, 4, 5],
  arrayOfString: ['11', '22', '33', '44', '55'],
  nestedObject: {
    object: {
      test: '1',
    },
    array: [
      {
        item: {
          hello: {
            hello: [{ hello: { toto: '123' } }],
          },
        },
      },
      {
        item: {
          hello: {
            hello: [{ hello: { toto: '2501' } }],
          },
        },
      },
      {
        item: {
          hello: {
            hello: [{ hello: ' 13' }],
          },
        },
      },
    ],
  },
};

describe('query with dot notations', () => {
  const textCases = [
    { path: `$.string`, expected: PAYLOAD.string },
    { path: `$.number`, expected: PAYLOAD.number },
    { path: `$.arrayOfNumber`, expected: PAYLOAD.arrayOfNumber },
    { path: `$.nestedObject`, expected: PAYLOAD.nestedObject },
    { path: `$.nestedObject.object`, expected: PAYLOAD.nestedObject.object },
    { path: `$.nestedObject.object.test`, expected: PAYLOAD.nestedObject.object.test },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});
