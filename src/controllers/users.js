import debug from 'debug';

const logger = debug('app');

export default (router, { User }) => {
  router
    .get('/', async (ctx) => {
      await ctx.render('index');
    })
    .get('/users', async (ctx) => {
      logger('/users page');
      const users = await User.findAll();
      ctx.render('users/index', { users });
    })
    .get('/users/new', (ctx) => {
      ctx.render('users/new', { form: {}, errors: {} });
    })
    .get('/users/:id', async (ctx) => {
      const user = await User
        .findById(ctx.params.id)
        .then(result => result.dataValues);
      ctx.render('users/show', { user });
    })
    .get('/users/:id/edit', async (ctx) => {
      const user = await User
        .findById(ctx.params.id)
        .then(result => result.dataValues);
      ctx.render('users/edit', { user, form: user, errors: {} });
    })
    .post('/users', async (ctx) => {
      const { firstName, lastName, email, password } = ctx.request.body;
      logger('POST request');

      try {
        const user = await User.build({ firstName, lastName, email, password });
        await user.save();
        logger('POST request done');
        ctx.flash.set({ type: 'success', text: 'User has been created' });
        ctx.redirect(`/users/${user.dataValues.id}`);
      } catch (e) {
        logger('POST request error');
        ctx.flash.set({ type: 'danger', text: 'Incorrect user data' });
        ctx.redirect('/users/new', { form: ctx.request.body, e });
        ctx.response.status = 422;
      }
    })
    .patch('/users/:id', async (ctx) => {
      const { firstName, lastName, email, password } = ctx.request.body;
      const updateValue = { firstName, lastName, email, password };
      logger('PATCH');

      try {
        const user = await User.findById(ctx.params.id);
        await user.update(updateValue, { where: { id: ctx.params.id } });
        logger('PATCH done');
        ctx.flash.set({ type: 'success', text: 'User has been updated' });
        ctx.redirect('/users');
      } catch (e) {
        logger('PATCH error');
        ctx.flash.set({ type: 'danger', text: 'Incorrect user data' });
        ctx.redirect('/users/new', { form: ctx.request.body, e });
        ctx.response.status = 422;
      }
    })
    .delete('/users/:id', async (ctx) => {
      logger('DELETE');
      await User.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      ctx.session.id = undefined;
      ctx.redirect('/users');
    });
};
