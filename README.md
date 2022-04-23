# JsonPathly

[![CircleCI](https://circleci.com/gh/atamano/jsonpathly/tree/master.svg?style=svg&circle-token=442d6d9d566a5ed1472048e669f0155ed44d6648)](https://circleci.com/gh/atamano/jsonpathly/tree/master)

**A Javascript DSL for reading JSON documents.**

## Getting Started

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
