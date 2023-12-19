import { useContext } from 'react';
import classNames from 'classnames';
import { DeleteIcon } from '../../../../UI/DeleteIcon/DeleteIcon';
import { EditIcon } from '../../../../UI/EditIcon/EditIcon';
import './ToDo.scss';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { Todo } from '../../types/Todo';

interface Props {
  title: string;
  id: Todo['id'];
  onDelete: (todoId: Todo['id']) => void;
}

export const ToDo: React.FC<Props> = ({ title, id, onDelete }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={classNames(
      "todo",
      { "todo--dark": theme === 'DARK' }
    )}>
      <p className={classNames(
        "todo__title",
        { "todo__title--dark": theme === 'DARK' }
      )}>
        { title }
      </p>

      <div className="todo__buttons">
        <EditIcon />
        <DeleteIcon onClickFunc={() => onDelete(id)}/>
      </div>
    </div>
  );
};
