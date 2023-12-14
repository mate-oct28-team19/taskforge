import { useContext } from 'react';
import classNames from 'classnames';
import './ModalChangeTodo.scss';

import { CloseIcon } from '../../../../UI/CloseIcon/CloseIcon';

import { ThemeContext } from '../../../../contexts/ThemeContext';
import { LangContext } from '../../../../contexts/LangContext';
import { translator } from '../../../../translator';

interface Props {
  closeModalWin: () => void;
  changedTodoTitle: string;
  setChangedTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  changeTodo: () => void;
}

export const ModalChangeTodo: React.FC<Props> = ({
  closeModalWin,
  changedTodoTitle,
  setChangedTodoTitle,
  changeTodo,
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
