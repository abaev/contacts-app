import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';

const phoneService = {
  // Форматируем телефон в национальный формат,
  // если это невозможно, возвращаем неизменным
  formatNational({ phone, countryCode }) {
    const phoneNumber =
      parsePhoneNumberFromString(phone, countryCode);
    
    if(phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.formatNational();
    
    } else return phone;
  },

  // Приводим телефон к формату E.164
  normalize({ phone, countryCode }) {
    const parsed = parsePhoneNumberFromString(phone, countryCode);

    if(parsed && parsed.isValid()) {
      return parsed.format('E.164');
    
    } else return null;
  }
}

export default phoneService;