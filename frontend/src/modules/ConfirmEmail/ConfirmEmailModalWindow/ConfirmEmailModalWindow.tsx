import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import './ConfirmEmailModalWindow.scss';

import { CloseIcon } from '../../../UI/CloseIcon/CloseIcon';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { LangContext } from '../../../contexts/LangContext';
import { translator } from '../../../translator';
import { typingCodeHandler } from '../handlers/typingCodeHandler';
import { TokenContext } from '../../../contexts/TokenContext';
import { getCodeAgain } from '../api/getCodeAgainAPI';

interface Props {
  email: string;
  closeModalWin: () => void;
  codeIsValid: (code: string) => boolean;
  setConfirmCodeFromServer: React.Dispatch<React.SetStateAction<string>>;
}

export const ConfirmEmailModalWindow: React.FC<Props> = ({
  closeModalWin,
  email,
  codeIsValid,
  setConfirmCodeFromServer,
}) => {
  const [confirmCode, setConfirmCode] = useState<string>('');
  const [codeIsIncorrect, setCodeIsIncorrect] = useState<boolean>(false);
  const [counting, setCounting] = useState(59);

  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [input3, setInput3] = useState<string>('');
  const [input4, setInput4] = useState<string>('');
  const [input5, setInput5] = useState<string>('');
  const [input6, setInput6] = useState<string>('');

  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const { token, setToken } = useContext(TokenContext);

  const translate = translator[lang].modalWindowConfirmEmail;

  const refInput1 = useRef<HTMLInputElement>(null);
  const refInput2 = useRef<HTMLInputElement>(null);
  const refInput3 = useRef<HTMLInputElement>(null);
  const refInput4 = useRef<HTMLInputElement>(null);
  const refInput5 = useRef<HTMLInputElement>(null);
  const refInput6 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setConfirmCode(input1 + input2 + input3 + input4 + input5 + input6);

    !input1 && refInput1.current && refInput1.current.focus();
    input1 && refInput2.current && refInput2.current.focus();
    input2 && refInput3.current && refInput3.current.focus();
    input3 && refInput4.current && refInput4.current.focus();
    input4 && refInput5.current && refInput5.current.focus();
    input5 && refInput6.current && refInput6.current.focus();

    if(input6) {
      const codeIsValid_variable = codeIsValid(confirmCode);
      if (!codeIsValid_variable) {
        setCodeIsIncorrect(true);

        setTimeout(() => {
          setInput1('');
          setInput2('');
          setInput3('');
          setInput4('');
          setInput5('');
          setInput6('');
          setCodeIsIncorrect(false);
        }, 2000)
      } else {
        setCodeIsIncorrect(false);
      }
    }
  }, [input1, input2, input3, input4, input5, input6, confirmCode, codeIsValid]);

  interface ITimer {
    count: number;
    countID: NodeJS.Timer | null;
  
    start: () => void;
    reset: () => void;
  }
  
  const timer: ITimer = useMemo(() => {
    return {
      count: 59,
      countID: null,

      start() {
        if (this.countID !== null) {
          return;
        }

        this.countID = setInterval(() => {
          if (this.count > 0) {
            this.count = this.count - 1;
            console.log(this.count);
            setCounting(this.count);
          } else {
            clearInterval(this.countID!);
          }
        }, 1000)
      },
  
      reset() {
        if (this.countID !== null) {
          clearInterval(this.countID);
          this.countID = null;
        }

        this.count = 59;
        setCounting(59);
      }
    } as ITimer
  }, [])

  useEffect(() => {
    timer.start();
  })

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      !input6 && setInput5('');
      !input5 && setInput4('');
      !input4 && setInput3('');
      !input3 && setInput2('');
      !input2 && setInput1('');
    }
  }

  function requestCodeAgainHandler() {
    getCodeAgain(token, setToken, setConfirmCodeFromServer);
    timer.reset();
    timer.start();
  }

  return (
    <div className="confirm-email">
      <div
        className={classNames(
          'confirm-email__modal-window',
          'modal-window',
          { "modal-window--dark": theme === 'DARK' }
        )}
      >
        <CloseIcon closeModalWin={closeModalWin} />

        <p className="modal-window__label">
          {translate.label}
          <span className={
            classNames(
              'modal-window__email-label',
              { "modal-window__email-label--dark": theme === 'DARK' }
            )
          }>
            { email || 'example@gmail.com' }
          </span>
        </p>

        <form className="modal-window__form-for-code form-for-code" action="">
          <input
            type="number"
            className={classNames(
              'form-for-code__field',
              { 
                "form-for-code__field--dark": theme === 'DARK',
                "form-for-code__field--warning": codeIsIncorrect
              }
            )}
            onChange={(e) => typingCodeHandler(e, setInput1)}
            onKeyDown={onKeyDownHandler}
            value={input1}
            ref={refInput1}
            disabled={codeIsIncorrect}
            inputMode="numeric"
          />

          <input
            type="number"
            className={classNames(
              'form-for-code__field',
              { 
                "form-for-code__field--dark": theme === 'DARK',
                "form-for-code__field--warning": codeIsIncorrect
              }
            )}
            onChange={(e) => typingCodeHandler(e, setInput2)}
            onKeyDown={onKeyDownHandler}
            value={input2}
            ref={refInput2}
            disabled={codeIsIncorrect}
            inputMode="numeric"
          />

          <input
            type="number"
            className={classNames(
              'form-for-code__field',
              { 
                "form-for-code__field--dark": theme === 'DARK',
                "form-for-code__field--warning": codeIsIncorrect
              }
            )}
            onChange={(e) => typingCodeHandler(e, setInput3)}
            onKeyDown={onKeyDownHandler}
            value={input3}
            ref={refInput3}
            disabled={codeIsIncorrect}
            inputMode="numeric"
          />

          <input
            type="number"
            className={classNames(
              'form-for-code__field',
              { 
                "form-for-code__field--dark": theme === 'DARK',
                "form-for-code__field--warning": codeIsIncorrect
              }
            )}
            onChange={(e) => typingCodeHandler(e, setInput4)}
            onKeyDown={onKeyDownHandler}
            value={input4}
            ref={refInput4}
            disabled={codeIsIncorrect}
            inputMode="numeric"
          />
          
          <input
            type="number"
            className={classNames(
              'form-for-code__field',
              { 
                "form-for-code__field--dark": theme === 'DARK',
                "form-for-code__field--warning": codeIsIncorrect
              }
            )}
            onChange={(e) => typingCodeHandler(e, setInput5)}
            onKeyDown={onKeyDownHandler}
            value={input5}
            ref={refInput5}
            disabled={codeIsIncorrect}
            inputMode="numeric"
          />

          <input
            type="number"
            className={classNames(
              'form-for-code__field',
              { 
                "form-for-code__field--dark": theme === 'DARK',
                "form-for-code__field--warning": codeIsIncorrect
              }
            )}
            onChange={(e) => typingCodeHandler(e, setInput6)}
            onKeyDown={onKeyDownHandler}
            value={input6}
            ref={refInput6}
            disabled={codeIsIncorrect}
            inputMode="numeric"
          />
        </form>

        <p className="modal-window__timer">
          { counting > 0 && `00:${counting.toString().length === 1 ? `0${counting}` : counting}` }
        </p>

        {counting === 0 && (<button
          type="button"
          className={classNames(
            'modal-window__send-code-again',
            { "modal-window__send-code-again--dark": theme === 'DARK' }
          )}
          onClick={requestCodeAgainHandler}
        >
          {translate.sendCodeAgain}
        </button>)}
      </div>
    </div>
  );
};
