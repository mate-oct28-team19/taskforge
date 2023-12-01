export const onChangePasswordFieldHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
) => {
  setValue(e.target.value)
};
