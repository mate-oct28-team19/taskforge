const numbers = '1234567890';

export function typingCodeHandler(
  e: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<string>>,
) {
  if (e.target.value.length < 2) {
    numbers.includes(e.target.value) && setter(e.target.value);
  }
};