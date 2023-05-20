import { useDrop } from 'react-dnd';
import { EColumnType, EItemType } from '../utils/enums';
import { IDragItem, ITaskModel } from '../utils/models';

function useColumnDrop(column: EColumnType, handleDrop: (fromColumn: EColumnType, taskId: ITaskModel['id']) => void) {
  const [{ isOver }, dropRef] = useDrop<IDragItem, void, { isOver: boolean }>({
    accept: EItemType.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === column) {
        return;
      }
      handleDrop(dragItem.from, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { isOver, dropRef };
}

export default useColumnDrop;
