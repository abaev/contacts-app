// Список контактов пользователя

import React, { useState, useEffect } from 'react';
import {
  Switch,
  Redirect,
  useParams
} from "react-router-dom";
import {
  Grid,
  Box,
  Snackbar,
  TextField,
  InputAdornment
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FilterListIcon from '@material-ui/icons/FilterList';
import contactsAPI from '@/services/ContactsAPI';
import Contact from '@/components/contacts/Contact';
import AddContact from '@/components/contacts/AddContact';
import TypesSpeedDial from '@/components/contacts/TypesSpeedDial';
import phoneService from '@/services/PhoneService';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ContactsList() {
  let { userID } = useParams();
  let [redirect, setRedirect] = useState(false);
  let [contacts, setContacts] = useState([]);
  let [filteredContacts, setFilteredContacts] = useState([]);
  let [apiError, setApiError] = useState('');
  // Тип добавляемого контакта 'phone' || 'email' || ''
  let [addingContact, setAddingContact] = useState('');

  // ID редактируемого контакта, чтотбы нельзя было редактировать
  // одновременно несколько контактов
  let [editingContactID, setEditingContactID] = useState(null);
  let [filterValue, setFilterValue] = useState('');

  // Запрашиваем контакты после монтирования компонента
  useEffect(() => getContacts(), []);

  // Запускаем фильтрацию контактов при их изменении,
  // или при изменении фильтра
  useEffect(() => filterContacts(), [contacts, filterValue]);

  function getContacts() {
    contactsAPI.get({ userID })
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        handleContactCRUD({
          type: 'error',
          error,
          message: 'Не удалось получить контакты'
        });
        // В случае если не авторизованы перенаправляем на вход
        // setRedirect(true);
      });
  }

  function filterContacts() {
    if(!filterValue) {
      // Если не ввели фильтр
      setFilteredContacts(contacts);
      return;
    }

    let filtered = contacts.filter(c => {
      if(c.type === 'email') {
        return c.contact.startsWith(filterValue);
      }

      if(c.type === 'phone') {
        let national = phoneService.formatNational({
          phone: c.contact,
          countryCode: c.countryCode
        });

        let normalized = phoneService.normalize({
          phone: c.contact,
          countryCode: c.countryCode
        });

        return (national && national.startsWith(filterValue))
          || (normalized && normalized.startsWith(filterValue));
      }
    });

    setFilteredContacts(filtered);
  }

  // Обработка CRUD операций с контактами
  function handleContactCRUD(event) {
    setApiError('');

    // Закрываем диалог добавления контакта
    // (на случай, если было открыто)
    setAddingContact('');

    // Закрываем редактирование контакта
    // (на случай, если было открыто)
    setEditingContactID(null);

    if(event.type === 'success') {
      // Обновляем список контактов в случае успеха
      getContacts();
    
    } else if(event.error.response
      && event.error.response.status === 401) {
        setRedirect(true);
        
      } else setApiError(event.message || 'Ошибка');
  }

  function handleCloseApiError(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setApiError('');
  }

  return (
    <div>
      <Box p={1} display="flex" minHeight="95vh">
        <Grid container 
          justifyContent="center">
          <Grid item xs={12} sm={6} md={3} xl={2}
            style={{position: 'relative'}}>

            {/* Сообщение об ошибке */}
            <Snackbar open={!!apiError} 
              onClose={handleCloseApiError}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <Alert onClose={handleCloseApiError} severity="error">
                {apiError}
              </Alert>
            </Snackbar>

            <TextField label="Фильтр"
              fullWidth variant="outlined" 
              margin="dense"
              name="filter"
              onChange={(event) => setFilterValue(event.target.value)}
              value={filterValue}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                ),
              }} />

            {filteredContacts.map(c =>{
              return (
                <Box key={c.id} mb={1}>
                  <Contact contact={c}
                    editingID={editingContactID}
                    onDeleteClick={handleContactCRUD}
                    onEditClick={() => setEditingContactID(c.id)}
                    onCancelEditClick={() => setEditingContactID(null)}
                    onEdit={handleContactCRUD} />
                </Box>
              );
            })}

            {addingContact
              &&
              <AddContact type={addingContact} userID={userID}
                onAdd={handleContactCRUD}
                onCancelClick={() => setAddingContact('')}/>
            }

            {/* Добавить контакт */}
            <TypesSpeedDial
              onTypeSelect={(event) => setAddingContact(event)}/>
          </Grid>
        </Grid>
      </Box>

      {/* Редирект на Вход */}
      {redirect
        &&
        <Switch>
          <Redirect to="/login" />
        </Switch>
      }
    </div>
  );
}

export default ContactsList;

