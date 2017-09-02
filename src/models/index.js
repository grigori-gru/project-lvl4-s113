import getUser from './user';
import getTask from './tasks/task';
import getStatus from './tasks/status';
import getTag from './tasks/tag';
import getTaskTag from './tasks/taskTag';
// import getTaskStatus from './tasks/taskStatus';

export default (content) => {
  const m = {
    User: getUser(content),
    TaskStatus: getStatus(content),
    Tag: getTag(content),
    Task: getTask(content),
    TaskTag: getTaskTag(content),
    // TaskStatus: getTaskStatus(content),
  };

  m.Task.belongsToMany(m.Tag, { through: 'taskTag' });
  m.Tag.belongsToMany(m.Task, { through: 'taskTag' });

  return m;
};
