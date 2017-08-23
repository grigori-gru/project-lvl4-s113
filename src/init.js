import getModels from './models';
import connect from './db';

export default async () => {
  const models = getModels(connect);
  await Promise.all(Object.values(models).map(model => model.sync({ force: true })));
};
