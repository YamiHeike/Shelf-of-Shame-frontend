import { FormAlert } from "../FormAlert";

type ValidatedFieldProps = {
  children: React.ReactNode;
  errorMsg?: string | null;
};

export const ValidatedField = ({ children, errorMsg }: ValidatedFieldProps) => {
  return (
    <>
      {children}
      {errorMsg && <FormAlert errorMsg={errorMsg} />}
    </>
  );
};
