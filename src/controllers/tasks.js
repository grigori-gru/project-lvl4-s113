import debug from 'debug';

import buildFormObj from '../lib/formObjectBuilder';

const logger = debug('app');

export default (router, { Task, User, Tag }) => {
  router
    .get('tasks', '/tasks', async (ctx) => {
      logger('GET tasks start');
      const tasks = await Task.findAll();
      ctx.render('tasks/index', { tasks });
    })

    .get('newTask', '/tasks/new', async (ctx) => {
      logger('newTask start');
      const task = Task.build();
      const users = await User.findAll().map(item => item.email);
      logger(users);
      // const formUsers
      ctx.render('tasks/new', { f: buildFormObj(task), users });
    })

    .get('tasksShow', '/tasks/:id', async (ctx) => {
      logger('tasksShow:', ctx.params.id);
      const task = await Task
        .findById(ctx.params.id);
      logger('task', task);
      const tags = await task.getTags();
      const prepTags = tags.map(item => item.name).join(', ');
      logger('prepTags: ', prepTags);
      ctx.render('tasks/show', { task, prepTags });
    })

    .get('tasksIdEdit', '/tasks/:id/edit', async (ctx) => {
      logger('tasksIdEdit:', ctx.params.id);
      const task = await Task
        .findById(ctx.params.id);
      const users = await User.findAll().map(item => item.email);
      ctx.render('tasks/edit', { f: buildFormObj(task), users });
    })

    .post('tasks', '/tasks', async (ctx) => {
      logger('tasks POST');
      const user = await User.findById(ctx.session.id);
      const form = {
        ...ctx.request.body.form,
        creator: user.dataValues.email,
      };
      logger('form', form);
      const task = await Task.build(form);

      try {
        await task.save();
        if (form.tags && form.tags !== '') {
          logger('tag start');
          const prepTags = form.tags
            .split(',')
            .map(item => item.trim());
          logger('prepTags', prepTags);
          await Promise.all(prepTags.map(async (item) => {
            await Tag
              .findOne({
                where: { name: item },
              })
              .then(async (res) => {
                logger('find tags: ', res);
                if (res) {
                  await task.addTag(res);
                  logger('tag added');
                } else {
                  await task.createTag({ name: item });
                  logger('tag created');
                }
              })
              .catch((error) => {
                logger('error', error);
              });
          },
          ));

          // await Promise.all(prepTags.map(async (item) => {
          //   await Tag
          //     .findOrBuild({
          //       where: { name: item },
          //       defaults: { name: item },
          //     })
          //     .spread((result, isBuild) => {
          //       logger('result', result);
          //       logger('isCreated', isBuild);
          //       if (isBuild) result.save();
          //     })
          //     .catch((error) => {
          //       logger('error', error);
          //     });
          // },
          // ));
        }

        logger('TAG: ', await Tag.findAll().map(x => x.dataValues));
        logger('Task: ', await Task.findAll());
        logger('tasks POST done');
        ctx.flash.set({ type: 'success', text: 'Task has been created' });
        ctx.redirect(router.url('tasksShow', task.dataValues.id));
      } catch (e) {
        logger('tasks POST error', e);
        ctx.render('tasks/new', { f: buildFormObj(task, e) });
        ctx.response.status = 422;
      }
    })

    .patch('tasksEdit', '/tasks/:id', async (ctx) => {
      logger('tasks PATCH');
      const form = ctx.request.body.form;
      logger('tasks PATCH form:', form);
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

    .delete('tasks', '/tasks/:id', async (ctx) => {
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
