import { useContext, useState } from 'react';
import classNames from 'classnames';
import { DeleteIcon } from '../../../../UI/DeleteIcon/DeleteIcon';
import { EditIcon } from '../../../../UI/EditIcon/EditIcon';
import './ToDo.scss';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { Todo } from '../../types/Todo';
import { Board } from '../../types/Board';
import { Task } from '../../types/Task';
import LoadingIcons from 'react-loading-icons';

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
  setCallbackForModalWinContinue: React.Dispatch<React.SetStateAction<() => void>>;
  setModalContinueOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToDo: React.FC<Props> = ({
  title,
  id,
  onDelete,
  changeHandler,
  board,
  dragAndDropClass,
  item,
  setCallbackForModalWinContinue,
  setModalContinueOpened,
 }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { theme } = useContext(ThemeContext);
  const DragAndDrop = dragAndDropClass;

  const deleteHandlerByToDo = () => {
    const deleteCallback = () => {
      onDelete(id);
      setIsDeleting(true);

      setTimeout(() => {
        setModalContinueOpened(false);
      }, 1100)
    }

    setCallbackForModalWinContinue(() => deleteCallback);
    setModalContinueOpened(true);
  }

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
        {!isDeleting ? (
        <DeleteIcon onClickFunc={() => deleteHandlerByToDo()}/>
        ) : (
          <LoadingIcons.TailSpin width={'15px'} height={'17px'} strokeWidth='4px' stroke={theme === 'LIGHT' ? '#4042E2' : '#fff'}/>
        )}
      </div>
    </div>
  );
};
