export const onChangeEmailHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
) => {
  const inputValue = e.target.value;
  const allowedLocalPartChars = /^[a-zA-Z0-9._%+-]*$/;
  const allowedDomainPartChars = /^[a-zA-Z0-9.-]*$/;

  let filteredValue = '';
  let atIndex = inputValue.indexOf('@');
  let dotCount = 0;

  for (let i = 0; i < inputValue.length; i++) {
    const char = inputValue[i];
    const isLocalPart = i < atIndex;

    if (char === '.') {
      if (!isLocalPart) {
        dotCount++;

        if (dotCount > 1) {
          break;
        }
      }
    }

    if (i === atIndex) {
      filteredValue += char;
    } else if ((isLocalPart && allowedLocalPartChars.test(char)) || (!isLocalPart && allowedDomainPartChars.test(char))) {
      filteredValue += char;
    } else {
      break;
    }
  }

  setValue(filteredValue);
}