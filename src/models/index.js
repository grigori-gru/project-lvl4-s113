import getUser from './user.db';

export default content => ({
  User: getUser(content),
});
