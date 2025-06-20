import { createContext, useContext, useState } from "react";
import { FormFieldError } from "../../types";
import { getValidationErrorMessage } from "../../utils";

type FormValidationContextType = {
  bookDescriptionLimit: number;
  errors: FormFieldError | null;
  sendErrors: (errorObj: FormFieldError) => void;
  clearErrors: () => void;
  getFieldErrorMessage: (fieldName: string) => string | null;
};

const FormValidationContext = createContext<
  FormValidationContextType | undefined
>(undefined);

type FormValidationContextProviderProps = {
  children: React.ReactNode;
};

export const FormValidationContextProvider = ({
  children,
}: FormValidationContextProviderProps) => {
  const [errors, setErrors] = useState<FormFieldError | null>(null);

  const sendErrors = (errorObj: FormFieldError): void => {
    setErrors(errorObj);
  };

  const clearErrors = (): void => {
    setErrors(null);
  };

  const getFieldError = (fieldName: string) => {
    if (!errors) return null;
    return getValidationErrorMessage(errors, fieldName);
  };

  const defaultValues: FormValidationContextType = {
    bookDescriptionLimit: 1500,
    errors,
    sendErrors,
    clearErrors,
    getFieldErrorMessage: getFieldError,
  };

  return (
    <FormValidationContext.Provider value={defaultValues}>
      {children}
    </FormValidationContext.Provider>
  );
};

export const useFormValidationContext = () => {
  const context = useContext(FormValidationContext);
  if (!context) {
    throw new Error(
      "FormValidationContext can be used only within FormValidationContextProvider with valid FormValidationContextType value"
    );
  }
  return context;
};
