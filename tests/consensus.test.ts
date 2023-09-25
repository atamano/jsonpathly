import { query } from '../src/handler/query';
import { expect } from 'chai';

const testSuits = [
  {
    title: 'array_slice_on_exact_match',
    query: '$[0:5]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second', 'third', 'forth', 'fifth'],
    consensus: true,
  },
  {
    title: 'array_slice_on_object',
    query: '$[1:3]',
    payload: {
      ':': 42,
      more: 'string',
      a: 1,
      b: 2,
      c: 3,
      '1:3': 'nice',
    },
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_on_non_overlapping_array',
    query: '$[7:10]',
    payload: ['first', 'second', 'third'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_large_number_for_start_end_negative_step',
    query: '$[113667776004:2:-1]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: [],
    consensus: false,
  },
  {
    title: 'array_slice_with_large_number_for_end_and_negative_step',
    query: '$[2:-113667776004:-1]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: [],
    consensus: false,
  },
  {
    title: 'array_slice_with_large_number_for_end',
    query: '$[2:113667776004]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['third', 'forth', 'fifth'],
    consensus: true,
  },
  {
    title: 'array_slice_with_large_number_for_start',
    query: '$[-113667776004:2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second'],
    consensus: true,
  },
  {
    title: 'array_slice',
    query: '$[1:3]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['second', 'third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_negative_start_and_end_and_range_of_-1',
    query: '$[-4:-5]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_negative_start_and_end_and_range_of_0',
    query: '$[-4:-4]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_negative_start_and_end_and_range_of_1',
    query: '$[-4:-3]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [4],
    consensus: true,
  },
  {
    title: 'array_slice_with_negative_start_and_positive_end_and_range_of_1',
    query: '$[-4:3]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [4],
    consensus: true,
  },
  {
    title: 'array_slice_with_negative_step',
    query: '$[3:0:-2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: [],
    consensus: false,
  },
  {
    title: 'array_slice_with_negative_start_and_positive_end_and_range_of_-1',
    query: '$[-4:1]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_negative_step_and_start_greater_than_end',
    query: '$[0:3:-2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second', 'third'],
    consensus: false,
  },
  {
    title: 'array_slice_with_negative_start_and_positive_end_and_range_of_0',
    query: '$[-4:2]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_negative_step_on_partially_overlapping_array',
    query: '$[7:3:-1]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: [],
    consensus: false,
  },
  {
    title: 'array_slice_with_negative_step_only',
    query: '$[::-2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second', 'third', 'forth', 'fifth'],
    consensus: false,
  },
  {
    title: 'array_slice_with_open_end',
    query: '$[1:]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['second', 'third', 'forth', 'fifth'],
    consensus: true,
  },
  {
    title: 'array_slice_with_open_end_and_negative_step',
    query: '$[3::-1]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['forth', 'fifth'],
    consensus: false,
  },
  {
    title: 'array_slice_with_open_start',
    query: '$[:2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second'],
    consensus: true,
  },
  {
    title: 'array_slice_with_open_start_and_end',
    query: '$[:]',
    payload: ['first', 'second'],
    results: ['first', 'second'],
    consensus: true,
  },
  {
    title: 'array_slice_on_partially_overlapping_array',
    query: '$[1:10]',
    payload: ['first', 'second', 'third'],
    results: ['second', 'third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_open_start_and_negative_step',
    query: '$[:2:-1]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second'],
    consensus: false,
  },
  {
    title: 'array_slice_with_open_start_and_end_on_object',
    query: '$[:]',
    payload: {
      ':': 42,
      more: 'string',
    },
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_positive_start_and_negative_end_and_range_of_-1',
    query: '$[3:-4]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_positive_start_and_negative_end_and_range_of_0',
    query: '$[3:-3]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_range_of_0',
    query: '$[0:0]',
    payload: ['first', 'second'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_open_start_and_end_and_step_empty',
    query: '$[::]',
    payload: ['first', 'second'],
    results: ['first', 'second'],
    consensus: true,
  },
  {
    title: 'array_slice_with_range_of_-1',
    query: '$[2:1]',
    payload: ['first', 'second', 'third', 'forth'],
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_positive_start_and_negative_end_and_range_of_1',
    query: '$[3:-2]',
    payload: [2, 'a', 4, 5, 100, 'nice'],
    results: [5],
    consensus: true,
  },
  {
    title: 'array_slice_with_start_-2_and_open_end',
    query: '$[-2:]',
    payload: ['first', 'second', 'third'],
    results: ['second', 'third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_start_large_negative_number_and_open_end_on_short_array',
    query: '$[-4:]',
    payload: ['first', 'second', 'third'],
    results: ['first', 'second', 'third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_start_-1_and_open_end',
    query: '$[-1:]',
    payload: ['first', 'second', 'third'],
    results: ['third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_step_0',
    query: '$[0:3:0]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second', 'third'],
    consensus: false,
  },
  {
    title: 'array_slice_with_range_of_1',
    query: '$[0:1]',
    payload: ['first', 'second'],
    results: ['first'],
    consensus: true,
  },
  {
    title: 'array_slice_with_step_1',
    query: '$[0:3:1]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'second', 'third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_step_and_leading_zeros',
    query: '$[010:024:010]',
    payload: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    results: [10, 20],
    consensus: true,
  },
  {
    title: 'array_slice_with_step',
    query: '$[0:3:2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_step_but_end_not_aligned',
    query: '$[0:4:2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'third'],
    consensus: true,
  },
  {
    title: 'array_slice_with_step_empty',
    query: '$[1:3:]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['second', 'third'],
    consensus: true,
  },
  {
    title: 'bracket_notation',
    query: "$['key']",
    payload: {
      key: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_after_recursive_descent',
    query: '$..[0]',
    payload: [
      'first',
      {
        key: [
          'first nested',
          {
            more: [
              {
                nested: ['deepest', 'second'],
              },
              ['more', 'values'],
            ],
          },
        ],
      },
    ],
    results: [
      'first',
      'first nested',
      {
        nested: ['deepest', 'second'],
      },
      'deepest',
      'more',
    ],
    consensus: true,
  },
  {
    title: 'bracket_notation_on_object_without_key',
    query: "$['missing']",
    payload: {
      key: 'value',
    },
    results: [],
    consensus: true,
  },
  {
    title: 'array_slice_with_step_only',
    query: '$[::2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first', 'third', 'fifth'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_NFC_path_on_NFD_key',
    query: "$['ü']",
    payload: {
      ü: 42,
    },
    results: [],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_dot',
    query: "$['two.some']",
    payload: {
      one: {
        key: 'value',
      },
      two: {
        some: 'more',
        key: 'other value',
      },
      'two.some': '42',
    },
    results: ['42'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_empty_path',
    query: '$[]',
    payload: {
      '': 42,
      "''": 123,
      '""': 222,
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'bracket_notation_with_empty_string',
    query: "$['']",
    payload: {
      '': 42,
      "''": 123,
      '""': 222,
    },
    results: [42],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_double_quotes',
    query: '$["key"]',
    payload: {
      key: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_empty_string_doubled_quoted',
    query: '$[""]',
    payload: {
      '': 42,
      "''": 123,
      '""': 222,
    },
    results: [42],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_number',
    query: '$[2]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['third'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_negative_number_on_short_array',
    query: '$[-2]',
    payload: ['one element'],
    results: [],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_number_0',
    query: '$[0]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['first'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_number_-1',
    query: '$[-1]',
    payload: ['first', 'second', 'third'],
    results: ['third'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_number_after_dot_notation_with_wildcard_on_nested_arrays_with_different_length',
    query: '$.*[1]',
    payload: [[1], [2, 3]],
    results: [3],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_number_on_object',
    query: '$[0]',
    payload: {
      '0': 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_number_on_short_array',
    query: '$[1]',
    payload: ['one element'],
    results: [],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_array_slice_literal',
    query: "$[':']",
    payload: {
      ':': 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_closing_bracket_literal',
    query: "$[']']",
    payload: {
      ']': 42,
    },
    results: [42],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_current_object_literal',
    query: "$['@']",
    payload: {
      '@': 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_dot_wildcard',
    query: "$['.*']",
    payload: {
      key: 42,
      '.*': 1,
      '': 10,
    },
    results: [1],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_dot_literal',
    query: "$['.']",
    payload: {
      '.': 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_escaped_backslash',
    query: "$['\\\\']",
    payload: {
      '\\': 'value',
    },
    results: [],
    consensus: false,
  },
  {
    title: 'bracket_notation_with_quoted_escaped_single_quote',
    query: "$['\\'']",
    payload: {
      "'": 'value',
    },
    results: [],
    consensus: false,
  },
  {
    title: 'bracket_notation_with_number_on_string',
    query: '$[0]',
    payload: 'Hello World',
    results: [],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_double_quote_literal',
    query: "$['\"']",
    payload: {
      '"': 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_special_characters_combined',
    query: "$[':@.\"$,*\\'\\\\']",
    payload: {
      ':@."$,*\'\\': 42,
    },
    results: [],
    consensus: false,
  },
  {
    title: 'bracket_notation_with_quoted_union_literal',
    query: "$[',']",
    payload: {
      ',': 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_number_on_object',
    query: "$['0']",
    payload: {
      '0': 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_root_literal',
    query: "$['$']",
    payload: {
      $: 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_wildcard_literal',
    query: "$['*']",
    payload: {
      '*': 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_string_and_unescaped_single_quote',
    query: "$['single'quote']",
    payload: {
      "single'quote": 'value',
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'bracket_notation_with_spaces',
    query: "$[ 'a' ]",
    payload: {
      ' a': 1,
      a: 2,
      ' a ': 3,
      'a ': 4,
      " 'a' ": 5,
      " 'a": 6,
      "a' ": 7,
      ' "a" ': 8,
      '"a"': 9,
    },
    results: [2],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_string_including_dot_wildcard',
    query: "$['ni.*']",
    payload: {
      nice: 42,
      'ni.*': 1,
      mice: 100,
    },
    results: [1],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_two_literals_separated_by_dot',
    query: "$['two'.'some']",
    payload: {
      one: {
        key: 'value',
      },
      two: {
        some: 'more',
        key: 'other value',
      },
      'two.some': '42',
      "two'.'some": '43',
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'bracket_notation_with_quoted_wildcard_literal_on_object_without_key',
    query: "$['*']",
    payload: {
      another: 'entry',
    },
    results: [],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_two_literals_separated_by_dot_without_quotes',
    query: '$[two.some]',
    payload: {
      one: {
        key: 'value',
      },
      two: {
        some: 'more',
        key: 'other value',
      },
      'two.some': '42',
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'bracket_notation_with_wildcard_after_array_slice',
    query: '$[0:2][*]',
    payload: [
      [1, 2],
      ['a', 'b'],
      [0, 0],
    ],
    results: [1, 2, 'a', 'b'],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_wildcard_after_dot_notation_after_bracket_notation_with_wildcard',
    query: '$[*].bar[*]',
    payload: [
      {
        bar: [42],
      },
    ],
    results: [42],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_wildcard_after_recursive_descent',
    query: '$..[*]',
    payload: {
      key: 'value',
      'another key': {
        complex: 'string',
        primitives: [0, 1],
      },
    },
    results: [
      'value',
      {
        complex: 'string',
        primitives: [0, 1],
      },
      'string',
      [0, 1],
      0,
      1,
    ],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_wildcard_on_array',
    query: '$[*]',
    payload: [
      'string',
      42,
      {
        key: 'value',
      },
      [0, 1],
    ],
    results: [
      'string',
      42,
      {
        key: 'value',
      },
      [0, 1],
    ],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_wildcard_on_empty_array',
    query: '$[*]',
    payload: [],
    results: [],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_wildcard_on_object',
    query: '$[*]',
    payload: {
      some: 'string',
      int: 42,
      object: {
        key: 'value',
      },
      array: [0, 1],
    },
    results: [
      'string',
      42,
      {
        key: 'value',
      },
      [0, 1],
    ],
    consensus: true,
  },
  {
    title: 'bracket_notation_with_wildcard_on_empty_object',
    query: '$[*]',
    payload: {},
    results: [],
    consensus: true,
  },
  {
    title: 'dot_bracket_notation_with_double_quotes',
    query: '$.["key"]',
    payload: {
      key: 'value',
      other: {
        key: [
          {
            key: 42,
          },
        ],
      },
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'bracket_notation_without_quotes',
    query: '$[key]',
    payload: {
      key: 'value',
    },
    results: ['value'],
    consensus: true,
    isCustom: true,
  },
  {
    title: 'bracket_notation_with_number_-1_on_empty_array',
    query: '$[-1]',
    payload: [],
    results: [],
    consensus: true,
  },
  {
    title: 'dot_bracket_notation_without_quotes',
    query: '$.[key]',
    payload: {
      key: 'value',
      other: {
        key: [
          {
            key: 42,
          },
        ],
      },
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'dot_notation',
    query: '$.key',
    payload: {
      key: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'dot_notation_after_bracket_notation_with_wildcard_on_one_matching',
    query: '$[*].a',
    payload: [
      {
        a: 1,
      },
    ],
    results: [1],
    consensus: true,
  },
  {
    title: 'dot_notation_after_bracket_notation_after_recursive_descent',
    query: '$..[1].key',
    payload: {
      k: [
        {
          key: 'some value',
        },
        {
          key: 42,
        },
      ],
      kk: [
        [
          {
            key: 100,
          },
          {
            key: 200,
          },
          {
            key: 300,
          },
        ],
        [
          {
            key: 400,
          },
          {
            key: 500,
          },
          {
            key: 600,
          },
        ],
      ],
      key: [0, 1],
    },
    results: [42, 200, 500],
    consensus: true,
  },
  {
    title: 'current_with_dot_notation',
    query: '@.a',
    payload: {
      a: 1,
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_after_bracket_notation_with_wildcard',
    query: '$[*].a',
    payload: [
      {
        a: 1,
      },
      {
        a: 1,
      },
    ],
    results: [1, 1],
    consensus: true,
  },
  {
    title: 'dot_notation_after_array_slice',
    query: '$[0:2].key',
    payload: [
      {
        key: 'ey',
      },
      {
        key: 'bee',
      },
      {
        key: 'see',
      },
    ],
    results: ['ey', 'bee'],
    consensus: true,
  },
  {
    title: 'dot_notation_after_filter_expression',
    query: '$[?(@.id==42)].name',
    payload: [
      {
        id: 42,
        name: 'forty-two',
      },
      {
        id: 1,
        name: 'one',
      },
    ],
    results: ['forty-two'],
    consensus: true,
  },
  {
    title: 'dot_notation_after_bracket_notation_with_wildcard_on_some_matching',
    query: '$[*].a',
    payload: [
      {
        a: 1,
      },
      {
        b: 1,
      },
    ],
    results: [1],
    consensus: true,
  },
  {
    title: 'dot_notation_after_recursive_descent',
    query: '$..key',
    payload: {
      object: {
        key: 'value',
        array: [
          {
            key: 'something',
          },
          {
            key: {
              key: 'russian dolls',
            },
          },
        ],
      },
      key: 'top',
    },
    results: [
      'top',
      'value',
      'something',
      {
        key: 'russian dolls',
      },
      'russian dolls',
    ],
    consensus: true,
  },
  {
    title: 'dot_notation_after_recursive_descent_with_extra_dot',
    query: '$...key',
    payload: {
      object: {
        key: 'value',
        array: [
          {
            key: 'something',
          },
          {
            key: {
              key: 'russian dolls',
            },
          },
        ],
      },
      key: 'top',
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_after_union',
    query: '$[0,2].key',
    payload: [
      {
        key: 'ey',
      },
      {
        key: 'bee',
      },
      {
        key: 'see',
      },
    ],
    results: ['ey', 'see'],
    consensus: true,
  },
  {
    title: 'dot_notation_after_recursive_descent_after_dot_notation',
    query: '$.store..price',
    payload: {
      store: {
        book: [
          {
            category: 'reference',
            author: 'Nigel Rees',
            title: 'Sayings of the Century',
            price: 8.95,
          },
          {
            category: 'fiction',
            author: 'Evelyn Waugh',
            title: 'Sword of Honour',
            price: 12.99,
          },
          {
            category: 'fiction',
            author: 'Herman Melville',
            title: 'Moby Dick',
            isbn: '0-553-21311-3',
            price: 8.99,
          },
          {
            category: 'fiction',
            author: 'J. R. R. Tolkien',
            title: 'The Lord of the Rings',
            isbn: '0-395-19395-8',
            price: 22.99,
          },
        ],
        bicycle: {
          color: 'red',
          price: 19.95,
        },
      },
    },
    results: [8.95, 12.99, 8.99, 22.99, 19.95],
    consensus: true,
  },
  {
    title: 'dot_notation_on_array',
    query: '$.key',
    payload: [0, 1],
    results: [],
    consensus: true,
  },
  {
    title: 'dot_notation_after_union_with_keys',
    query: "$['one','three'].key",
    payload: {
      one: {
        key: 'value',
      },
      two: {
        k: 'v',
      },
      three: {
        some: 'more',
        key: 'other value',
      },
    },
    results: ['value', 'other value'],
    consensus: true,
  },
  {
    title: 'dot_notation_on_array_value',
    query: '$.key',
    payload: {
      key: ['first', 'second'],
    },
    results: [['first', 'second']],
    consensus: true,
  },
  {
    title: 'dot_notation_on_object_without_key',
    query: '$.missing',
    payload: {
      key: 'value',
    },
    results: [],
    consensus: true,
  },
  {
    title: 'dot_notation_on_empty_object_value',
    query: '$.key',
    payload: {
      key: {},
    },
    results: [{}],
    consensus: true,
  },
  {
    title: 'dot_notation_on_null_value',
    query: '$.key',
    payload: {
      key: null,
    },
    results: [null],
    consensus: true,
  },
  {
    title: 'dot_notation_with_double_quotes',
    query: '$."key"',
    payload: {
      key: 'value',
      '"key"': 42,
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_on_array_with_containing_object_matching_key',
    query: '$.id',
    payload: [
      {
        id: 2,
      },
    ],
    results: [],
    consensus: true,
  },
  {
    title: 'dot_notation_with_dash',
    query: '$.key-dash',
    payload: {
      key: 42,
      'key-': 43,
      '-': 44,
      dash: 45,
      '-dash': 46,
      '': 47,
      'key-dash': 'value',
      something: 'else',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'dot_notation_with_key_named_length_on_array',
    query: '$.length',
    payload: [4, 5, 6],
    results: [],
    consensus: true,
  },
  {
    title: 'dot_notation_with_double_quotes_after_recursive_descent',
    query: '$.."key"',
    payload: {
      object: {
        key: 'value',
        '"key"': 100,
        array: [
          {
            key: 'something',
            '"key"': 0,
          },
          {
            key: {
              key: 'russian dolls',
            },
            '"key"': {
              '"key"': 99,
            },
          },
        ],
      },
      key: 'top',
      '"key"': 42,
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_with_empty_path',
    query: '$.',
    payload: {
      key: 42,
      '': 9001,
      "''": 'nice',
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'dot_notation_with_key_named_length',
    query: '$.length',
    payload: {
      length: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'dot_notation_with_key_named_in',
    query: '$.in',
    payload: {
      in: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'dot_notation_with_key_named_null',
    query: '$.null',
    payload: {
      null: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'dot_notation_with_key_root_literal',
    query: '$.$',
    payload: {
      $: 'value',
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_with_non_ASCII_key',
    query: '$.屬性',
    payload: {
      屬性: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'dot_notation_with_key_named_true',
    query: '$.true',
    payload: {
      true: 'value',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'dot_notation_with_single_quotes',
    query: "$.'key'",
    payload: {
      key: 'value',
      "'key'": 42,
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_with_number',
    query: '$.2',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['third'],
    consensus: false,
  },
  {
    title: 'dot_notation_with_number_on_object',
    query: '$.2',
    payload: {
      '2': 'second',
      a: 'first',
      b: 'third',
    },
    results: ['second'],
    consensus: true,
  },
  {
    title: 'dot_notation_with_number_-1',
    query: '$.-1',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: ['fifth'],
    consensus: false,
  },
  {
    title: 'dot_notation_with_single_quotes_after_recursive_descent',
    query: "$..'key'",
    payload: {
      object: {
        object: {
          key: 'value',
          "'key'": 100,
          array: [
            {
              key: 'something',
              "'key'": 0,
            },
            {
              key: {
                key: 'russian dolls',
              },
              "'key'": {
                "'key'": 99,
              },
            },
          ],
        },
        key: 'top',
        "'key'": 42,
      },
      key: 'top',
      "'key'": 42,
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_with_wildcard_after_dot_notation_after_dot_notation_with_wildcard',
    query: '$.*.bar.*',
    payload: [
      {
        bar: [42],
      },
    ],
    results: [42],
    consensus: true,
  },
  {
    title: 'dot_notation_with_single_quotes_and_dot',
    query: "$.'some.key'",
    payload: {
      'some.key': 42,
      some: {
        key: 'value',
      },
      "'some.key'": 43,
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'dot_notation_with_wildcard_after_recursive_descent',
    query: '$..*',
    payload: {
      key: 'value',
      'another key': {
        complex: 'string',
        primitives: [0, 1],
      },
    },
    results: [
      'value',
      {
        complex: 'string',
        primitives: [0, 1],
      },
      'string',
      [0, 1],
      0,
      1,
    ],
    consensus: true,
  },
  {
    title: 'dot_notation_with_wildcard_after_recursive_descent_on_null_value_array',
    query: '$..*',
    payload: [40, null, 42],
    results: [40, null, 42],
    consensus: true,
  },
  {
    title: 'dot_notation_with_space_padded_key',
    query: '$. a ',
    payload: {
      ' a': 1,
      a: 2,
      ' a ': 3,
      '': 4,
    },
    results: [2],
    consensus: false,
  },
  {
    title: 'dot_notation_with_wildcard_after_dot_notation_with_wildcard_on_nested_arrays',
    query: '$.*.*',
    payload: [
      [1, 2, 3],
      [4, 5, 6],
    ],
    results: [1, 2, 3, 4, 5, 6],
    consensus: true,
  },
  {
    title: 'dot_notation_with_wildcard_on_array',
    query: '$.*',
    payload: [
      'string',
      42,
      {
        key: 'value',
      },
      [0, 1],
    ],
    results: [
      'string',
      42,
      {
        key: 'value',
      },
      [0, 1],
    ],
    consensus: true,
  },
  {
    title: 'dot_notation_with_wildcard_on_empty_object',
    query: '$.*',
    payload: {},
    results: [],
    consensus: true,
  },
  {
    title: 'dot_notation_with_wildcard_after_recursive_descent_on_scalar',
    query: '$..*',
    payload: 42,
    results: [],
    consensus: true,
  },
  {
    title: 'dot_notation_with_wildcard_on_object',
    query: '$.*',
    payload: {
      some: 'string',
      int: 42,
      object: {
        key: 'value',
      },
      array: [0, 1],
    },
    results: [
      'string',
      42,
      {
        key: 'value',
      },
      [0, 1],
    ],
    consensus: true,
  },
  {
    title: 'dot_notation_without_dot',
    query: '$a',
    payload: {
      a: 1,
      $a: 2,
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'dot_notation_with_wildcard_on_empty_array',
    query: '$.*',
    payload: [],
    results: [],
    consensus: true,
  },
  {
    title: 'dot_notation_without_root',
    query: '.key',
    payload: {
      key: 'value',
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'empty',
    query: '',
    payload: {
      a: 42,
      '': 21,
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_after_dot_notation_with_wildcard_after_recursive_descent',
    query: '$..*[?(@.id>2)]',
    payload: [
      {
        complext: {
          one: [
            {
              name: 'first',
              id: 1,
            },
            {
              name: 'next',
              id: 2,
            },
            {
              name: 'another',
              id: 3,
            },
            {
              name: 'more',
              id: 4,
            },
          ],
          more: {
            name: 'next to last',
            id: 5,
          },
        },
      },
      {
        name: 'last',
        id: 6,
      },
    ],
    results: [
      {
        id: 6,
        name: 'last',
      },
      {
        id: 3,
        name: 'another',
      },
      {
        id: 4,
        name: 'more',
      },
      {
        id: 5,
        name: 'next to last',
      },
      {
        id: 3,
        name: 'another',
      },
      {
        id: 4,
        name: 'more',
      },
    ],
    consensus: false,
  },
  {
    title: 'dot_notation_without_root_and_dot',
    query: 'key',
    payload: {
      key: 'value',
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  // {
  //   title: 'filter_expression_after_recursive_descent',
  //   query: '$..[?(@.id==2)]',
  //   payload: {
  //     id: 2,
  //     more: [
  //       {
  //         id: 2,
  //       },
  //       {
  //         more: {
  //           id: 2,
  //         },
  //       },
  //       {
  //         id: {
  //           id: 2,
  //         },
  //       },
  //       [
  //         {
  //           id: 2,
  //         },
  //       ],
  //     ],
  //   },
  //   results: [
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 2,
  //     },
  //   ],
  //   consensus: false,
  // },
  {
    title: 'filter_expression_with_addition',
    query: '$[?(@.key+50==100)]',
    payload: [
      {
        key: 60,
      },
      {
        key: 50,
      },
      {
        key: 10,
      },
      {
        key: -50,
      },
      {
        'key+50': 100,
      },
    ],
    results: [
      {
        key: 50,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_boolean_and_operator',
    query: '$[?(@.key>42 && @.key<44)]',
    payload: [
      {
        key: 42,
      },
      {
        key: 43,
      },
      {
        key: 44,
      },
    ],
    results: [
      {
        key: 43,
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_boolean_and_operator_and_value_false',
    query: '$[?(@.key>0 && false)]',
    payload: [
      {
        key: 1,
      },
      {
        key: 3,
      },
      {
        key: 'nice',
      },
      {
        key: true,
      },
      {
        key: null,
      },
      {
        key: false,
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: -1,
      },
      {
        key: 0,
      },
      {
        key: '',
      },
    ],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_on_object',
    query: '$[?(@.key)]',
    payload: {
      key: 42,
      another: {
        key: 1,
      },
    },
    results: [
      {
        another: {
          key: 1,
        },
        key: 42,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_boolean_or_operator',
    query: '$[?(@.key>43 || @.key<43)]',
    payload: [
      {
        key: 42,
      },
      {
        key: 43,
      },
      {
        key: 44,
      },
    ],
    results: [
      {
        key: 42,
      },
      {
        key: 44,
      },
    ],
    consensus: true,
  },
  {
    title: 'dot_bracket_notation',
    query: "$.['key']",
    payload: {
      key: 'value',
      other: {
        key: [
          {
            key: 42,
          },
        ],
      },
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_boolean_and_operator_and_value_true',
    query: '$[?(@.key>0 && true)]',
    payload: [
      {
        key: 1,
      },
      {
        key: 3,
      },
      {
        key: 'nice',
      },
      {
        key: true,
      },
      {
        key: null,
      },
      {
        key: false,
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: -1,
      },
      {
        key: 0,
      },
      {
        key: '',
      },
    ],
    results: [
      {
        key: 1,
      },
      {
        key: 3,
      },
    ],
    consensus: false,
  },
  {
    title: 'bracket_notation_with_wildcard_on_null_value_array',
    query: '$[*]',
    payload: [40, null, 42],
    results: [40, null, 42],
    consensus: true,
  },
  {
    title: 'filter_expression_with_bracket_notation_and_current_object_literal',
    query: "$[?(@['@key']==42)]",
    payload: [
      {
        '@key': 0,
      },
      {
        '@key': 42,
      },
      {
        key: 42,
      },
      {
        '@key': 43,
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        '@key': 42,
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_bracket_notation',
    query: "$[?(@['key']==42)]",
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 42,
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_bracket_notation_with_-1',
    query: '$[?(@[-1]==2)]',
    payload: [[2, 3], ['a'], [0, 2], [2]],
    results: [[0, 2], [2]],
    consensus: false,
  },
  {
    title: 'filter_expression_with_boolean_or_operator_and_value_true',
    query: '$[?(@.key>0 || true)]',
    payload: [
      {
        key: 1,
      },
      {
        key: 3,
      },
      {
        key: 'nice',
      },
      {
        key: true,
      },
      {
        key: null,
      },
      {
        key: false,
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: -1,
      },
      {
        key: 0,
      },
      {
        key: '',
      },
    ],
    results: [
      {
        key: 1,
      },
      {
        key: 3,
      },
      {
        key: 'nice',
      },
      {
        key: true,
      },
      {
        key: null,
      },
      {
        key: false,
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: -1,
      },
      {
        key: 0,
      },
      {
        key: '',
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_bracket_notation_with_number',
    query: "$[?(@[1]=='b')]",
    payload: [
      ['a', 'b'],
      ['x', 'y'],
    ],
    results: [['a', 'b']],
    consensus: true,
  },
  {
    title: 'filter_expression_with_boolean_or_operator_and_value_false',
    query: '$[?(@.key>0 || false)]',
    payload: [
      {
        key: 1,
      },
      {
        key: 3,
      },
      {
        key: 'nice',
      },
      {
        key: true,
      },
      {
        key: null,
      },
      {
        key: false,
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: -1,
      },
      {
        key: 0,
      },
      {
        key: '',
      },
    ],
    results: [
      {
        key: 1,
      },
      {
        key: 3,
      },
    ],
    consensus: false,
  },
  // {
  //   title: 'filter_expression_with_bracket_notation_with_number_on_object',
  //   query: "$[?(@[1]=='b')]",
  //   payload: {
  //     '1': ['a', 'b'],
  //     '2': ['x', 'y'],
  //   },
  //   results: [['a', 'b']],
  //   consensus: false,
  // },
  {
    title: 'filter_expression_with_current_object',
    query: '$[?(@)]',
    payload: ['some value', null, 'value', 0, 1, -1, '', [], {}, false, true],
    results: ['some value', null, 'value', 0, 1, -1, '', [], {}, false, true],
    consensus: false,
  },
  {
    title: 'filter_expression_with_different_grouped_operators',
    query: '$[?(@.a && (@.b || @.c))]',
    payload: [
      {
        a: true,
      },
      {
        a: true,
        b: true,
      },
      {
        a: true,
        b: true,
        c: true,
      },
      {
        b: true,
        c: true,
      },
      {
        a: true,
        c: true,
      },
      {
        c: true,
      },
      {
        b: true,
      },
    ],
    results: [
      {
        a: true,
        b: true,
      },
      {
        a: true,
        b: true,
        c: true,
      },
      {
        a: true,
        c: true,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_different_ungrouped_operators',
    query: '$[?(@.a && @.b || @.c)]',
    payload: [
      {
        a: true,
        b: true,
      },
      {
        a: true,
        b: true,
        c: true,
      },
      {
        b: true,
        c: true,
      },
      {
        a: true,
        c: true,
      },
      {
        a: true,
      },
      {
        b: true,
      },
      {
        c: true,
      },
      {
        d: true,
      },
      {},
    ],
    results: [
      {
        a: true,
        b: true,
      },
      {
        a: true,
        b: true,
        c: true,
      },
      {
        b: true,
        c: true,
      },
      {
        a: true,
        c: true,
      },
      {
        c: true,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_division',
    query: '$[?(@.key/10==5)]',
    payload: [
      {
        key: 60,
      },
      {
        key: 50,
      },
      {
        key: 10,
      },
      {
        key: -50,
      },
      {
        'key/10': 5,
      },
    ],
    results: [
      {
        key: 50,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_dot_notation_with_number',
    query: "$[?(@.2 == 'second')]",
    payload: [
      {
        '2': 'second',
        a: 'first',
        b: 'third',
      },
    ],
    results: [
      {
        '2': 'second',
        a: 'first',
        b: 'third',
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_dot_notation_with_dash',
    query: "$[?(@.key-dash == 'value')]",
    payload: [
      {
        'key-dash': 'value',
      },
    ],
    results: [
      {
        'key-dash': 'value',
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_empty_expression',
    query: '$[?()]',
    payload: [
      1,
      {
        key: 42,
      },
      'value',
      null,
    ],
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_array_for_array_slice_with_range_1',
    query: '$[?(@[0:1]==[1])]',
    payload: [[1, 2, 3], [1], [2, 3], 1, 2],
    results: [[1, 2, 3], [1]],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_array_for_dot_notation_with_star',
    query: '$[?(@.*==[1,2])]',
    payload: [[1, 2], [2, 3], [1], [2], [1, 2, 3], 1, 2, 3],
    results: [[1, 2]],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_array',
    query: '$[?(@.d==["v1","v2"])]',
    payload: [
      {
        d: ['v1', 'v2'],
      },
      {
        d: ['a', 'b'],
      },
      {
        d: 'v1',
      },
      {
        d: 'v2',
      },
      {
        d: {},
      },
      {
        d: [],
      },
      {
        d: null,
      },
      {
        d: -1,
      },
      {
        d: 0,
      },
      {
        d: 1,
      },
      {
        d: "['v1','v2']",
      },
      {
        d: "['v1', 'v2']",
      },
      {
        d: 'v1,v2',
      },
      {
        d: '["v1", "v2"]',
      },
      {
        d: '["v1","v2"]',
      },
    ],
    results: [
      {
        d: ['v1', 'v2'],
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_false',
    query: '$[?(@.key==false)]',
    payload: [
      {
        some: 'some value',
      },
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    results: [
      {
        key: false,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_dot_notation_with_number_on_array',
    query: "$[?(@.2 == 'third')]",
    payload: [['first', 'second', 'third', 'forth', 'fifth']],
    results: [['first', 'second', 'third', 'forth', 'fifth']],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals',
    query: '$[?(@.key==42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: 'some',
      },
      {
        key: '42',
      },
      {
        key: null,
      },
      {
        key: 420,
      },
      {
        key: '',
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: [42],
      },
      {
        key: {
          key: 42,
        },
      },
      {
        key: {
          some: 42,
        },
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 42,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_null',
    query: '$[?(@.key==null)]',
    payload: [
      {
        some: 'some value',
      },
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    results: [
      {
        key: null,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_array_or_equals_true',
    query: '$[?(@.d==["v1","v2"] || (@.d == true))]',
    payload: [
      {
        d: ['v1', 'v2'],
      },
      {
        d: ['a', 'b'],
      },
      {
        d: true,
      },
    ],
    results: [
      {
        d: ['v1', 'v2'],
      },
      {
        d: true,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_number_for_array_slice_with_range_1',
    query: '$[?(@[0:1]==1)]',
    payload: [[1, 2, 3], [1], [2, 3], 1, 2],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_number_with_leading_zeros',
    query: '$[?(@.key==010)]',
    payload: [
      {
        key: '010',
      },
      {
        key: '10',
      },
      {
        key: 10,
      },
      {
        key: 0,
      },
      {
        key: 8,
      },
    ],
    results: [
      {
        key: 10,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_boolean_expression_value',
    query: '$[?((@.key<44)==false)]',
    payload: [
      {
        key: 42,
      },
      {
        key: 43,
      },
      {
        key: 44,
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_number_for_dot_notation_with_star',
    query: '$[?(@.*==2)]',
    payload: [[1, 2], [2, 3], [1], [2], [1, 2, 3], 1, 2, 3],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_number_with_fraction',
    query: '$[?(@.key==-0.123e2)]',
    payload: [
      {
        key: -12.3,
      },
      {
        key: -0.123,
      },
      {
        key: -12,
      },
      {
        key: 12.3,
      },
      {
        key: 2,
      },
      {
        key: '-0.123e2',
      },
    ],
    results: [
      {
        key: -12.3,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_number_for_bracket_notation_with_star',
    query: '$[?(@[*]==2)]',
    payload: [[1, 2], [2, 3], [1], [2], [1, 2, 3], 1, 2, 3],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_array_with_single_quotes',
    query: "$[?(@.d==['v1','v2'])]",
    payload: [
      {
        d: ['v1', 'v2'],
      },
      {
        d: ['a', 'b'],
      },
      {
        d: 'v1',
      },
      {
        d: 'v2',
      },
      {
        d: {},
      },
      {
        d: [],
      },
      {
        d: null,
      },
      {
        d: -1,
      },
      {
        d: 0,
      },
      {
        d: 1,
      },
      {
        d: "['v1','v2']",
      },
      {
        d: "['v1', 'v2']",
      },
      {
        d: 'v1,v2',
      },
      {
        d: '["v1", "v2"]',
      },
      {
        d: '["v1","v2"]',
      },
    ],
    results: [
      {
        d: ['v1', 'v2'],
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_on_array_without_match',
    query: '$[?(@.key==43)]',
    payload: [
      {
        key: 42,
      },
    ],
    results: [],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_on_object',
    query: '$[?(@.key==42)]',
    payload: {
      a: {
        key: 0,
      },
      b: {
        key: 42,
      },
      c: {
        key: -1,
      },
      d: {
        key: 41,
      },
      e: {
        key: 43,
      },
      f: {
        key: 42.0001,
      },
      g: {
        key: 41.9999,
      },
      h: {
        key: 100,
      },
      i: {
        some: 'value',
      },
    },
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_string_in_NFC',
    query: '$[?(@.key=="Motörhead")]',
    payload: [
      {
        key: 'something',
      },
      {
        key: 'Motörhead',
      },
      {
        key: 'motörhead',
      },
      {
        key: 'Motorhead',
      },
      {
        key: 'Motoörhead',
      },
      {
        key: 'motoörhead',
      },
    ],
    results: [
      {
        key: 'Motörhead',
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_string',
    query: '$[?(@.key=="value")]',
    payload: [
      {
        key: 'some',
      },
      {
        key: 'value',
      },
      {
        key: null,
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: '',
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: 'valuemore',
      },
      {
        key: 'morevalue',
      },
      {
        key: ['value'],
      },
      {
        key: {
          some: 'value',
        },
      },
      {
        key: {
          key: 'value',
        },
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 'value',
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_string_with_dot_literal',
    query: '$[?(@.key=="some.value")]',
    payload: [
      {
        key: 'some',
      },
      {
        key: 'value',
      },
      {
        key: 'some.value',
      },
    ],
    results: [
      {
        key: 'some.value',
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_on_array_of_numbers',
    query: '$[?(@==42)]',
    payload: [0, 42, -1, 41, 43, 42.0001, 41.9999, null, 100],
    results: [42],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_on_object_with_key_matching_query',
    query: '$[?(@.id==2)]',
    payload: {
      id: 2,
    },
    results: [
      {
        id: 2,
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_object',
    query: '$[?(@.d=={"k":"v"})]',
    payload: [
      {
        d: {
          k: 'v',
        },
      },
      {
        d: {
          a: 'b',
        },
      },
      {
        d: 'k',
      },
      {
        d: 'v',
      },
      {
        d: {},
      },
      {
        d: [],
      },
      {
        d: null,
      },
      {
        d: -1,
      },
      {
        d: 0,
      },
      {
        d: 1,
      },
      {
        d: '[object Object]',
      },
      {
        d: '{"k": "v"}',
      },
      {
        d: '{"k":"v"}',
      },
      'v',
    ],
    results: [
      {
        d: {
          k: 'v',
        },
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_string_with_current_object_literal',
    query: '$[?(@.key=="hi@example.com")]',
    payload: [
      {
        key: 'some',
      },
      {
        key: 'value',
      },
      {
        key: 'hi@example.com',
      },
    ],
    results: [
      {
        key: 'hi@example.com',
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_string_with_single_quotes',
    query: "$[?(@.key=='value')]",
    payload: [
      {
        key: 'some',
      },
      {
        key: 'value',
      },
    ],
    results: [
      {
        key: 'value',
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_equals_true',
    query: '$[?(@.key==true)]',
    payload: [
      {
        some: 'some value',
      },
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    results: [
      {
        key: true,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_with_path_and_path',
    query: '$[?(@.key1==@.key2)]',
    payload: [
      {
        key1: 10,
        key2: 10,
      },
      {
        key1: 42,
        key2: 50,
      },
      {
        key1: 10,
      },
      {
        key2: 10,
      },
      {},
      {
        key1: null,
        key2: null,
      },
      {
        key1: null,
      },
      {
        key2: null,
      },
      {
        key1: 0,
        key2: 0,
      },
      {
        key1: 0,
      },
      {
        key2: 0,
      },
      {
        key1: -1,
        key2: -1,
      },
      {
        key1: '',
        key2: '',
      },
      {
        key1: false,
        key2: false,
      },
      {
        key1: false,
      },
      {
        key2: false,
      },
      {
        key1: true,
        key2: true,
      },
      {
        key1: [],
        key2: [],
      },
      {
        key1: {},
        key2: {},
      },
      {
        key1: {
          a: 1,
          b: 2,
        },
        key2: {
          b: 2,
          a: 1,
        },
      },
    ],
    results: [
      {
        key1: 10,
        key2: 10,
      },
      {},
      {
        key1: null,
        key2: null,
      },
      {
        key1: 0,
        key2: 0,
      },
      {
        key1: -1,
        key2: -1,
      },
      {
        key1: '',
        key2: '',
      },
      {
        key1: false,
        key2: false,
      },
      {
        key1: true,
        key2: true,
      },
      {
        key1: [],
        key2: [],
      },
      {
        key1: {},
        key2: {},
      },
      {
        key1: {
          a: 1,
          b: 2,
        },
        key2: {
          b: 2,
          a: 1,
        },
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_in_array_of_values',
    query: '$[?(@.d in [2, 3])]',
    payload: [
      {
        d: 1,
      },
      {
        d: 2,
      },
      {
        d: 1,
      },
      {
        d: 3,
      },
      {
        d: 4,
      },
    ],
    results: [
      {
        d: 2,
      },
      {
        d: 3,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_string_with_unicode_character_escape',
    query: '$[?(@.key=="Mot\\u00f6rhead")]',
    payload: [
      {
        key: 'something',
      },
      {
        key: 'Motörhead',
      },
      {
        key: 'motörhead',
      },
      {
        key: 'Motorhead',
      },
      {
        key: 'Motoörhead',
      },
      {
        key: 'motoörhead',
      },
    ],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_greater_than_or_equal',
    query: '$[?(@.key>=42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 42,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 100,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_in_current_object',
    query: '$[?(2 in @.d)]',
    payload: [
      {
        d: [1, 2, 3],
      },
      {
        d: [2],
      },
      {
        d: [1],
      },
      {
        d: [3, 4],
      },
      {
        d: [4, 2],
      },
    ],
    results: [
      {
        d: [1, 2, 3],
      },
      {
        d: [2],
      },
      {
        d: [4, 2],
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_greater_than_string',
    query: '$[?(@.key>"VALUE")]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'alpha',
      },
      {
        key: 'ALPHA',
      },
      {
        key: 'value',
      },
      {
        key: 'VALUE',
      },
      {
        some: 'value',
      },
      {
        some: 'VALUE',
      },
    ],
    results: [
      {
        key: 'alpha',
      },
      {
        key: 'value',
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_less_than',
    query: '$[?(@.key<42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 0,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 41.9999,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_greater_than',
    query: '$[?(@.key>42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 100,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_length_function',
    query: '$[?(@.length() == 4)]',
    payload: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4],
      [1, 2, 3],
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_length_free_function',
    query: '$[?(length(@) == 4)]',
    payload: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4],
      [1, 2, 3],
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_length_property',
    query: '$[?(@.length == 4)]',
    payload: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4],
      [1, 2, 3],
    ],
    results: [],
    consensus: true,
  },
  {
    title: 'filter_expression_with_less_than_or_equal',
    query: '$[?(@.key<=42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 41.9999,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_local_dot_key_and_null_in_data',
    query: "$[?(@.key='value')]",
    payload: [
      {
        key: 0,
      },
      {
        key: 'value',
      },
      null,
      {
        key: 42,
      },
      {
        some: 'value',
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'filter_expression_with_multiplication',
    query: '$[?(@.key*2==100)]',
    payload: [
      {
        key: 60,
      },
      {
        key: 50,
      },
      {
        key: 10,
      },
      {
        key: -50,
      },
      {
        'key*2': 100,
      },
    ],
    results: [
      {
        key: 50,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_negation_and_without_value',
    query: '$[?(!@.key)]',
    payload: [
      {
        some: 'some value',
      },
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_negation_and_less_than',
    query: '$[?(!(@.key<42))]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 42,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_negation_and_equals',
    query: '$[?(!(@.key==42))]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 0,
      },
      {
        key: -1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: '43',
      },
      {
        key: '42',
      },
      {
        key: '41',
      },
      {
        key: 'value',
      },
      {
        some: 'value',
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_parent_axis_operator',
    query: '$[*].bookmarks[?(@.page == 45)]^^^',
    payload: [
      {
        title: 'Sayings of the Century',
        bookmarks: [
          {
            page: 40,
          },
        ],
      },
      {
        title: 'Sword of Honour',
        bookmarks: [
          {
            page: 35,
          },
          {
            page: 45,
          },
        ],
      },
      {
        title: 'Moby Dick',
        bookmarks: [
          {
            page: 3035,
          },
          {
            page: 45,
          },
        ],
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'filter_expression_with_not_equals_array_or_equals_true',
    query: '$[?((@.d!=["v1","v2"]) || (@.d == true))]',
    payload: [
      {
        d: ['v1', 'v2'],
      },
      {
        d: ['a', 'b'],
      },
      {
        d: true,
      },
    ],
    results: [
      {
        d: ['a', 'b'],
      },
      {
        d: true,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_non_singular_existence_test',
    query: '$[?(@.a.*)]',
    payload: [
      {
        a: 0,
      },
      {
        a: 'x',
      },
      {
        a: false,
      },
      {
        a: true,
      },
      {
        a: null,
      },
      {
        a: [],
      },
      {
        a: [1],
      },
      {
        a: [1, 2],
      },
      {
        a: {},
      },
      {
        a: {
          x: 'y',
        },
      },
      {
        a: {
          x: 'y',
          w: 'z',
        },
      },
    ],
    results: [
      {
        a: 0,
      },
      {
        a: 'x',
      },
      {
        a: false,
      },
      {
        a: true,
      },
      {
        a: null,
      },
      {
        a: [],
      },
      {
        a: [1],
      },
      {
        a: [1, 2],
      },
      {
        a: {},
      },
      {
        a: {
          x: 'y',
        },
      },
      {
        a: {
          x: 'y',
          w: 'z',
        },
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_negation_and_equals_array_or_equals_true',
    query: '$[?(!(@.d==["v1","v2"]) || (@.d == true))]',
    payload: [
      {
        d: ['v1', 'v2'],
      },
      {
        d: ['a', 'b'],
      },
      {
        d: true,
      },
    ],
    results: [
      {
        d: ['a', 'b'],
      },
      {
        d: true,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_not_equals',
    query: '$[?(@.key!=42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: 'some',
      },
      {
        key: '42',
      },
      {
        key: null,
      },
      {
        key: 420,
      },
      {
        key: '',
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: [42],
      },
      {
        key: {
          key: 42,
        },
      },
      {
        key: {
          some: 42,
        },
      },
      {
        some: 'value',
      },
    ],
    results: [
      {
        key: 0,
      },
      {
        key: -1,
      },
      {
        key: 1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: 'some',
      },
      {
        key: '42',
      },
      {
        key: null,
      },
      {
        key: 420,
      },
      {
        key: '',
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: [42],
      },
      {
        key: {
          key: 42,
        },
      },
      {
        key: {
          some: 42,
        },
      },
      {
        some: 'value',
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_set_wise_comparison_to_set',
    query: '$.x[?(@[*]>=$.y[*])]',
    payload: {
      x: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
      y: [3, 4, 5],
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_equals_with_root_reference',
    query: '$.items[?(@.key==$.value)]',
    payload: {
      value: 42,
      items: [
        {
          key: 10,
        },
        {
          key: 42,
        },
        {
          key: 50,
        },
      ],
    },
    results: [
      {
        key: 42,
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_regular_expression_from_member',
    query: '$[?(@.name=~/@.pattern/)]',
    payload: [
      {
        name: 'hullo world',
      },
      {
        name: 'hello world',
      },
      {
        name: 'yes hello world',
      },
      {
        name: 'HELLO WORLD',
      },
      {
        name: 'good bye',
      },
      {
        pattern: 'hello.*',
      },
    ],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_single_equal',
    query: '$[?(@.key=42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: 'some',
      },
      {
        key: '42',
      },
      {
        key: null,
      },
      {
        key: 420,
      },
      {
        key: '',
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: [42],
      },
      {
        key: {
          key: 42,
        },
      },
      {
        key: {
          some: 42,
        },
      },
      {
        some: 'value',
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'filter_expression_with_subpaths',
    query: '$[?(@.a.b==3)]',
    payload: [
      {
        a: {
          b: 3,
        },
      },
      {
        a: {
          b: 2,
        },
      },
    ],
    results: [
      {
        a: {
          b: 3,
        },
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_subpaths_deeply_nested',
    query: '$[?(@.a.b.c==3)]',
    payload: [
      {
        a: {
          b: {
            c: 3,
          },
        },
      },
      {
        a: 3,
      },
      {
        c: 3,
      },
      {
        a: {
          b: {
            c: 2,
          },
        },
      },
    ],
    results: [
      {
        a: {
          b: {
            c: 3,
          },
        },
      },
    ],
    consensus: true,
  },
  {
    title: 'filter_expression_with_subfilter',
    query: '$[?(@.a[?(@.price>10)])]',
    payload: [
      {
        a: [
          {
            price: 1,
          },
          {
            price: 3,
          },
        ],
      },
      {
        a: [
          {
            price: 11,
          },
        ],
      },
      {
        a: [
          {
            price: 8,
          },
          {
            price: 12,
          },
          {
            price: 3,
          },
        ],
      },
      {
        a: [],
      },
    ],
    results: [
      {
        a: [
          {
            price: 1,
          },
          {
            price: 3,
          },
        ],
      },
      {
        a: [
          {
            price: 11,
          },
        ],
      },
      {
        a: [
          {
            price: 8,
          },
          {
            price: 12,
          },
          {
            price: 3,
          },
        ],
      },
      {
        a: [],
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_tautological_comparison',
    query: '$[?(1==1)]',
    payload: [1, 3, 'nice', true, null, false, {}, [], -1, 0, ''],
    results: [1, 3, 'nice', true, null, false, {}, [], -1, 0, ''],
    consensus: true,
  },
  {
    title: 'filter_expression_with_set_wise_comparison_to_scalar',
    query: '$[?(@[*]>=4)]',
    payload: [
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_subtraction',
    query: '$[?(@.key-50==-100)]',
    payload: [
      {
        key: 60,
      },
      {
        key: 50,
      },
      {
        key: 10,
      },
      {
        key: -50,
      },
      {
        'key-50': -100,
      },
    ],
    results: [
      {
        key: -50,
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_regular_expression',
    query: '$[?(@.name=~/hello.*/)]',
    payload: [
      {
        name: 'hullo world',
      },
      {
        name: 'hello world',
      },
      {
        name: 'yes hello world',
      },
      {
        name: 'HELLO WORLD',
      },
      {
        name: 'good bye',
      },
    ],
    results: [
      {
        name: 'hello world',
      },
      {
        name: 'yes hello world',
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_triple_equal',
    query: '$[?(@.key===42)]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: 'some',
      },
      {
        key: '42',
      },
      {
        key: null,
      },
      {
        key: 420,
      },
      {
        key: '',
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: [42],
      },
      {
        key: {
          key: 42,
        },
      },
      {
        key: {
          some: 42,
        },
      },
      {
        some: 'value',
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_value',
    query: '$[?(@.key)]',
    payload: [
      {
        some: 'some value',
      },
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    results: [
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_with_value_after_dot_notation_with_wildcard_on_array_of_objects',
    query: '$.*[?(@.key)]',
    payload: [
      {
        some: 'some value',
      },
      {
        key: 'value',
      },
    ],
    results: [
      {
        key: 'value',
      },
    ],
    consensus: true,
    isCustom: true,
  },
  // {
  //   title: 'filter_expression_with_value_after_recursive_descent',
  //   query: '$..[?(@.id)]',
  //   payload: {
  //     id: 2,
  //     more: [
  //       {
  //         id: 2,
  //       },
  //       {
  //         more: {
  //           id: 2,
  //         },
  //       },
  //       {
  //         id: {
  //           id: 2,
  //         },
  //       },
  //       [
  //         {
  //           id: 2,
  //         },
  //       ],
  //     ],
  //   },
  //   results: [
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: {
  //         id: 2,
  //       },
  //     },
  //   ],
  //   consensus: false,
  // },
  {
    title: 'filter_expression_with_value_false',
    query: '$[?(false)]',
    payload: [1, 3, 'nice', true, null, false, {}, [], -1, 0, ''],
    results: [],
    consensus: false,
  },
  {
    title: 'filter_expression_with_value_true',
    query: '$[?(true)]',
    payload: [1, 3, 'nice', true, null, false, {}, [], -1, 0, ''],
    results: [1, 3, 'nice', true, null, false, {}, [], -1, 0, ''],
    consensus: false,
  },
  {
    title: 'filter_expression_with_value_null',
    query: '$[?(null)]',
    payload: [1, 3, 'nice', true, null, false, {}, [], -1, 0, ''],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_with_value_from_recursive_descent',
    query: '$[?(@..child)]',
    payload: [
      {
        key: [
          {
            child: 1,
          },
          {
            child: 2,
          },
        ],
      },
      {
        key: [
          {
            child: 2,
          },
        ],
      },
      {
        key: [{}],
      },
      {
        key: [
          {
            something: 42,
          },
        ],
      },
      {},
    ],
    results: [
      {
        key: [
          {
            child: 1,
          },
          {
            child: 2,
          },
        ],
      },
      {
        key: [
          {
            child: 2,
          },
        ],
      },
      {
        key: [{}],
      },
      {
        key: [
          {
            something: 42,
          },
        ],
      },
      {},
    ],
    consensus: false,
  },
  {
    title: 'filter_expression_without_value',
    query: '$[?(@.key)]',
    payload: [
      {
        some: 'some value',
      },
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    results: [
      {
        key: true,
      },
      {
        key: false,
      },
      {
        key: null,
      },
      {
        key: 'value',
      },
      {
        key: '',
      },
      {
        key: 0,
      },
      {
        key: 1,
      },
      {
        key: -1,
      },
      {
        key: 42,
      },
      {
        key: {},
      },
      {
        key: [],
      },
    ],
    consensus: false,
  },
  {
    title: 'function_sum',
    query: '$.data.sum()',
    payload: {
      data: [1, 2, 3, 4],
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'parens_notation',
    query: '$(key,more)',
    payload: {
      key: 1,
      some: 2,
      more: 3,
    },
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'root',
    query: '$',
    payload: {
      key: 'value',
      'another key': {
        complex: ['a', 1],
      },
    },
    results: [
      {
        'another key': {
          complex: ['a', 1],
        },
        key: 'value',
      },
    ],
    consensus: true,
  },
  {
    title: 'recursive_descent_after_dot_notation',
    query: '$.key..',
    payload: {
      'some key': 'value',
      key: {
        complex: 'string',
        primitives: [0, 1],
      },
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'filter_expression_without_parens',
    query: '$[?@.key==42]',
    payload: [
      {
        key: 0,
      },
      {
        key: 42,
      },
      {
        key: -1,
      },
      {
        key: 1,
      },
      {
        key: 41,
      },
      {
        key: 43,
      },
      {
        key: 42.0001,
      },
      {
        key: 41.9999,
      },
      {
        key: 100,
      },
      {
        key: 'some',
      },
      {
        key: '42',
      },
      {
        key: null,
      },
      {
        key: 420,
      },
      {
        key: '',
      },
      {
        key: {},
      },
      {
        key: [],
      },
      {
        key: [42],
      },
      {
        key: {
          key: 42,
        },
      },
      {
        key: {
          some: 42,
        },
      },
      {
        some: 'value',
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'recursive_descent',
    query: '$..',
    payload: [
      {
        a: {
          b: 'c',
        },
      },
      [0, 1],
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'recursive_descent_on_nested_arrays',
    query: '$..*',
    payload: [[0], [1]],
    results: [[0], [1], 0, 1],
    consensus: true,
  },
  {
    title: 'root_on_scalar',
    query: '$',
    payload: 42,
    results: [42],
    consensus: true,
  },
  {
    title: 'root_on_scalar_true',
    query: '$',
    payload: true,
    results: [true],
    consensus: true,
  },
  {
    title: 'union',
    query: '$[0,1]',
    payload: ['first', 'second', 'third'],
    results: ['first', 'second'],
    consensus: true,
  },
  {
    title: 'union_with_duplication_from_object',
    query: "$['a','a']",
    payload: {
      a: 1,
    },
    results: [1, 1],
    consensus: true,
  },
  {
    title: 'union_with_duplication_from_array',
    query: '$[0,0]',
    payload: ['a'],
    results: ['a', 'a'],
    consensus: true,
  },
  {
    title: 'script_expression',
    query: '$[(@.length-1)]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: 'NOT_SUPPORTED',
    consensus: true,
  },
  {
    title: 'union_with_keys',
    query: "$['key','another']",
    payload: {
      key: 'value',
      another: 'entry',
    },
    results: ['value', 'entry'],
    consensus: true,
  },
  {
    title: 'union_with_keys_after_array_slice',
    query: "$[:]['c','d']",
    payload: [
      {
        c: 'cc1',
        d: 'dd1',
        e: 'ee1',
      },
      {
        c: 'cc2',
        d: 'dd2',
        e: 'ee2',
      },
    ],
    results: ['cc1', 'dd1', 'cc2', 'dd2'],
    consensus: true,
  },
  {
    title: 'union_with_keys_after_bracket_notation',
    query: "$[0]['c','d']",
    payload: [
      {
        c: 'cc1',
        d: 'dd1',
        e: 'ee1',
      },
      {
        c: 'cc2',
        d: 'dd2',
        e: 'ee2',
      },
    ],
    results: ['cc1', 'dd1'],
    consensus: true,
  },
  {
    title: 'union_with_keys_on_object_without_key',
    query: "$['missing','key']",
    payload: {
      key: 'value',
      another: 'entry',
    },
    results: ['value'],
    consensus: true,
  },
  {
    title: 'root_on_scalar_false',
    query: '$',
    payload: false,
    results: [false],
    consensus: true,
  },
  {
    title: 'union_with_keys_after_recursive_descent',
    query: "$..['c','d']",
    payload: [
      {
        c: 'cc1',
        d: 'dd1',
        e: 'ee1',
      },
      {
        c: 'cc2',
        child: {
          d: 'dd2',
        },
      },
      {
        c: 'cc3',
      },
      {
        d: 'dd4',
      },
      {
        child: {
          c: 'cc5',
        },
      },
    ],
    results: ['cc1', 'dd1', 'cc2', 'dd2', 'cc3', 'dd4', 'cc5'],
    consensus: true,
  },
  {
    title: 'union_with_keys_after_dot_notation_with_wildcard',
    query: "$.*['c','d']",
    payload: [
      {
        c: 'cc1',
        d: 'dd1',
        e: 'ee1',
      },
      {
        c: 'cc2',
        d: 'dd2',
        e: 'ee2',
      },
    ],
    results: ['cc1', 'dd1', 'cc2', 'dd2'],
    consensus: true,
  },
  {
    title: 'union_with_filter',
    query: '$[?(@.key<3),?(@.key>6)]',
    payload: [
      {
        key: 1,
      },
      {
        key: 8,
      },
      {
        key: 3,
      },
      {
        key: 10,
      },
      {
        key: 7,
      },
      {
        key: 2,
      },
      {
        key: 6,
      },
      {
        key: 4,
      },
    ],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'union_with_slice_and_number',
    query: '$[1:3,4]',
    payload: [1, 2, 3, 4, 5],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'union_with_spaces',
    query: '$[ 0 , 1 ]',
    payload: ['first', 'second', 'third'],
    results: ['first', 'second'],
    consensus: true,
  },
  {
    title: 'union_with_repeated_matches_after_dot_notation_with_wildcard',
    query: '$.*[0,:5]',
    payload: {
      a: ['string', null, true],
      b: [false, 'string', 5.4],
    },
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'union_with_wildcard_and_number',
    query: '$[*,1]',
    payload: ['first', 'second', 'third', 'forth', 'fifth'],
    results: 'NOT_SUPPORTED',
    consensus: false,
  },
  {
    title: 'union_with_numbers_in_decreasing_order',
    query: '$[4,1]',
    payload: [1, 2, 3, 4, 5],
    results: [5, 2],
    consensus: true,
  },
];

describe('test_suits', () => {
  testSuits.forEach(({ title, query: q, payload, results }) => {
    it(title, (done) => {
      if (results === 'NOT_SUPPORTED') {
        expect(() => {
          return query(payload, q, { returnArray: true });
        }).to.throw(Error);
        done();
      } else {
        const res = query(payload, q, { returnArray: true });
        expect(res).to.deep.equal(results);
        done();
      }
    });
  });
});
