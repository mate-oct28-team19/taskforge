import classNames from "classnames";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from 'react';
import './CloseIcon.scss';

interface Props {
  closeModalWin?: () => void; 
}

export const CloseIcon: React.FC<Props> = (props) => {
  const closeWin = props?.closeModalWin || (() => {});
  const { theme } = useContext(ThemeContext);

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(
        'icon-close',
        { "icon-close--dark": theme === 'DARK' }
      )}
      onClick={() => closeWin()}
    >
      <path d="M19.8 2.82L12.72 9.9L19.8 16.98L16.98 19.8L9.9 12.74L2.84 19.8L0 16.96L7.06 9.9L0 2.84L2.84 0L9.9 7.06L16.98 0L19.8 2.82Z" />
    </svg>
  );
}