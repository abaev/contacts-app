// Мидлверы

const jsonServer = require('json-server');
const router = jsonServer.router('db.json');

// Авторизация
// Если не находит пользователя с куки contactsAuth - отвечает 401
function auth(req, res, next) {
  const db = router.db; //lowdb instance
  
  let user = db.get('users').value()
    .find(u => u.cookie === req.cookies.contactsAuth);

  // Такого пользователя нет
  if(!user) return res.status(401).send();
  
  // Пользователь есть, продолжаем дальше
  next();
}

// Вход
// Если пароль верный, устанавливаем куки и отдаем userID,
// если нет - отвечаем 401
function login(req, res, next) {
  const db = router.db; //lowdb instance
  const { name, password } = req.query;

  let user = db.get('users').value()
    .find(u => u.password === password && u.name === name);
  
    if(user) {
      res.cookie('contactsAuth', user.cookie);
      return res.status(200).send({ userID: user.id });
    
    } else return res.status(401).send();
}

module.exports.auth = auth;
module.exports.login = login;