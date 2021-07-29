// Вход

import React from 'react';
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
import login from '@/services/Login.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        error: false,
        helperText: '',
        // Функция проверки значения
        validate(value) {
          return value.trim() ? false : 'Введите имя';
        } 
      },
      
      password: {
        value: '',
        error: false,
        helperText: '',
        // Функция проверки значения
        validate(value) {
          if(value.match(/\s/)) {
            return 'Пароль не может содержать пробелы';
          }

          return value ? false : 'Введите пароль';
        }
      },
      
      showPassword: false
    }
  }

  // Обработка ввода в текстовые поля Имя и Пароль
  handleText = event => {
    this.setState(state => {
      let error = state[event.target.name]
        .validate(event.target.value);

      const newState = Object.assign(
        state[event.target.name], 
        {
          error: !!error,
          helperText: error,
          value: event.target.value
        });

      return {
        [event.target.name]: newState
      }
    });
  }

  handleShowPasswordClick = () => {
    this.setState(state => ({
      showPassword: !state.showPassword
    }));
  }

  // Проверяем,что имя/пароль валидны,
  // отправляем запрос на вход
  handleLoginClick = () => {
    if(this.state.name.validate(this.state.name.value)
      || this.state.password.validate(this.state.password.value)) return;

    login({
      name: this.state.name.value,
      password: this.state.password.value
    }).then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
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
                
                <TextField label="Имя пользователя"
                  fullWidth variant="outlined" 
                  margin="normal"
                  name="name"
                  value={this.state.name.value}
                  error={this.state.name.error}
                  helperText={this.state.name.helperText}
                  onChange={this.handleText}
                  onBlur={this.handleText}/>

                <TextField label="Пароль"
                  fullWidth variant="outlined"
                  margin="normal"
                  name="password"
                  onChange={this.handleText}
                  onBlur={this.handleText}
                  type={this.state.showPassword
                    ? 'text' : 'password'}
                  value={this.state.password.value}
                  error={this.state.password.error}
                  helperText={this.state.password.helperText}
                  InputProps={{endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={this.handleShowPasswordClick}>
                        {this.state.showPassword
                          ?
                          <VisibilityIcon />
                          :
                          <VisibilityOffIcon />
                        }
                      </IconButton>
                    </InputAdornment>
                  )}} />

                <Box display="flex" mt={2}
                  justifyContent="flex-end">
                  <Button variant="contained"
                    color="primary" disableElevation
                    size="large"
                    onClick={this.handleLoginClick}>
                    Войти
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Login;

