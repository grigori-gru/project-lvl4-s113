import getUser from './user';

export default content => ({
  User: getUser(content),
});
