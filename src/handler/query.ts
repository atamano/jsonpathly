import { parse } from '../parser/parse';
import { Handler } from './Handler';

export type JSONPathOptions = {
  hideExceptions?: boolean;
  returnArray?: boolean;
};

export const query = (payload: unknown, path: string, options?: JSONPathOptions): unknown => {
  try {
    const { tree, isIndefinite } = parse(path);
    if (!tree) {
      return;
    }

    const handler = new Handler(payload);
    const result = handler.handleSubscript(payload, tree.next);

    if (!isIndefinite && options?.returnArray) {
      if (typeof result === 'undefined') {
        return [];
      }
      return [result];
    }

    return result;
  } catch (e) {
    if (!options?.hideExceptions) {
      throw e;
    }
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
