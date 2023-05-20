import { EColumnType } from './enums';

export const ColumnColorScheme: Record<EColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
  Blocked: 'red',
  Completed: 'green',
};
