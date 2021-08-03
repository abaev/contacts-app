// Ввод e-mail

import {
  Box,
  TextField,
  InputAdornment
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import { useFormik } from 'formik';
import ContactInputButtons from '@/components/contacts/ContactInputButtons';

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Введите e-mail';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный e-mail';
  }

  return errors;
};

function EmailInput({ email, onInput, onCancelClick }) {
  const formik = useFormik({
    initialValues: {
      email: email || ''
    },
    validate,
    onSubmit: values => {
      // E-mail корректный, передаем наверх
      onInput(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField label="Email"
        fullWidth variant="outlined" 
        margin="dense"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={!!(formik.touched.email
          && formik.errors.email)}
        helperText={formik.touched.email
          ? formik.errors.email : ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }} />
      <Box display="flex"
        justifyContent="flex-end">
        <ContactInputButtons onCancelClick={onCancelClick} />
      </Box>
    </form>
  );
}

export default EmailInput;