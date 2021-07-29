// Mock server

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { auth, login } = require('./middlewares');

server.use(cookieParser());
server.use(cors());

server.all('/contacts', auth, middlewares);
server.get('/login', login);

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});