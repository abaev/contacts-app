// Контакт (телефон или e-mail) с кнопками Редактировать и Удалить 

import { useState } from 'react';
import {
  Typography,
  Box
} from '@material-ui/core';
import phoneService from '@/services/PhoneService';
import ContactButtons from '@/components/contacts/ContactButtons';
import contactsAPI from '@/services/ContactsAPI';
import EditContact from '@/components/contacts/EditContact';
import React from 'react';

function Contact({
  contact,
  editingID,
  onDeleteClick,
  onEditClick,
  onCancelEditClick,
  onEdit
}) {
  let [isDeleting, setIsDeleting] = useState(false);

  function deleteContact() {
    setIsDeleting(true);

    contactsAPI.delete(contact.id)
      .then(response => {
        onDeleteClick({ type: 'success' });
      })
      .catch(error => {
        console.error(error);
        onDeleteClick({
          type: 'error',
          error,
          message: 'Не удалось удалить контакт'
        });
      })
      .finally(() => setIsDeleting(false));
  }

  return (
    <React.Fragment>
      {editingID !== contact.id
        ?
        <Box display="flex" justifyContent="space-between"
          alignItems="center" width={1}>
          <Typography component="span" variant="body2">
            {contact.type === 'phone'
              // Контакт - телефон
              ? phoneService.formatNational({
                  phone: contact.contact,
                  countryCode: contact.countryCode
                })

              // Контакт - email
              : contact.contact
            }
          </Typography>
        
          <ContactButtons isDeleting={isDeleting}
            onDeleteClick={deleteContact}
            onEditClick={onEditClick} />
        </Box>
        :
        <EditContact contact={contact}
          onCancelClick={onCancelEditClick}
          onEdit={onEdit} />
      }
    </React.Fragment>
  );
}

export default Contact;