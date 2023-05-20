import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EColumnType } from '../utils/enums';
import { pickChakraRandomColor, swap } from '../utils/helpers';
import { debug } from '../utils/logging';
import { ITaskModel } from '../utils/models';
import useTaskCollection from './useTaskCollection';

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(column: EColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const columnTasks = tasks[column];

  const addEmptyTask = useCallback(() => {
    debug(`Adding new empty task to ${column} column`);
    setTasks((allTasks) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        debug('Too many task!');
        return allTasks;
      }

      const newColumnTask: ITaskModel = {
        id: uuidv4(),
        title: `New ${column} task`,
        color: pickChakraRandomColor('.300'),
        column,
      };

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks],
      };
    });
  }, [column, setTasks]);

  const deleteTask = useCallback(
    (id: ITaskModel['id']) => {
      debug(`Removing task ${id}..`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [column, setTasks]
  );

  const updateTask = useCallback(
    (id: ITaskModel['id'], updatedTask: Omit<Partial<ITaskModel>, 'id'>) => {
      debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: columnTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
        };
      });
    },
    [column, setTasks]
  );

  const dropTaskFrom = useCallback(
    (from: EColumnType, id: ITaskModel['id']) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[column];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        console.log(`Moving task ${movingTask?.id} from ${from} to ${column}`);

        if (!movingTask) {
          return allTasks;
        }

        // remove the task from the original column and copy it within the destination column
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [column]: [{ ...movingTask, column }, ...toColumnTasks],
        };
      });
    },
    [column, setTasks]
  );

  const swapTasks = useCallback(
    (i: number, j: number) => {
      debug(`Swapping task ${i} with ${j} in ${column} column`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[column];
        return {
          ...allTasks,
          [column]: swap(columnTasks, i, j),
        };
      });
    },
    [column, setTasks]
  );

  return {
    tasks: columnTasks,
    addEmptyTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  };
}

export default useColumnTasks;
