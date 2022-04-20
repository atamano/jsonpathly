import { isArray } from 'lodash';
import { parse } from '../parser';
import { Handler } from './Handler';

type Options = {
  raiseExceptions?: boolean;
  returnArray?: boolean;
};

export const query = (payload: unknown, path: string, options?: Options): unknown => {
  try {
    const tree = parse(path);
    if (!tree) {
      return;
    }

    const handler = new Handler(payload);
    const result = handler.handleSubscript(payload, tree.next);

    if (!!options?.returnArray && !isArray(result)) {
      return [result];
    }
    return result;
  } catch (e) {
    if (!!options?.raiseExceptions) {
      throw e;
    }
    console.log(e);
  }
};
