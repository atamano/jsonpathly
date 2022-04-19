import { query } from './handler';

const PAYLOAD = {
  test: {
    test: [{ test: '1' }, { test: '2' }],
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
    `$..test`,
  ];

  for (const input of inputs) {
    const res = query(PAYLOAD, input);

    console.log(input, JSON.stringify(res));
  }
} catch (e) {
  console.log(e);
}
