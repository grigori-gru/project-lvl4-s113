import getUser from './user';
import getTask from './tasks/task';
import getStatus from './tasks/status';
import getTag from './tasks/tag';

export default content => ({
  User: getUser(content),
  TaskStatus: getStatus(content),
  Tag: getTag(content),
  Task: getTask(content),
});
