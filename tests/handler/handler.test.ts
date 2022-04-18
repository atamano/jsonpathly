import { query } from '../../src/handler';

const PAYLOAD = {
  string: 'stringValue',
  number: 0,
  arrayOfNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    { path: `$.*`, expected: Object.values(PAYLOAD) },
    { path: `$.nestedObject.*`, expected: Object.values(PAYLOAD.nestedObject) },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});

describe('query with dot dot notations', () => {
  const textCases = [
    { path: `$..string`, expected: [PAYLOAD.string] },
    { path: `$..notExist`, expected: [] },
    { path: `$..hello.toto`, expected: ['123', '2501'] },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});

describe('query with bracket numeric value', () => {
  const textCases = [
    { path: `$.arrayOfNumber[1]`, expected: PAYLOAD.arrayOfNumber[1] },
    { path: `$.arrayOfNumber[10]`, expected: undefined },
    { path: `$.string[0]`, expected: undefined },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});

describe('query with bracket string value', () => {
  const textCases = [
    { path: `$["notExist"]`, undefined },
    { path: `$["string"]`, expected: PAYLOAD.string },
    { path: `$["nestedObject"]["object"]`, expected: PAYLOAD.nestedObject.object },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});

describe('query with array slice', () => {
  const textCases = [
    { path: `$.arrayOfNumber[1:3]`, expected: [2, 3] },
    { path: `$.arrayOfNumber[-1:]`, expected: [9] },
    { path: `$.arrayOfNumber[:3]`, expected: [1, 2, 3] },
    { path: `$.arrayOfNumber[5:2]`, expected: [] },
    { path: `$.arrayOfNumber[:7:2]`, expected: [1, 3, 5, 7] },
    { path: `$.arrayOfNumber[::3]`, expected: [1, 4, 7] },
    { path: `$.arrayOfNumber[2::3]`, expected: [3, 6, 9] },
    { path: `$.arrayOfNumber[:2:]`, expected: [1, 2] },
    { path: `$.arrayOfNumber[:2]`, expected: [1, 2] },
    { path: `$.arrayOfNumber[7::]`, expected: [8, 9] },
    { path: `$.arrayOfNumber[5::2]`, expected: [6, 8] },
    { path: `$.arrayOfNumber[:]`, expected: PAYLOAD.arrayOfNumber },
    { path: `$.arrayOfNumber[0:2:2]`, expected: [1] },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});
