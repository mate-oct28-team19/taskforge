import classNames from 'classnames';
import { CloseIcon } from '../../../../UI/CloseIcon/CloseIcon';
import './ConfirmOperation.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { LangContext } from '../../../../contexts/LangContext';

interface Props {
  callbackConfirm: () => void;
  closeModalWin: () => void;
}

export const ConfirmOperation: React.FC<Props> = ({ callbackConfirm, closeModalWin }) => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const yesLalel = (lang === 'ENGLISH' && 'Yes')
  || (lang === 'UKRAINIAN' && 'Так')
  || (lang === 'POLISH' && 'Tak');

  const label = (lang === 'ENGLISH' && 'Are you sure?')
  || (lang === 'UKRAINIAN' && 'Ти справді хочеш видалити?')
  || (lang === 'POLISH' && 'Czy naprawdę chcesz usunąć?');

  return (
    <div className="confirm-operation">
      <div className={classNames(
        "confirm-operation__modalwindow",
        "modalwindow",
        { "modalwindow--dark": theme === 'DARK' }
      )}>
        <header className="modalwindow__header">
          <CloseIcon closeModalWin={() => closeModalWin()} />
        </header>

        <p className={classNames(
          "modalwindow__label",
          { "modalwindow__label--dark": theme === 'DARK' }
          )}
        >
          { label }
        </p>
        <button className={classNames(
            "modalwindow__button",
            { "modalwindow__button--dark": theme === 'DARK' }
          )}
          onClick={callbackConfirm}
        >
          { yesLalel }
        </button>
      </div>
    </div>
  );
}