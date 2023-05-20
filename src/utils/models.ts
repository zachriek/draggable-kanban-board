import { EColumnType } from './enums';

export interface ITaskModel {
  id: string;
  title: string;
  column: EColumnType;
  color: string;
}

export interface IDragItem {
  index: number;
  id: ITaskModel['id'];
  from: EColumnType;
}
