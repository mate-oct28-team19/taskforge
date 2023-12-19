import classNames from "classnames";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from 'react';
import './DeleteIcon.scss';

interface Props {
  onClickFunc: () => void; 
}

export const DeleteIcon: React.FC<Props> = ({ onClickFunc }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(
        'icon-delete',
        { "icon-delete--dark": theme === 'DARK' }
      )}
      onClick={onClickFunc}
    >
      <path d="M9.75 1.86667V3.2H12.1875C12.403 3.2 12.6097 3.28429 12.762 3.43431C12.9144 3.58434 13 3.78783 13 4C13 4.21217 12.9144 4.41566 12.762 4.56569C12.6097 4.71571 12.403 4.8 12.1875 4.8H0.8125C0.597012 4.8 0.390349 4.71571 0.237976 4.56569C0.0856023 4.41566 0 4.21217 0 4C0 3.78783 0.0856023 3.58434 0.237976 3.43431C0.390349 3.28429 0.597012 3.2 0.8125 3.2H3.25V1.86667C3.25 0.836267 4.09933 0 5.14583 0H7.85417C8.90067 0 9.75 0.836267 9.75 1.86667ZM2.704 7.12L3.419 14.16C3.42572 14.2258 3.45705 14.2868 3.5069 14.3312C3.55675 14.3755 3.62156 14.4001 3.68875 14.4H9.31125C9.37844 14.4001 9.44325 14.3755 9.4931 14.3312C9.54295 14.2868 9.57428 14.2258 9.581 14.16L10.296 7.12C10.3229 6.91336 10.4305 6.72519 10.5961 6.5955C10.7617 6.46581 10.9721 6.40483 11.1827 6.42553C11.3932 6.44623 11.5872 6.54698 11.7235 6.70635C11.8598 6.86572 11.9275 7.07114 11.9123 7.27893L11.1973 14.3189C11.1511 14.7797 10.9323 15.207 10.5837 15.5178C10.2351 15.8285 9.7815 16.0004 9.31125 16H3.68875C3.21881 15.9999 2.76564 15.828 2.41714 15.5176C2.06864 15.2072 1.84966 14.7804 1.80267 14.32L1.08767 7.28C1.0741 7.17408 1.0822 7.06656 1.11149 6.96377C1.14078 6.86098 1.19067 6.765 1.25822 6.68149C1.32577 6.59798 1.40961 6.52863 1.50481 6.47752C1.6 6.42641 1.70462 6.39458 1.8125 6.3839C1.92039 6.37322 2.02935 6.38391 2.13297 6.41534C2.23659 6.44677 2.33278 6.4983 2.41586 6.5669C2.49894 6.6355 2.56723 6.71978 2.61672 6.81477C2.66621 6.90976 2.69588 7.01354 2.704 7.12ZM4.875 1.86667V3.2H8.125V1.86667C8.125 1.79594 8.09647 1.72811 8.04568 1.6781C7.99488 1.6281 7.926 1.6 7.85417 1.6H5.14583C5.074 1.6 5.00512 1.6281 4.95433 1.6781C4.90353 1.72811 4.875 1.79594 4.875 1.86667Z" />
    </svg>
  );
};
