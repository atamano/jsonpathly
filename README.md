<img src="https://user-images.githubusercontent.com/9162276/166061295-a41b7d28-a1e9-4d17-9103-132a1ca20de8.png" width="350">

[![CircleCI](https://circleci.com/gh/atamano/jsonpathly/tree/master.svg?style=shield&circle-token=442d6d9d566a5ed1472048e669f0155ed44d6648)](https://circleci.com/gh/atamano/jsonpathly/tree/master)
[![codecov](https://codecov.io/gh/atamano/jsonpathly/branch/master/graph/badge.svg?token=QSSZGZMULF)](https://codecov.io/gh/atamano/jsonpathly)

**A Typescript DSL for reading JSON documents.**

[Link to the Demo](https://atamano.github.io/jsonpathly-demo/)

## Install

Install from npm:

```bash
$ npm install jsonpathly
```

Install from yarn:

```bash
$ yarn add jsonpathly
```

## Getting Started

```javascript
import jp from 'jsonpathly';

const cities = [
  { name: 'London', population: 8615246 },
  { name: 'Berlin', population: 3517424 },
  { name: 'Madrid', population: 3165235 },
  { name: 'Rome', population: 2870528 },
];

const names = jp.query(cities, '$..name');

// [ "London", "Berlin", "Madrid", "Rome" ]
```

JsonPath expressions always refer to a JSON structure in the same way as XPath expression are used in combination
with an XML document. The "root member object" in JsonPath is always referred to as `$` regardless if it is an
object or array.

JsonPath expressions can use the dot–notation

`$.store.book[0].title`

or the bracket–notation

`$['store']['book'][0]['title']`

## Operators

| Operator                  | Description                                                     |
| :------------------------ | :-------------------------------------------------------------- |
| `$`                       | The root element to query. This starts all path expressions.    |
| `@`                       | The current node being processed by a filter predicate.         |
| `*`                       | Wildcard. Available anywhere a name or numeric are required.    |
| `..`                      | Deep scan. Available anywhere a name is required.               |
| `.<name>`                 | Dot-notated child                                               |
| `['<name>' (, '<name>')]` | Bracket-notated child or children                               |
| `[<number> (, <number>)]` | Array index or indexes                                          |
| `[start:end:step]`        | A python like array slice operator                              |
| `[?(<expression>)]`       | Filter expression. Expression must evaluate to a boolean value. |

## Filter Operators

Filters are logical expressions used to filter arrays. A typical filter would be `[?(@.age > 18)]` where `@` represents the current item being processed. More complex filters can be created with logical operators `&&` and `||`. String literals must be enclosed by single or double quotes (`[?(@.color == 'blue')]` or `[?(@.color == "blue")]`).

| Operator | Description                                                         |
| :------- | :------------------------------------------------------------------ |
| ==       | left is equal to right (note that 1 is not equal to '1')            |
| !=       | left is not equal to right                                          |
| <        | left is less than right                                             |
| <=       | left is less or equal to right                                      |
| >        | left is greater than right                                          |
| >=       | left is greater than or equal to right                              |
| in       | left exists in right [?(@.size in ['S', 'M'])]                      |
| nin      | left does not exists in right                                       |
| subsetof | left is a subset of right [?(@.sizes subsetof ['S', 'M', 'L'])]     |
| anyof    | left has an intersection with right [?(@.sizes anyof ['M', 'L'])]   |
| noneof   | left has no intersection with right [?(@.sizes noneof ['M', 'L'])]  |
| sizeof   | size of left (array or string) should match right (array or string) |
| size     | size of left (array or string) should match right (number)          |
| empty    | left (array or string) should be empty                              |

## Methods

#### jp.query(obj, pathExpression[, options])

Find elements in `obj` matching `pathExpression`. Returns an array of elements that satisfy the provided JSONPath expression, or an empty array if none were matched.

```javascript
import jp from 'jsonpathly';

const authors = jp.query(data, '$..author');
// [ 'Nigel Rees', 'Evelyn Waugh', 'Herman Melville', 'J. R. R. Tolkien' ]
```

| Option         | Description                                                              |
| :------------- | :----------------------------------------------------------------------- |
| hideExceptions | This option makes sure no exceptions are propagated from path evaluation |
| returnArray    | This option configures JsonPath to return an array                       |

#### jp.paths(obj, pathExpression[, options])

Find paths to elements in `obj` matching `pathExpression`. Returns an array of element paths that satisfy the provided JSONPath expression.

```javascript
const paths = jp.paths(data, '$..author');
// [
//   '$["store"]["book"][0]["author"]',
//   '$["store"]["book"][1]["author"]',
//   '$["store"]["book"][2]["author"]',
//   '$["store"]["book"][3]["author"]'
// ]
```

| Option         | Description                                                              |
| :------------- | :----------------------------------------------------------------------- |
| hideExceptions | This option makes sure no exceptions are propagated from path evaluation |

#### jp.parse(pathExpression[, options])

Returns a typed tree representing a jsonpath expression

```javascript
const tree = jp.parse('$..author');
// { type: 'root', next: { type: 'subscript', value: { type: 'dotdot', value: { type: "identifier", value: "author" } } } }
```

| Option         | Description                                                              |
| :------------- | :----------------------------------------------------------------------- |
| hideExceptions | This option makes sure no exceptions are propagated from path evaluation |

#### jp.stringify(tree)

Returns a jsonpath string from a tree representing jsonpath expression (jp.parse response)

```javascript
const jsonpath = jp.stringify({
  type: 'root',
  next: { type: 'subscript', value: { type: 'dotdot', value: { type: 'identifier', value: 'author' } } },
});
// "$..author"
```
