import User from '../entities/user';
import sessions from './sessions';
import users from './users';
import encrypt from '../lib/encrypt';

export default (router) => {
  const appUsers = [
    new User('adam', 'mada', 'email@mail.ru', encrypt('qwerty')),
    new User('mada', 'adam', 'email1@mail.ru', encrypt('password2')),
  ];
  [sessions, users].forEach(item => item(router, appUsers));
};
