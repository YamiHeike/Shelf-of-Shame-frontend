import { FormFieldError } from "../types";

/**
 * Retrieves validation error messages returned by the back-end
 * @param data - FormFieldError object
 * @param fieldName - Form.Item field name
 * @returns validation error
 */
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
