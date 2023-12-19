import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import './ModalAddTodo.scss';

import { CloseIcon } from '../../../../UI/CloseIcon/CloseIcon';

import { ThemeContext } from '../../../../contexts/ThemeContext';
import { LangContext } from '../../../../contexts/LangContext';
import { translator } from '../../../../translator';

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
  };

  const createNewTodoHandler = () => {
    setRender(false);
    createNewTodo();
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
          <CloseIcon closeModalWin={closeHandler} />
        </header>

        <input
          type="text"
          className={classNames(
            "modalWindow__input",
            { "modalWindow__input--dark": theme === 'DARK' }
          )}
          placeholder={translate.nameForNewTodo}
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
        />

        <button
          className={classNames(
            "modalWindow__button",
            { "modalWindow__button--dark": theme === 'DARK' }
          )}
          onClick={createNewTodoHandler}
          disabled={newTodoTitle.length < 5}
        >
          {translate.btnCreateLabel}
        </button>
      </div>
    </div>
  );
};
