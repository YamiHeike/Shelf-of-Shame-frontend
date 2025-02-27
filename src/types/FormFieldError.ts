export type FormFieldError = {
  message: string;
  errors?: ValidationError[];
};

export type ValidationError = {
  field: string;
  message: string;
};
