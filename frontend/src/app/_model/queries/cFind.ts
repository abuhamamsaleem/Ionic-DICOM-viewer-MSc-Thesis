import { CFindQuery } from './cFindQuery';
export interface CFind {
  Level: string;
  Expand: boolean;
  Limit: number;
  Since: number;
  CaseSensitive: boolean;
  Query: CFindQuery;
}
