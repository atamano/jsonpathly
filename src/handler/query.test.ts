import { JSONPathSyntaxError } from '../parser/errors';
import { query } from './query';

describe('query with dot notations', () => {
  const PAYLOAD = {
    string: 'string',
    array: [1, 2, 3, 4],
    nested: {
      object: 1,
    },
  };
  const textCases = [
    { payload: PAYLOAD, path: `$.string`, expected: PAYLOAD.string },
    { payload: PAYLOAD, path: `$.array.2`, expected: PAYLOAD.array[2] },
    { payload: PAYLOAD, path: `$.array.10`, expected: undefined },
    { payload: PAYLOAD, path: `$.array.-1`, expected: PAYLOAD.array[3] },
    { payload: PAYLOAD, path: `$.nested.object`, expected: PAYLOAD.nested.object },
    { payload: PAYLOAD, path: `$.*`, expected: Object.values(PAYLOAD) },
    { payload: PAYLOAD, path: `$.*.object`, expected: [1] },
    { payload: PAYLOAD, path: `$.nested.*`, expected: Object.values(PAYLOAD.nested) },
    { payload: PAYLOAD, path: `$.bad`, expected: undefined },
    { payload: [PAYLOAD], path: `$.string`, expected: undefined },
  ];

  test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
    const res = query(payload, path);

    expect(res).toEqual(expected);
  });
});

describe('query with dot dot notations', () => {
  describe('query with identifier / stringLiteral / numericLiteral', () => {
    const PAYLOAD = {
      nested: {
        nested: [
          {
            nested: 2,
            exist: true,
          },
          {
            nested: 3,
            test: { nested: [] },
          },
        ],
      },
      other: {
        object: {
          test: '1',
        },
      },
    };
    const textCases = [
      { payload: PAYLOAD, path: `$..notExist`, expected: [] },
      {
        payload: PAYLOAD,
        path: `$..other`,
        expected: [PAYLOAD.other],
      },
      {
        payload: PAYLOAD,
        path: `$..["nested"].nested..test`,
        expected: [PAYLOAD.nested.nested[1].test],
      },
      {
        payload: PAYLOAD,
        path: `$..nested["nested"]..["test"]`,
        expected: [PAYLOAD.nested.nested[1].test],
      },
      {
        payload: PAYLOAD,
        path: `$..nested.nested[0]`,
        expected: [PAYLOAD.nested.nested[0]],
      },
      {
        payload: PAYLOAD,
        path: `$..nested.nested.1`,
        expected: [PAYLOAD.nested.nested[1]],
      },
      {
        payload: PAYLOAD,
        path: `$..nested.nested.1.test`,
        expected: [PAYLOAD.nested.nested[1].test],
      },
    ];

    test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
      const res = query(payload, path);

      expect(res).toEqual(expected);
    });
  });

  describe('query with wildcard', () => {
    const PAYLOAD = {
      nested: {
        nested: [
          {
            nested: 2,
            exist: true,
          },
          {
            nested: 3,
            test: { nested: [] },
          },
        ],
      },
      other: {
        object: {
          test: '1',
        },
      },
    };
    const textCases = [
      { payload: { store: { book: [1, 2, 3] } }, path: `$.*.book`, expected: [[1, 2, 3]] },
      { payload: { store: { book: [1, 2, 3] } }, path: `$..*..book`, expected: [[1, 2, 3]] },
      { payload: { store: { book: [1, 2, 3] } }, path: `$..*..book[*]`, expected: [1, 2, 3] },
      { payload: PAYLOAD, path: `$..*.nested..nested`, expected: [2, 3, []] },
      { payload: PAYLOAD, path: `$..*..*[0].nested`, expected: [2] },
      { payload: PAYLOAD, path: `$..*..*[10].nested`, expected: [] },
      { payload: PAYLOAD, path: `$..nested.nested[*]["nested", "exist"]`, expected: [2, true, 3] },
      { payload: [PAYLOAD], path: `$..nested.nested[*]["nested", "exist"]`, expected: [2, true, 3] },
      { payload: PAYLOAD, path: `$..*.object`, expected: [{ test: '1' }] },
      { payload: PAYLOAD, path: `$..*.object..test`, expected: ['1'] },
      { payload: PAYLOAD, path: `$..*.object.test`, expected: ['1'] },
      { payload: [PAYLOAD], path: `$..*.object.test`, expected: ['1'] },
    ];

    test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
      const res = query(payload, path);

      expect(res).toEqual(expected);
    });
  });

  describe('query with filters', () => {
    const PAYLOAD = {
      nested: {
        nested: [{ number: 1, exist: true }, { number: 2 }, { number: 3 }],
      },
    };

    const textCases = [
      { payload: PAYLOAD, path: `$..nested.*["number", "exist"]`, expected: [1, true, 2, 3] },
      {
        payload: PAYLOAD,
        path: `$..nested[?(@.number==1)]`,
        expected: [PAYLOAD.nested.nested[0]],
      },
      {
        payload: PAYLOAD,
        path: `$..[?(@.number < 2 )]`,
        expected: [{ number: 1, exist: true }],
      },
      {
        payload: PAYLOAD,
        path: `$..nested[?(@.number>=2)]`,
        expected: [PAYLOAD.nested.nested[1], PAYLOAD.nested.nested[2]],
      },
      {
        payload: PAYLOAD,
        path: `$..nested[?(@.number>=2)].number`,
        expected: [2, 3],
      },
      {
        payload: PAYLOAD,
        path: `$..nested[?(@.exist)]`,
        expected: [PAYLOAD.nested.nested[0]],
      },
      {
        payload: PAYLOAD,
        path: `$..nested[0,2]`,
        expected: [PAYLOAD.nested.nested[0], PAYLOAD.nested.nested[2]],
      },
      {
        payload: PAYLOAD,
        path: `$..nested[:2]`,
        expected: [PAYLOAD.nested.nested[0], PAYLOAD.nested.nested[1]],
      },
    ];

    test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
      const res = query(payload, path);

      expect(res).toEqual(expected);
    });
  });
});

describe('query with bracket numeric value', () => {
  const PAYLOAD = {
    string: 'stringValue',
    number: 0,
    arrayOfNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };

  const textCases = [
    { payload: PAYLOAD, path: `$.arrayOfNumber[-1]`, expected: 9 },
    { payload: PAYLOAD, path: `$.arrayOfNumber[1]`, expected: 2 },
    { payload: PAYLOAD, path: `$.arrayOfNumber[1,3,5]`, expected: [2, 4, 6] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[10,11,12]`, expected: [] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[10,1,12]`, expected: [2] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[10]`, expected: undefined },
    { payload: PAYLOAD, path: `$.string[0]`, expected: PAYLOAD.string[0] },
    { payload: PAYLOAD, path: `$.string[0,1,2]`, expected: [] },
    { payload: PAYLOAD, path: `$.number[0]`, expected: undefined },
    { payload: PAYLOAD, path: `$.number.0`, expected: undefined },
  ];

  test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
    const res = query(payload, path);

    expect(res).toEqual(expected);
  });
});

describe('query with bracket string value', () => {
  const PAYLOAD = {
    string: 'stringValue',
    number: 0,
    arrayOfNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    arrayOfString: ['11', '22', '33', '44', '55'],
    nestedObject: {
      object: {
        test: '1',
      },
    },
  };

  const textCases = [
    { payload: PAYLOAD, path: `$["notExist"]`, undefined },
    { payload: PAYLOAD, path: `$["string"]`, expected: PAYLOAD.string },
    // Different implementation depending on libraries
    { payload: PAYLOAD, path: `$[string, number]`, expected: [PAYLOAD.string, PAYLOAD.number] },
    { payload: PAYLOAD, path: `$["string", "number"]`, expected: [PAYLOAD.string, PAYLOAD.number] },
    { payload: PAYLOAD, path: `$["nestedObject"]["object"]`, expected: PAYLOAD.nestedObject.object },
    { payload: PAYLOAD, path: `$[nestedObject]`, expected: PAYLOAD.nestedObject },
    { payload: PAYLOAD, path: `$[*]`, expected: Object.values(PAYLOAD) },
    { payload: PAYLOAD, path: `$[*]["object"]`, expected: [PAYLOAD.nestedObject.object] },
  ];

  test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
    const res = query(payload, path);

    expect(res).toEqual(expected);
  });
});

describe('query with array slice', () => {
  const PAYLOAD = {
    string: 'stringValue',
    arrayOfNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };

  const textCases = [
    { payload: PAYLOAD, path: `$.string[1:3]`, expected: [] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[1:3]`, expected: [2, 3] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[-1:]`, expected: [9] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[:3]`, expected: [1, 2, 3] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[5:2]`, expected: [] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[:7:2]`, expected: [1, 3, 5, 7] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[::3]`, expected: [1, 4, 7] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[2::3]`, expected: [3, 6, 9] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[:2:]`, expected: [1, 2] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[:2]`, expected: [1, 2] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[7::]`, expected: [8, 9] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[5::2]`, expected: [6, 8] },
    { payload: PAYLOAD, path: `$.arrayOfNumber[:]`, expected: PAYLOAD.arrayOfNumber },
    { payload: PAYLOAD, path: `$.arrayOfNumber[0:2:2]`, expected: [1] },
  ];

  test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
    const res = query(payload, path);

    expect(res).toEqual(expected);
  });
});

describe('query with comparators', () => {
  const PAYLOAD = {
    arrayOfNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    arraySimpleObjects: [
      { number: 2, string: 'ABC', exist: true, array: [1, 2, 3], str: '123' },
      { number: 5, string: 'BCD', array: [4, 5, 6], str: '' },
      { number: 7, string: 'CDE', array: [4, 5, 6], arr: [] },
    ],
  };

  const textCases = [
    {
      path: `$.arraySimpleObjects[?(@.number=="2")]..number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number*2==@.number+@.number)]..number`,
      expected: [2, 5, 7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number*2==@.number+@.number)]..["number"]`,
      expected: [2, 5, 7],
    },
    {
      path: `$.arraySimpleObjects[?(@)]..number`,
      expected: [2, 5, 7],
    },
    {
      path: `$.arraySimpleObjects[?($)]..number`,
      expected: [2, 5, 7],
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
      path: `$[?(@.arrayOfNumber sizeof 123)]`,
      expected: [],
    },
    {
      path: `$[?(@.arrayOfNumber empty)]`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.arr empty)]`,
      expected: [PAYLOAD.arraySimpleObjects[2]],
    },
    {
      path: `$.arraySimpleObjects[?(@.str empty)]`,
      expected: [PAYLOAD.arraySimpleObjects[1]],
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
      path: `$[?(123 size 9)]`,
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

describe('query with comparator operations', () => {
  const PAYLOAD = {
    number: 0,
    arraySimpleObjects: [
      { number: 2, string: 'ABC', exist: true, array: [1, 2, 3] },
      { number: 5, string: 'BCD', array: [4, 5, 6] },
      { number: 7, string: 'CDE', array: [4, 5, 6] },
    ],
  };

  const textCases = [
    {
      path: `$.arraySimpleObjects[?(@.number>$.number+3)]..number`,
      expected: [5, 7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>$.number+6)]..number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>$.number+7-10/10)]..number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>$.number+7-10/0)]..number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>$.number+2+2*2)]..number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>$.number+(2+2)*2)]..number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number + 2 >$.number + 8)]..number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>3+10-8+1)]..number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number>3 + 10 - 8 + 1)]..number`,
      expected: [7],
    },
    {
      path: `$.arraySimpleObjects[?(@.number - 1 > @.number)]..number`,
      expected: [],
    },
    {
      path: `$.arraySimpleObjects[?(@.number + 1 > @.number)]..number`,
      expected: [2, 5, 7],
    },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path);

    expect(res).toEqual(expected);
  });

  test('should throw exception on missing operator', () => {
    const t = (): void => {
      query(PAYLOAD, '$.arraySimpleObjects[?(@.number>3 4)]..number');
    };
    expect(t).toThrow(Error);
  });
});

describe('query with bad path', () => {
  const testCases = [
    { path: 'bad', err: JSONPathSyntaxError },
    { path: '', err: JSONPathSyntaxError },
    { path: '$...bad', err: JSONPathSyntaxError },
    { path: '$.$', err: JSONPathSyntaxError },
    { path: `$["bad Quote']`, err: JSONPathSyntaxError },
    { path: `$[bad Quote']`, err: JSONPathSyntaxError },
    { path: `$\{bad\}`, err: JSONPathSyntaxError },
    { path: `@`, err: JSONPathSyntaxError },
    { path: `$[?(@.test == {'1': undefined})]`, err: JSONPathSyntaxError },
    { path: `$[1:2:3:4]`, err: JSONPathSyntaxError },
    { path: `$[[1:2:3]]`, err: JSONPathSyntaxError },
  ];

  test.each(testCases)('error(%s)', ({ path, err }) => {
    const t = (): void => {
      query({ test: 1 }, path);
    };
    expect(t).toThrow(err);
  });
});

describe('query with logical expressions', () => {
  const PAYLOAD = {
    number: 0,
    arraySimpleObjects: [
      { number: 2, string: 'ABC', exist: true, array: [1, 2, 3] },
      { number: 5, string: 'BCD', array: [4, 5, 6] },
      { number: 7, string: 'CDE', array: [4, 5, 6] },
    ],
  };

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

describe('query with return array option', () => {
  const PAYLOAD = {
    string: 'stringValue',
    number: 0,
    arrayOfNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };

  const textCases = [
    {
      path: `$.number`,
      expected: [PAYLOAD.number],
    },
    {
      path: `$.*`,
      expected: Object.values(PAYLOAD),
    },
    {
      path: `$.string`,
      expected: [PAYLOAD.string],
    },
    {
      path: `$.notExist`,
      expected: [],
    },
  ];

  test.each(textCases)('query(%s)', ({ path, expected }) => {
    const res = query(PAYLOAD, path, { returnArray: true });

    expect(res).toEqual(expected);
  });
});

describe('query with regexp operator', () => {
  const REG_PAYLOAD = ['Hello World !', 'hello Earth !', 'Good Morning'];
  const textCases = [
    { payload: REG_PAYLOAD, path: `$[?(@ =~ /hello/i )]`, expected: [REG_PAYLOAD[0], REG_PAYLOAD[1]] },
    { payload: REG_PAYLOAD, path: `$[?(@ =~ /World/g )]`, expected: [REG_PAYLOAD[0]] },
    { payload: REG_PAYLOAD, path: `$[?(@ =~ /bad/g )]`, expected: [] },
    { payload: REG_PAYLOAD, path: `$[?(@ =~ /.*/g )]`, expected: REG_PAYLOAD },
    { payload: [1], path: `$[?(@ =~ /.*/g )]`, expected: [] },
  ];

  test.each(textCases)('query(%s)', ({ payload, path, expected }) => {
    const res = query(payload, path);

    expect(res).toEqual(expected);
  });
});

describe('query with hide exception option', () => {
  const testCases = [
    { path: '$.bad', expected: [], options: { returnArray: true, hideExceptions: true } },
    { path: 'bad', expected: [], options: { returnArray: true, hideExceptions: true } },
    { path: 'bad', expected: undefined, options: { hideExceptions: true } },
    { path: '', expected: undefined, options: { hideExceptions: true } },
    { path: '$...bad', expected: undefined, options: { hideExceptions: true } },
    { path: '$.$', expected: undefined, options: { hideExceptions: true } },
    { path: `$["bad Quote']`, expected: undefined, options: { hideExceptions: true } },
    { path: `$[bad Quote']`, expected: undefined, options: { hideExceptions: true } },
    { path: `$\{bad\}`, expected: undefined, options: { hideExceptions: true } },
    { path: `@`, expected: undefined, options: { hideExceptions: true } },
    { path: `$[?(@.test == {'1': { hideExceptions: true }})]`, expected: undefined, options: { hideExceptions: true } },
    { path: `$[1:2:3:4]`, expected: undefined, options: { hideExceptions: true } },
    { path: `$[[1:2:3]]`, expected: undefined, options: { hideExceptions: true } },
  ];

  test.each(testCases)('error(%s)', ({ path, expected, options }) => {
    const res = query({ test: 1 }, path, options);

    expect(res).toEqual(expected);
  });
});
