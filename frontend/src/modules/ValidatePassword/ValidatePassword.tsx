import { useContext, useEffect, useState } from "react";
import './ValidatePassword.scss'
import { ThemeContext } from "../../contexts/ThemeContext";
import { LangContext } from "../../contexts/LangContext";
import classNames from "classnames";
import { translator } from "../../translator";

interface Props {
  password: string;
  setPasswordIsOk: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ValidatePassword: React.FC<Props> = ({ password, setPasswordIsOk }) => {
  const SPEC_CHARS = '!@#$%^&*()_+-={}[]:;"\'`,./<>?~';

  const [lengthIsOk, setLengthIsOk] = useState(false);
  const [capitalLetterExists, setCapitalLetterExists] = useState(false);
  const [numberExists, setNumberExists] = useState(false);
  const [specSymbolExists, setSpecSymbolExists] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const translate = translator[lang].passwordValidation

  useEffect(() => {
    const nums = parseInt(password.replace(/[^\d]/g, ''));

    if (nums) {
      setNumberExists(true);
    } else {
      setNumberExists(false);
    }

    if (password.length > 7 && password.length < 41) {
      setLengthIsOk(true);
    } else {
      setLengthIsOk(false);
    }

    if (password.toLowerCase() !== password) {
      setCapitalLetterExists(true);
    } else {
      setCapitalLetterExists(false);
    }

    if (password.length === 0) {
      setSpecSymbolExists(false);
    } else {
      for (const ch of password) {
        if (SPEC_CHARS.includes(ch) && ch !== '') {
          setSpecSymbolExists(true);
  
          break;
        } else {
          setSpecSymbolExists(false);
        }
      }
    }

    if ( lengthIsOk && capitalLetterExists && numberExists && specSymbolExists ) {
      setPasswordIsOk(true)
    } else {
      setPasswordIsOk(false)
    }
  }, [capitalLetterExists, lengthIsOk, numberExists, password, setPasswordIsOk, specSymbolExists])

  return (
    <div className={classNames(
      "password-validation",
      { "password-validation--dark": theme === 'DARK' }
    )}>
      <p className={classNames(
        "password-validation__requirement",
        { "password-validation__requirement--dark": theme === 'DARK' }
      )}>
        { lengthIsOk ? '✅' : '❌' } { translate.lengthLabel }
      </p>

      <p className={classNames(
        "password-validation__requirement",
        { "password-validation__requirement--dark": theme === 'DARK' }
      )}>
        { capitalLetterExists ? '✅' : '❌' } { translate.capitalCharLabel }
      </p>

      <p className={classNames(
        "password-validation__requirement",
        { "password-validation__requirement--dark": theme === 'DARK' }
      )}>
        { numberExists ? '✅' : '❌' } { translate.numberLabel }
      </p>

      <p className={classNames(
        "password-validation__requirement",
        { "password-validation__requirement--dark": theme === 'DARK' }
      )}>
        { specSymbolExists ? '✅' : '❌' } { translate.specCharLabel }
      </p>
    </div>
  );
}