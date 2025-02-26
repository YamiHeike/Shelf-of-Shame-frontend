import { FormFieldError } from "../types";

export const getValidationErrorMessage = (
  data: FormFieldError,
  fieldName: string
): string | null => {
  let err;
  if (data.errors) {
    err = data.errors.find((error) => error.field === fieldName);
  }
  return err ? err.message : null;
};
