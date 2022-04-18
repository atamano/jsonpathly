import { parse } from '../parser';
import { Handler } from './Handler';

export const query = (payload: unknown, path: string): unknown => {
  const tree = parse(path);
  if (!tree) {
    return;
  }

  const handler = new Handler(payload);

  return handler.handleSubscript(payload, tree.next);
};
