import { parse, stringify } from '../../src/parser';

describe('parse', () => {
  const textCases = [
    [`$.store.book[?(@.size nin ['M','L'])]`, ''],
    [`$.store.book[?(@.size nin ["M","L"])]`, ''],
    [`$..book[?(@.author == {"test":1})].title`, ''],
    [`$["book"]`, ''],
    [`$["book with space"]`, ''],
    [`$['book with  "double" quotes']`, `$["book with  \"double\" quotes"]`],
    [`$["book with  'single' quotes"]`, '$["book with  \'single\' quotes"]'],
    [`$.book["test"].title`, ''],
    [`$.phoneNumbers[?(@.price < 30)]`, ''],
    [`$.phoneNumbers[?((@.price < 30 && @.type == "iPhone") || @.num == 1)]`, ''],
    [`$`, ''],
    [`$[@]`, ''],
    [`$[$]`, ''],
    [`$[*]`, ''],
    [`$[0]`, ''],
    [`$[?(@.author)]`, ''],
    [`$..["book"]`, ''],
    [`$..[@.test]`, ''],
    [`$..book[0][category, author]`, ''],
    [`$..phoneNumbers[?(!(@.price < 30 && !@.type == "iPhone" && !@.number))]`, ''],
    [`$..phoneNumbers[?(!@.price < 30 && !@.type == "iPhone" && !@.number)]`, ''],
    [`$..phoneNumbers[?(@.price < 30 && !(@.type == "iPhone" && @.number))]`, ''],
    [`$.book[test, toto]`, ''],
    [`$.book["test", "toto"]`, ''],
    [`$.store.book[?(@.price < 10)]`, ''],
    [`$.store.book[?(@.price == 10.2)]`, ''],
    [`$.store.book[?(@.price == true)]`, ''],
    [`$.store.book[?(@.price == false)]`, ''],
    [`$.store.book[?(@.price == null)]`, ''],
    [`$.store.book[?(@.price <= $.expensive)]`, ''],
    [`$.store.book[?(@.price == $.expensive)]`, ''],
    [`$.store.book[?(@.price != $.expensive)]`, ''],
    [`$.store.book[?(@.price >= $.expensive)]`, ''],
    [`$.store.book[?(@.price > $.expensive)]`, ''],
    [`$.store.book[?(@.price in [1,2,3])]`, ''],
    [`$..book[?(@.isbn)]`, ''],
    [`$..book[?(!@.isbn)]`, ''],
    [`$..book[-1:].title`, ''],
    [`$..book[0, 1].title`, ''],
    [`$..book[0:1].title`, ''],
    [`$..book[:2].title`, ''],
    [`$..book[5:2].title`, ''],
    [`$..book[:7:2].title`, ''],
    [`$..book[::2].title`, ''],
    [`$..book[1::2].title`, ''],
    [`$..book[:1:].title`, `$..book[:1].title`],
    [`$..book[1::].title`, `$..book[1:].title`],
    [`$..book[5::2].title`, ''],
    [`$..book[:].title`, ''],
    [`$..book[0:2:1].title`, ''],
    [`$..book[?(@.author == 'J.R.R. Tolkien')].title`, ''],
    [`$..*`, ''],
    [`$..phoneNumbers[(@.price.length-1)]`, ''],
  ];

  test.each(textCases)('parse(%s)', (input, expected) => {
    const res = parse(input);

    if (expected) {
      expect(stringify(res)).toEqual(expected);
    } else {
      expect(stringify(res)).toEqual(input.replace(/'/g, '"'));
    }
  });
});
