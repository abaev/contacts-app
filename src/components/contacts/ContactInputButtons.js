// Кнопки Отмена и OK при вводе контакта

import {
  Button,
  Box
} from '@material-ui/core';

function ContactInputButtons({ onCancelClick }) {
  return (
    <Box display="inline-flex">
      <Box mr={1}>
        <Button variant="outlined"
          color="primary" disableElevation
          size="small"
          onClick={onCancelClick}>
          Отмена
        </Button>
      </Box>

      <Button variant="contained"
        color="primary" disableElevation
        size="small"
        type="submit">
        OK
      </Button>
    </Box>
  );
}

export default ContactInputButtons;