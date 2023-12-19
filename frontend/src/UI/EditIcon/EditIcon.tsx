import classNames from "classnames";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from 'react';
import './EditIcon.scss';

interface Props {
  closeModalWin?: () => void; 
}

export const EditIcon: React.FC<Props> = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(
        'icon-edit',
        { "icon-edit--dark": theme === 'DARK' }
      )}
    >
      <path d="M9.21539 5L9.99861 5.78333L2.433 13.3333H1.66644V12.5667L9.21539 5ZM12.215 0C12.0067 0 11.79 0.0833333 11.6317 0.241667L10.1069 1.76667L13.2315 4.89167L14.7563 3.36667C15.0812 3.04167 15.0812 2.5 14.7563 2.19167L12.8066 0.241667C12.6399 0.075 12.4316 0 12.215 0ZM9.21539 2.65833L0 11.875V15H3.12457L12.34 5.78333L9.21539 2.65833Z" />
    </svg>
  );
};
