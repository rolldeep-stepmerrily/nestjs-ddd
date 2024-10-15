export const UnknownError = {
  UnexpectedError: 'Unexpected error',
};

export const EmailError = {
  EmailIsRequired: 'Email is required',
  InvalidEmail: 'Invalid email',
  DuplicateEmail: 'Duplicate email',
};

export const NameError = {
  NameIsRequired: 'Name is required',
  InvalidName: 'Invalid name',
} as const;

export const PasswordError = {
  PasswordIsRequired: 'Password is required',
  InvalidPassword: 'Invalid password',
} as const;
