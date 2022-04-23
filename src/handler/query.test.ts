import { query } from './query';

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
          nested: {
            nested: [{ nested: { value: '123', exist: true } }],
          },
        },
      },
      {
        item: {
          nested: {
            nested: [{ nested: { value: '2501' } }],
          },
        },
      },
      {
        item: {
          nested: {
            nested: [{ nested: '13' }],
          },
        },
      },
    ],
  },
  arraySimpleObjects: [
    { number: 2, string: 'ABC', exist: true, array: [1, 2, 3] },
    { number: 5, string: 'BCD', array: [4, 5, 6] },
    { number: 7, string: 'CDE', array: [4, 5, 6] },
  ],
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
    { path: `$..notExist`, expected: [] },
    { path: `$..["nested"].value`, expected: ['123', '2501'] },
    { path: `$..[number, string]`, expected: [0, 'stringValue', 2, 'ABC', 5, 'BCD', 7, 'CDE'] },
    { path: `$..arraySimpleObjects[*]["number", "string"]`, expected: [2, 'ABC', 5, 'BCD', 7, 'CDE'] },
    { path: `$..nested.value`, expected: ['123', '2501'] },
    { path: `$..nested["value"]`, expected: ['123', '2501'] },
    { path: `$..nested.nested..value`, expected: ['123', '2501'] },
    { path: `$..nested..value`, expected: ['123', '123', '123', '2501', '2501', '2501'] },
    {
      path: `$..nested..*..value`,
      expected: ['123', '123', '123', '123', '123', '2501', '2501', '2501', '2501', '2501'],
    },
    { path: `$..*.object`, expected: [{ test: '1' }] },
    { path: `$..*.object..test`, expected: ['1'] },
    { path: `$..*.object.test`, expected: ['1'] },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});

describe('query with bracket numeric value', () => {
  const textCases = [
    { path: `$.arrayOfNumber[1]`, expected: 2 },
    { path: `$.arrayOfNumber[1,3,5]`, expected: [2, 4, 6] },
    { path: `$.arrayOfNumber[10,11,12]`, expected: [] },
    { path: `$.arrayOfNumber[10,1,12]`, expected: [2] },
    { path: `$.arrayOfNumber[10]`, expected: undefined },
    { path: `$.string[0]`, expected: PAYLOAD.string[0] },
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
    // Different implementation depending on libraries
    { path: `$["string", "number"]`, expected: [PAYLOAD.string, PAYLOAD.number] },
    { path: `$["nestedObject"]["object"]`, expected: PAYLOAD.nestedObject.object },
    { path: `$[nestedObject]`, expected: PAYLOAD.nestedObject },
    { path: `$[*]`, expected: Object.values(PAYLOAD) },
    { path: `$[*]["object"]`, expected: [PAYLOAD.nestedObject.object] },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});

describe('query with array slice', () => {
  const textCases = [
    { path: `$.string[1:3]`, expected: [] },
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

describe('query with comparators', () => {
  const textCases = [
    {
      path: `$.arraySimpleObjects[?(@.number=="2")]..number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>="5")].number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>"5")].number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number<="5")].number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number<"5")].number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number in "5")].number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number nin "5")].number`,
      expected: [],
    },
    {
      path: `$[?([1,2,3] subsetof @.arrayOfNumber)]`,
      expected: [PAYLOAD],
    },
    {
      path: `$[?([10,3,3] subsetof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?(123 subsetof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?([10,11,2] anyof @.arrayOfNumber)]`,
      expected: [PAYLOAD],
    },
    {
      path: `$[?([10,11,12] anyof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?(123 anyof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?([10,11,12] noneof @.arrayOfNumber)]`,
      expected: [PAYLOAD],
    },
    {
      path: `$[?([10,11,1] noneof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?(123 noneof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?(@.arrayOfNumber sizeof @.arrayOfNumber)]`,
      expected: [PAYLOAD],
    },
    {
      path: `$[?(123 sizeof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?([1,2,3,4,5,6,7,8,9,10] sizeof @.arrayOfNumber)]`,
      expected: [],
    },
    {
      path: `$[?(@.arrayOfNumber size 9)]`,
      expected: [PAYLOAD],
    },
    {
      path: `$[?(@.arrayOfNumber size "9")]`,
      expected: [],
    },
    {
      path: `$[?(@.arrayOfNumber size 8)]`,
      expected: [],
    },
    {
      path: `$[?(123 sizeof 9)]`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number==2)].number`,
      expected: [2],
    },
    {
      path: `$.arraySimpleObjects[?(@.number!=2)].number`,
      expected: [5, 7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number==2)]..number`,
      expected: [2],
    },
    {
      path: `$.arraySimpleObjects[?(@.exist)].number`,
      expected: [2],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>=5)].number`,
      expected: [5, 7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>5)].number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number<=5)].number`,
      expected: [2, 5],
    },
    {
      path: `$.arraySimpleObjects[?(@.number<5)].number`,
      expected: [2],
    },
    {
      path: `$.arraySimpleObjects[?(@.number in [1,2])].number`,
      expected: [2],
    },
    {
      path: `$.arraySimpleObjects[?(@.number nin [1,2])].number`,
      expected: [5, 7],
    },
    {
      path: `$.arraySimpleObjects[?(1 in @.array)].number`,
      expected: [2],
    },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});

describe('query with script expressions', () => {
  const t = () => {
    query(PAYLOAD, '$.arraySimpleObjects[(@.length-1)]');
  };
  expect(t).toThrow(Error);
});

describe('query with logical expressions', () => {
  const textCases = [
    {
      path: `$.arraySimpleObjects[?(@.number==2 || @.number==7)].number`,
      expected: [2, 7],
    },
    {
      path: `$.arraySimpleObjects[?(4 in @.array && @.string=="BCD")].number`,
      expected: [5],
    },
    {
      path: `$.arraySimpleObjects[?( (4 in @.array && @.string=="BCD") || @.number==2 )].number`,
      expected: [2, 5],
    },
    {
      path: `$.arraySimpleObjects[?( !((4 in @.array && @.string=="BCD") || @.number==2) )].number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?( $.number==0 )].number`,
      expected: [2, 5, 7],
    },
    {
      path: `$.arraySimpleObjects[?($.number)].number`,
      expected: [2, 5, 7],
    },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });
});
