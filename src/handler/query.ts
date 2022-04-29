import { isUndefined } from './helper';
import { parse } from '../parser/parse';
import { Handler } from './Handler';

export type JSONPathOptions = {
  supressExceptions?: boolean;
  returnArray?: boolean;
};

export const query = (payload: unknown, path: string, options: JSONPathOptions = {}): unknown => {
  try {
    const { tree, isIndefinite } = parse(path);

    const handler = new Handler(payload);
    const result = handler.handleRoot(payload, tree);

    if (!isIndefinite && options.returnArray && !tree.fn) {
      if (isUndefined(result)) {
        return [];
      }
      return [result];
    }

    return result;
  } catch (e) {
    if (!options.supressExceptions) {
      throw e;
    }

    if (!!options.returnArray) {
      return [];
    }
  }
};
