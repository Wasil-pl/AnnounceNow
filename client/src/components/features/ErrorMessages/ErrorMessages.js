import { FormHelperText } from '@mui/material';

export const errorMessages = {
  required: 'This field is required',
  requiredFile: 'Please add a picture',
  selectCategory: 'Please select an option',
  enterInput: "This input can't be empty",
  dateFormat: 'Invalid date format. Please enter a date in the format dd-mm-yyyy.',
  textPattern: 'This field can contain only letters, numbers, spaces and special characters: . , - _ ( )',
  validatePrice: 'Invalid price, can contain only numbers and . ,',
  validateFile: 'Invalid file type',
  validatePhoneNumber: 'Invalid phone number, mast contain 9 digits',
  maxLength: (maxLength) => `This field can contain max ${maxLength} characters`,
};

export const Error = ({ children }) => (
  <FormHelperText error={true} variant="outlined" sx={{ mt: 2 }}>
    {children}
  </FormHelperText>
);

export const patterns = {
  textPattern: /^[a-zA-Z1-9 .,\-_()]*$/,
  titleMaxLength: 50,
  contentMaxLength: 1000,
  validatePhoneNumber: /^\d{9}$/,
  validatePrice: /^[1-9\d.,]+$/,
  acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg'],
};
