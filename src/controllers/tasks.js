import debug from 'debug';

const logger = debug('app');

export default (router, { Task }) => {
  router
    .get('/tasks', async (ctx) => {
      logger('/tasks start');
      const tasks = await Task.findAll();
      ctx.render('tasks/index', { tasks });
    })
    .get('/tasks/new', (ctx) => {
      ctx.render('tasks/new', { form: {}, errors: {} });
    })
    .get('/tasks/:id', async (ctx) => {
      const task = await Task
        .findById(ctx.params.id)
        .then(result => result.dataValues);
      ctx.render('tasks/show', { task });
    })
    .get('/tasks/:id/edit', async (ctx) => {
      const task = await Task
        .findById(ctx.params.id)
        .then(result => result.dataValues);
      ctx.render('tasks/edit', { task, form: task, errors: {} });
    })
    .post('/tasks', async (ctx) => {
      const { name, description, status, creator, assignedTo, tags } = ctx.request.body;
      logger(`/tasks POST request name: ${name}`);
      logger(ctx.request.body);

      try {
        const task = await Task.build({ name, description, status, creator, assignedTo, tags });
        await task.save();
        logger('/tasks POST request done');
        ctx.flash.set({ type: 'success', text: 'Task has been created' });
        ctx.redirect(`/tasks/${task.dataValues.id}`);
      } catch (e) {
        logger('/tasks POST request error', e);
        const erMessages = e.errors
          .reduce((acc, value) => {
            logger(value.message);
            return [...acc, value.message];
          }, [])
          .join('\n');
        const text = `Incorrect task data: ${erMessages}`;
        ctx.flash.set({ type: 'danger', text });
        ctx.redirect('/tasks/new', { form: ctx.request.body, e });
        ctx.response.status = 422;
      }
    })
    .patch('/tasks/:id', async (ctx) => {
      const { name, description, status, creator, assignedTo, tags } = ctx.request.body;
      const updateValues = { name, description, status, creator, assignedTo, tags };
      // const updateValue = { firstName, lastName, email, password };
      logger(`/tasks PATCH request name: ${ctx.request.body.name}`);

      try {
        const task = await Task.findById(ctx.params.id);
        logger('updateValues', updateValues);
        await task.update(updateValues, { where: { id: ctx.params.id } });
        logger(task.dataValues);
        logger('/tasks PATCH done');
        ctx.flash.set({ type: 'success', text: 'Task has been updated' });
        ctx.redirect('/tasks');
      } catch (e) {
        logger('/tasks PATCH error', e.name);
        const erMessages = e.errors
          .reduce((acc, value) => {
            logger(value.message);
            return [...acc, value.message];
          }, [])
          .join(' ');
        const text = `Incorrect task data. ${erMessages}`;
        ctx.flash.set({ type: 'danger', text });
        ctx.redirect('/tasks/new', { form: ctx.request.body, e });
        ctx.response.status = 422;
      }
    })
    .delete('/tasks/:id', async (ctx) => {
      logger('DELETE');
      await Task.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      ctx.redirect('/tasks');
    });
};
