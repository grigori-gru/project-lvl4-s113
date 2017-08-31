import debug from 'debug';

import buildFormObj from '../lib/formObjectBuilder';

const logger = debug('app');

export default (router, { Task }) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      logger('GET tasks start');
      const tasks = await Task.findAll();
      ctx.render('tasks/index', { tasks });
    })

    .get('newTask', '/tasks/new', (ctx) => {
      const task = Task.build();
      ctx.render('tasks/new', { f: buildFormObj(task) });
    })

    .get('tasksShow', '/tasks/:id', async (ctx) => {
      logger('tasksShow:', ctx.params.id);
      const task = await Task
        .findById(ctx.params.id);
      ctx.render('tasks/show', { task });
    })

    .get('tasksIdEdit', '/tasks/:id/edit', async (ctx) => {
      logger('tasksIdEdit:', ctx.params.id);
      const task = await Task
        .findById(ctx.params.id);
      ctx.render('tasks/edit', { f: buildFormObj(task) });
    })

    .post('tasks', '/tasks', async (ctx) => {
      logger('tasks POST');
      const form = ctx.request.body.form;
      const task = await Task.build(form);

      try {
        await task.save();
        logger('tasks POST done');
        ctx.flash.set({ type: 'success', text: 'Task has been created' });
        ctx.redirect(router.url('tasksShow', task.dataValues.id));
      } catch (e) {
        logger('tasks POST error', e);
        ctx.render('users/new', { f: buildFormObj(task, e) });
        ctx.response.status = 422;
      }
    })

    .patch('tasksPatch', '/tasks/:id', async (ctx) => {
      logger('tasks PATCH');
      const form = ctx.request.body.form;
      const task = await Task.findById(ctx.params.id);

      try {
        await task.update(form, { where: { id: ctx.params.id } });
        logger('tasks PATCH done');
        ctx.flash.set({ type: 'success', text: 'Task has been updated' });
        ctx.redirect(router.url('usersShow', task.dataValues.id));
      } catch (e) {
        logger('tasks PATCH error', e);
        ctx.render('users/edit', { f: buildFormObj(task, e) });
        ctx.response.status = 422;
      }
    })

    .delete('tasksDelete', '/tasks/:id', async (ctx) => {
      logger('task DELETE');
      await Task.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      ctx.flash.set({ type: 'success', text: 'Task deleted' });
      ctx.redirect(router.url('tasks'));
    });
};
