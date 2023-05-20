import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from 'usehooks-ts';
import { EColumnType } from '../utils/enums';
import { ITaskModel } from '../utils/models';

function useTaskCollection() {
  return useLocalStorage<{
    [key in EColumnType]: ITaskModel[];
  }>('tasks', {
    Todo: [
      {
        id: uuidv4(),
        column: EColumnType.TO_DO,
        title: 'Task 1',
        color: 'blue.300',
      },
    ],
    'In Progress': [
      {
        id: uuidv4(),
        column: EColumnType.IN_PROGRESS,
        title: 'Task 2',
        color: 'yellow.300',
      },
    ],
    Blocked: [
      {
        id: uuidv4(),
        column: EColumnType.BLOCKED,
        title: 'Task 3',
        color: 'red.300',
      },
    ],
    Completed: [
      {
        id: uuidv4(),
        column: EColumnType.COMPLETED,
        title: 'Task 4',
        color: 'green.300',
      },
    ],
  });
}

export default useTaskCollection;
