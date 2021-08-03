// Кнопки редактировать и удалить

import {
  Box,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function ContactButtons({
  isDeleting,
  onEditClick,
  onDeleteClick
}) {
  return (
    <Box display="inline-flex">
      <Box mr={1}>
        <IconButton size="small"
          onClick={() => isDeleting ? null : onEditClick()}>
          {isDeleting
            ? <CircularProgress size={20} />
            : <EditIcon />
          }
        </IconButton>
      </Box>

      <IconButton size="small"
        onClick={() => isDeleting ? null : onDeleteClick()}>
        {isDeleting
          ? <CircularProgress size={20} />
          : <DeleteIcon />
        }
      </IconButton>
    </Box>
  );
}

export default ContactButtons;