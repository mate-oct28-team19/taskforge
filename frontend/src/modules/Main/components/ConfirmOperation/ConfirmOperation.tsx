import classNames from 'classnames';
import { CloseIcon } from '../../../../UI/CloseIcon/CloseIcon';
import './ConfirmOperation.scss';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../contexts/ThemeContext';
import { LangContext } from '../../../../contexts/LangContext';

interface Props {
  callbackConfirm: () => void;
  closeModalWin: () => void;
}

export const ConfirmOperation: React.FC<Props> = ({ callbackConfirm, closeModalWin }) => {
  const [render, setRender] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const yesLabel = (lang === 'ENGLISH' && 'Yes')
  || (lang === 'UKRAINIAN' && 'Так')
  || (lang === 'POLISH' && 'Tak');

  const label = (lang === 'ENGLISH' && 'Are you sure?')
  || (lang === 'UKRAINIAN' && 'Ти справді хочеш видалити?')
  || (lang === 'POLISH' && 'Czy naprawdę chcesz usunąć?');

  const closeHandler = () => {
    setRender(false);

    setTimeout(() => {
      closeModalWin()
    }, 1000)
  };

  const callbackConfirmHandler = () => {
    setRender(false);
    callbackConfirm();
  }

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 50);
  }, [setRender]);

  return (
    <div className={classNames(
      "confirm-operation",
      { "confirm-operation--render": render }
    )}>
      <div className={classNames(
        "confirm-operation__modalwindow",
        "modalwindow",
        { "modalwindow--dark": theme === 'DARK' },
        { "modalwindow--render": render }
      )}>
        <header className="modalwindow__header">
          <CloseIcon closeModalWin={() => closeHandler()} />
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
          onClick={callbackConfirmHandler}
        >
          { yesLabel }
        </button>
      </div>
    </div>
  );
}