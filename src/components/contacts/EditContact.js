// Редактирование контакта

import { useState } from 'react';
import {
  Box,
  CircularProgress 
} from '@material-ui/core/';
import EmailInput from '@/components/contacts/EmailInput';
import PhoneInput from '@/components/contacts/PhoneInput';
import contactsAPI from '@/services/ContactsAPI';

function EditContact({
  contact,
  onCancelClick,
  onEdit
}) {
  let [isProcessing, setIsProcessing] = useState(false);

  // Изменяем контакт
  function editContact(event) {
    setIsProcessing(true);

    let edited = {};
    if(event.normalized) {
      // Редактировали телефон
      Object.assign(edited, contact, {
        contact: event.normalized,
        countryCode: event.countryCode
      });
      
      // Редактировали e-mail
    } else {
      Object.assign(edited, contact, {
        contact: event.email
      });
    }

    contactsAPI.change(edited)
      .then(response => {
        onEdit({ type: 'success' });
      })
      .catch(error => {
        console.error(error);
        onEdit({
          type: 'error',
          error,
          message: 'Не удалось изменить контакт'
        });
      })
  }

  return (
    <Box display="flex" width={1} justifyContent="center">
      {(contact.type === 'email' && !isProcessing)
        &&
        <EmailInput email={contact.contact}
          onInput={editContact}
          onCancelClick={onCancelClick} />
      }
      {(contact.type === 'phone' && !isProcessing)
        && 
        <PhoneInput number={contact.contact}
          countryCode={contact.countryCode}
          onInput={editContact}
          onCancelClick={onCancelClick} />
      }

      {isProcessing
        &&
        <CircularProgress />
      }
    </Box>
  );
}

export default EditContact;
