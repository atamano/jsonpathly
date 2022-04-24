import { parse } from '../parser';
import { Handler } from './Handler';

type Options = {
  hideExceptions?: boolean;
};

export const query = (payload: unknown, path: string, options?: Options): unknown => {
  try {
    const tree = parse(path);
    if (!tree) {
      return;
    }

    const handler = new Handler(payload);
    const result = handler.handleSubscript(payload, tree.next);

    return result;
  } catch (e) {
    if (!options?.hideExceptions) {
      throw e;
    }
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
