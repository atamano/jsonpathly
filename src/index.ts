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
        exist: 'hello',
        item: {
          hello: {
            hello: [{ hello: { toto: '123' } }],
          },
        },
      },
      {
        exist: 4,
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
    `$.nestedObject.array[?(@.exist == "hello")]`,
  ];

  for (const input of inputs) {
    const res = query(PAYLOAD, input);

    console.log(input, JSON.stringify(res));
  }
} catch (e) {
  console.log(e);
}
