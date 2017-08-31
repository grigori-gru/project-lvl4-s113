import debug from 'debug';

import buildFormObj from '../lib/formObjectBuilder';

const logger = debug('app');

export default (router, { User }) => {
  router
    .get('root', '/', async (ctx) => {
      await ctx.render('index');
    })

    .get('users', '/users', async (ctx) => {
      logger('/users page');
      const users = await User.findAll();
      ctx.render('users/index', { users });
    })

    .get('newUser', '/users/new', (ctx) => {
      const user = User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
    })

    .get('usersShow', '/users/:id', async (ctx) => {
      logger('usersShow:', ctx.params.id);
      const user = await User
        .findById(ctx.params.id);
      ctx.render('users/show', { user });
    })

    .get('usersIdEdit', '/users/:id/edit', async (ctx) => {
      logger('usersIdEdit:', ctx.params.id);
      const user = await User
        .findById(ctx.params.id);
      ctx.render('users/edit', { f: buildFormObj(user) });
    })

    .post('users', '/users', async (ctx) => {
      logger('users POST');
      const form = ctx.request.body.form;
      const user = await User.build(form);

      try {
        await user.save();
        logger('users POST done');
        ctx.flash.set({ type: 'success', text: 'User has been created' });
        ctx.redirect(router.url('usersShow', user.dataValues.id));
      } catch (e) {
        logger('users POST error', e);
        ctx.render('users/new', { f: buildFormObj(user, e) });
        ctx.response.status = 422;
      }
    })

    .patch('usersPatch', '/users/:id', async (ctx) => {
      logger('Patch start');
      const form = ctx.request.body.form;
      const user = await User.findById(ctx.params.id);

      try {
        await user.update(form, { where: { id: ctx.params.id } });
        logger('users PATCH done');
        ctx.flash.set({ type: 'success', text: 'User has been updated' });
        ctx.redirect(router.url('usersShow', user.dataValues.id));
      } catch (e) {
        logger('users PATCH error', e);
        ctx.render('users/edit', { f: buildFormObj(user, e) });
        ctx.response.status = 422;
      }
    })

    .delete('usersDelete', '/users/:id', async (ctx) => {
      logger('users DELETE');
      await User.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      ctx.session = {};
      ctx.flash.set({ type: 'success', text: 'User deleted' });
      ctx.redirect(router.url('users'));
    });
};
