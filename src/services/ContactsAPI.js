// CRUD сервис контактов

import axios from 'axios';
import buildQuery from '@/services/BuildQuery';

const apiURL = 'http://localhost:3001';

const contactsAPI = {
  // Получаем все контакты пользователя
  get({ userID }) {
    return axios({
      method: 'GET',
      url: `${apiURL}/contacts/${buildQuery({ userID })}`,
      withCredentials: true
    });
  },

  // Добавляем контакт
  add(contact) {
    return axios({
      method: 'POST',
      url: `${apiURL}/contacts/`,
      data: contact,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
  },

  // Удаляем контакт
  delete(contactID) {
    return axios({
      method: 'DELETE',
      url: `${apiURL}/contacts/${contactID}`,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
  },
  
  // Изменяем контакт
  change(contact) {
    return axios({
      method: 'PUT',
      url: `${apiURL}/contacts/${contact.id}`,
      data: contact,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export default contactsAPI;