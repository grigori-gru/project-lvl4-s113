// import User from '../models/user';
import sessions from './sessions';
import users from './users';

export default (router, container) =>
  [sessions, users].forEach(item => item(router, container));
