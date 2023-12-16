import { useContext } from 'react';
import classNames from 'classnames';
import './ModalChangeTodo.scss';

import { CloseIcon } from '../../../../UI/CloseIcon/CloseIcon';

import { ThemeContext } from '../../../../contexts/ThemeContext';
import { LangContext } from '../../../../contexts/LangContext';
import { translator } from '../../../../translator';
import { Status } from '../../types/Status';

interface Props {
  closeModalWin: () => void;
  changedTodoTitle: string;
  setChangedTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  statusOfTodo: Status;
  setStatusOfTodo: React.Dispatch<React.SetStateAction<Status>>;
  changeTodo: () => void;
}

export const ModalChangeTodo: React.FC<Props> = ({
  closeModalWin,
  changedTodoTitle,
  setChangedTodoTitle,
  changeTodo,
  statusOfTodo,
  setStatusOfTodo
}) => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const translate = translator[lang].dashboard;

  return (
    <div className="modalAddTodo">
      <div className={classNames(
        "modalAddTodo__modalWindow",
        "modalWindow",
        { "modalWindow--dark": theme === 'DARK' }
      )}>
        <header className="modalWindow__header">
          <CloseIcon closeModalWin={() => {
            closeModalWin();
            setChangedTodoTitle('');
          }} />
        </header>

        <input
          type="text"
          className={classNames(
            "modalWindow__input",
            { "modalWindow__input--dark": theme === 'DARK' }
          )}
          placeholder={translate.nameForNewTodo}
          value={changedTodoTitle}
          onChange={e => setChangedTodoTitle(e.target.value)}
        />

        <div className={classNames(
          "modalWindow__change-status-mobile",
          { "modalWindow__change-status-mobile--dark": theme === 'DARK' }
        )}>
          <button 
            className={classNames(
              "modalWindow__change-status-btn",
              { "modalWindow__change-status-btn--current": statusOfTodo === Status.TODO },
              { "modalWindow__change-status-btn--dark": theme === 'DARK' && statusOfTodo !== Status.TODO},
              { "modalWindow__change-status-btn--current--dark": statusOfTodo === Status.TODO && theme === 'DARK' }
            )}
            onClick={() => setStatusOfTodo(Status.TODO)}
          >
            To Do
          </button>
          <button 
            className={classNames(
              "modalWindow__change-status-btn",
              { "modalWindow__change-status-btn--current": statusOfTodo === Status.IN_PROCESS },
              { "modalWindow__change-status-btn--dark": theme === 'DARK' && statusOfTodo !== Status.IN_PROCESS},
              { "modalWindow__change-status-btn--current--dark": statusOfTodo === Status.IN_PROCESS && theme === 'DARK' }
            )}
            onClick={() => setStatusOfTodo(Status.IN_PROCESS)}
          >
            In process
          </button>
          <button 
            className={classNames(
              "modalWindow__change-status-btn",
              { "modalWindow__change-status-btn--current": statusOfTodo === Status.DONE },
              { "modalWindow__change-status-btn--dark": theme === 'DARK' && statusOfTodo !== Status.DONE},
              { "modalWindow__change-status-btn--current--dark": statusOfTodo === Status.DONE && theme === 'DARK' }
            )}
            onClick={() => setStatusOfTodo(Status.DONE)}
          >
            Done
          </button>
        </div>

        <button
          className={classNames(
            "modalWindow__button",
            { "modalWindow__button--dark": theme === 'DARK' }
          )}
          onClick={changeTodo}
          disabled={changedTodoTitle.length < 5}
        >
          {translate.btnChangeTitleLabel}
        </button>
      </div>
    </div>
  );
};
