import { useContext } from 'react';
import classNames from 'classnames';
import { DeleteIcon } from '../../../../UI/DeleteIcon/DeleteIcon';
import { EditIcon } from '../../../../UI/EditIcon/EditIcon';
import './ToDo.scss';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { Todo } from '../../types/Todo';
import { Board } from '../../types/Board';
import { Task } from '../../types/Task';

interface IDragAndDrop {
  dragLeaveHandler(e: React.DragEvent<HTMLDivElement>): void;
  dragStartHandler(board: Board, item: Task): void;
  dragEndHandler(e: React.DragEvent<HTMLDivElement>): void;
  dropHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Task): void;
  dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: Board): void;
}

interface Props {
  title: string;
  id: Todo['id'];
  onDelete: (todoId: Todo['id']) => void;
  changeHandler: (todoId: Todo['id']) => void;
  board: Board;
  dragAndDropClass: IDragAndDrop;
  item: Task;
}

export const ToDo: React.FC<Props> = ({
  title,
  id,
  onDelete,
  changeHandler,
  board,
  dragAndDropClass,
  item,
 }) => {
  const { theme } = useContext(ThemeContext);
  const DragAndDrop = dragAndDropClass;

  return (
    <div
      className={classNames(
        "todo",
        { "todo--dark": theme === 'DARK' }
      )}
      draggable
      onDragOver={e => e.preventDefault()}
      onDragLeave={(e) => DragAndDrop.dragLeaveHandler(e)}
      onDragStart={() => DragAndDrop.dragStartHandler(board, item)}
      onDragEnd={(e) => DragAndDrop.dragEndHandler(e)}
      onDrop={(e) => DragAndDrop.dropHandler(e, board, item)}
    >
      <p className={classNames(
        "todo__title",
        { "todo__title--dark": theme === 'DARK' }
      )}>
        { title }
      </p>

      <div className="todo__buttons">
        <EditIcon onClickFunc={() => changeHandler(id)} />
        <DeleteIcon onClickFunc={() => onDelete(id)}/>
      </div>
    </div>
  );
};
