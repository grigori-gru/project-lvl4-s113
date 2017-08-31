import sessions from './sessions';
import users from './users';
import tasks from './tasks';

export default (router, container) =>
  [tasks, sessions, users].forEach(item => item(router, container));
