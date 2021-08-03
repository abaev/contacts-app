// Добавление контакта

import { useState } from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  Box,
  CircularProgress 
} from '@material-ui/core/';
import EmailInput from '@/components/contacts/EmailInput';
import PhoneInput from '@/components/contacts/PhoneInput';
import contactsAPI from '@/services/ContactsAPI';

function AddContact({ userID, type, onAdd, onCancelClick }) {
  let [isProcessing, setIsProcessing] = useState(false);

  function addEmail(event) {
    addContact({
      type: 'email',
      contact: event.email,
      userID: userID
    });
  }
  
  function addPhone(event) {
    addContact({
      type: 'phone',
      contact: event.normalized,
      countryCode: event.countryCode,
      userID: userID
    });
  }
  
  // Добавляем контакт, сообщаем родительскому
  // компоненту об успехе или неудаче
  function addContact(contact) {
    setIsProcessing(true);

    contactsAPI.add(contact)
      .then(response => {
        onAdd({ type: 'success' });
      })
      .catch(error => {
        console.error(error);
        onAdd({
          type: 'error',
          error,
          message: 'Не удалось добавить контакт'
        });
      })
  }

  return (
    <Dialog onClose={onCancelClick} open={true}>
      <DialogTitle>
        Добавить
        {type === 'email' && ' e-mail'}
        {type === 'phone' && ' телефон'}
      </DialogTitle>
      
      <DialogContent>
        <Box pb={3} display="flex" justifyContent="center">
          {(type === 'email' && !isProcessing)
            &&
            <EmailInput onInput={addEmail}
              onCancelClick={onCancelClick} />
          }
          {(type === 'phone' && !isProcessing)
            && 
            <PhoneInput onInput={addPhone}
              onCancelClick={onCancelClick} />
          }

          {/* Спиннер во время обработки запроса */}
          {isProcessing
            &&
            <CircularProgress />
          }
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddContact;
