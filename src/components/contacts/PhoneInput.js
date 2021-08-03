// Ввод телефона

import { useState } from 'react';
import { Box } from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import phoneService from '@/services/PhoneService';
import ContactInputButtons from '@/components/contacts/ContactInputButtons';

function PhoneInput({
  number,
  countryCode,
  onInput,
  onCancelClick
}) {
  let [phone, setPhone] = useState({
    number: number || '',
    countryCode: countryCode || 'RU'
  });

  let [inputError, setInputError] = useState('');

  function handleOnChange(phone, country) {
    setInputError('');

    setPhone({
      number: phone,
      countryCode: country.countryCode.toUpperCase()
    });
  }
  
  function handleSubmit(event) {
    // Нормализуем номер и отправляем выше,
    // если не удалось нормализовать - выводим ошибку
    const normalized = phoneService.normalize({
      phone: phone.number,
      countryCode: phone.countryCode
    });
    
    if(normalized) {
      onInput({ normalized, countryCode: phone.countryCode });
    
    } else {
      setInputError('Некорректный номер телефона');
    }

    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <MuiPhoneNumber
        defaultCountry={countryCode?.toLowerCase || 'ru'}
        value={phone.number}
        error={!!inputError}
        helperText={inputError}
        onChange={handleOnChange}
        fullWidth variant="outlined"
        margin="dense"/>
      
      <Box display="flex"
        justifyContent="flex-end">
        <ContactInputButtons onCancelClick={onCancelClick} />
      </Box>
    </form>
  );
}

export default PhoneInput;