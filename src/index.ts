import { query } from './handler';

const PAYLOAD = {
  string: 'stringValue',
  number: 0,
  arrayOfNumber: [1, 2, 3, 4, 5],
  arrayOfString: ['11', '22', '33', '44', '55'],
  nestedObject: {
    object: {
      test: '1',
    },
  },
};

try {
  const inputs = ['$.string', '$.number', '$.arrayOfNumber', '$.arrayOfString', '$.nestedObject.object.test'];

  for (const input of inputs) {
    const res = query(PAYLOAD, input);

    console.log(input, res);
  }
} catch (e) {
  console.log(e);
}
