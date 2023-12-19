import { useContext, useEffect, useState } from 'react';
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
  const [render, setRender] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const translate = translator[lang].dashboard;

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 50);
  }, [setRender]);

  const closeHandler = () => {
    setRender(false);

    setTimeout(() => {
      closeModalWin();
    }, 1000)
  }

  const changeTodoHandler = () => {
    setRender(false);
    changeTodo();
  }

  return (
    <div className={classNames(
      "modalAddTodo",
      { "modalAddTodo--render": render }
    )}>
      <div className={classNames(
        "modalAddTodo__modalWindow",
        "modalWindow",
        { "modalWindow--dark": theme === 'DARK' },
        { "modalWindow--render": render },
      )}>
        <header className="modalWindow__header">
          <CloseIcon closeModalWin={() => {
            closeHandler();
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
            { translate.boards.todoShortLabel }
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
            { translate.boards.inProcessShortLabel }
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
            { translate.boards.doneShortLabel }
          </button>
        </div>

        <button
          className={classNames(
            "modalWindow__button",
            { "modalWindow__button--dark": theme === 'DARK' }
          )}
          onClick={changeTodoHandler}
          disabled={changedTodoTitle.length < 5}
        >
          {translate.btnChangeTitleLabel}
        </button>
      </div>
    </div>
  );
};
