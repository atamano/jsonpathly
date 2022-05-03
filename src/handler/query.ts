import { isUndefined } from './helper';
import { parseInternal } from '../parser/parse';
import { Handler } from './Handler';

export type QueryOptions = {
  supressExceptions?: boolean;
  returnArray?: boolean;
};

export const query = (payload: unknown, path: string, options: QueryOptions = {}): unknown => {
  try {
    const { tree, isIndefinite } = parseInternal(path);

    const handler = new Handler(payload);
    const result = handler.handleRoot(payload, tree);

    if (!isIndefinite && options.returnArray) {
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
