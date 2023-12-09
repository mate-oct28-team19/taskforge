import { CloseIcon } from '../../../../UI/CloseIcon/CloseIcon';
import './ModalAddTodo.scss';

interface Props {
  closeModalWin: () => void;
  newTodoTitle: string;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  createNewTodo: () => void;
}

export const ModalAddTodo: React.FC<Props> = ({
  closeModalWin,
  newTodoTitle,
  setNewTodoTitle,
  createNewTodo,
}) => {
  return (
    <div className="modalAddTodo">
      <div className="modalAddTodo__modalWindow modalWindow">
        <header className="modalWindow__header">
          <CloseIcon closeModalWin={closeModalWin} />
        </header>

        <input
          type="password"
          className="modalWindow__input"
          placeholder="Title for new todo"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
        />

        <button className="modalWindow__button" onClick={createNewTodo} >Create</button>
      </div>
    </div>
  );
};
