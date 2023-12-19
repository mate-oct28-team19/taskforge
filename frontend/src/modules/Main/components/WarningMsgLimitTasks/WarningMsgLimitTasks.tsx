import { useContext, useEffect, useState } from 'react';
import './WarningMsgLimitTasks.scss';
import classNames from 'classnames';
import { LangContext } from '../../../../contexts/LangContext';
import { ThemeContext } from '../../../../contexts/ThemeContext';

export const WarningMsgLimitTasks: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [render, setRender] = useState(false);
  const { lang } = useContext(LangContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      setRender(true)
    }, 50);

    setTimeout(() => {
      setRender(false)
    }, 4000);

    setTimeout(() => {
      closeModal();
    }, 5000);
  }, [closeModal]);

  const translate = {
    'ENGLISH': 'Unfortunately, there is a tasks limit. You can\'t create more than 20 tasks. To create a new task, you need to delete at least 1 task.',
    'UKRAINIAN': 'На жаль, є ліміт завдань. Ви не можете створити більше 20 завдань. Щоб створити нове, потрібно видалити хоча б 1 завдання.',
    'POLISH': 'Niestety istnieje limit zadań. Nie możesz utworzyć więcej niż 20 zadań. Aby utworzyć nowe, musisz usunąć co najmniej 1 zadanie.'
  }

  return (
    <div className={classNames(
      "warning-msg",
      { "warning-msg--render": render}
    )}>
      <div className={classNames(
        "warning-msg-modal",
        { "warning-msg-modal--render": render },
        { "warning-msg-modal--dark": theme === 'DARK' }
      )}>
        <p className={classNames(
          "warning-msg-modal__label",
          { "warning-msg-modal__label--dark" : theme === 'DARK' }
        )}>
          { translate[lang] }
        </p>
      </div>
    </div>
  );
};
