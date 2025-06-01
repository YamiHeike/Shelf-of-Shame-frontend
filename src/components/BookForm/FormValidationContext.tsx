import { createContext, useContext } from "react";

type FormValidationContextType = {
  bookDescriptionLimit: number;
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
  const defaultValues: FormValidationContextType = {
    bookDescriptionLimit: 1500,
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
