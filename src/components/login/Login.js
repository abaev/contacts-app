// Вход

import React, { useState } from 'react';
import {
  Switch,
  Redirect
} from "react-router-dom";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useFormik } from 'formik';
import loginAPI from '@/services/LoginAPI';

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Введите имя';
  } 

  if (!values.password) {
    errors.password = 'Введите пароль';
  } else if (values.password.match(/\s/)) {
    errors.password = 'Пароль не может содержать пробелы';
  }

  return errors;
};

function Login() {
  let [showPassword, setShowPassword] = useState(false);
  let [loginError, setLoginError] = useState('');
  let [userID, setUserID] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      setLoginError('');
      loginAPI(values).then(response => {
        console.log(response);
        setUserID(response.data.userID);
      })
      .catch(error => {
        if(error.response && error.response.status === 401) {
          setLoginError('Неверное имя пользователя или пароль');
        } else setLoginError('Что-то пошло не так');
      });
    },
  });

  return (
    <div>
      <Box p={1} display="flex"
        minHeight="95vh">
        <Grid container 
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12} sm={6} md={3} xl={2}>
            <Card variant="outlined">
              <CardContent display="flex">
                <Box>
                  <Typography component="h5" variant="h5">
                    Вход
                  </Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                  <TextField label="Имя пользователя"
                    fullWidth variant="outlined" 
                    margin="normal"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={!!(formik.touched.name
                      && formik.errors.name)}
                    helperText={formik.touched.name
                      ? formik.errors.name : ''} />

                  <TextField label="Пароль"
                    fullWidth variant="outlined"
                    margin="normal"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={!!(formik.touched.password
                      && formik.errors.password)}
                    helperText={formik.touched.password
                      ? formik.errors.password : ''}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword
                            ?
                            <VisibilityIcon />
                            :
                            <VisibilityOffIcon />
                          }
                        </IconButton>
                      </InputAdornment>
                    )}} />
                  
                  {/* Сообщение о неудачном входе */}
                  <Box mt={2}>
                    <Typography component="p" variant="caption"
                      color="error" mt={2}>
                      {loginError}
                    </Typography>
                  </Box>

                  {/* Кнопка Войти */}
                  <Box display="flex" mt={2}
                    justifyContent="flex-end">
                    <Button variant="contained"
                      color="primary" disableElevation
                      size="large"
                      type="submit">
                      Войти
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Переходим в контакты после удачной авторизации */}
      {userID
        &&
        <Switch>
          <Redirect to={`/contacts/${userID}`} />
        </Switch>
      }
    </div>
  );
}

export default Login;

