import { query } from './handler';

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
    { number: 2, string: 'A', exist: true, array: [1, 2, 3] },
    { number: 5, string: 'B', array: [4, 5, 6] },
    { number: 7, string: 'C', array: [4, 5, 6] },
  ],
};

try {
  const inputs = [
    // '$.string',
    // '$.number',
    // '$.arrayOfNumber',
    // '$.arrayOfString',
    // '$.nestedObject.object',
    // '$.nestedObject.object.test',
    // '$.notExist',
    // '$.*',
    // `$['nestedObject'].object["test"]`,
    // `$.arrayOfNumber[2::3]`,
    // `$..phoneNumbers[?(!(@.price < 30 && !@.type == "iPhone" && !@.number))]`,
    `$..[number, string]`,
  ];

  for (const input of inputs) {
    const res = query(PAYLOAD, input);

    console.log(input, JSON.stringify(res));
  }
} catch (e) {
  console.log(e);
}
