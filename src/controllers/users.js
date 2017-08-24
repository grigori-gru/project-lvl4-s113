export default (router, { User }) => {
  router
    .get('/', async (ctx) => {
      await ctx.render('index');
    })
    .get('/users', async (ctx) => {
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

      const user = await User.build({ firstName, lastName, email, password });
      try {
        await user.save();
        ctx.flash.set({ type: 'success', text: 'User has been created' });
        ctx.redirect('/users');
      } catch (e) {
        ctx.response.status = 422;
        ctx.flash.set({ type: 'danger', text: 'Incorrect user data' });
        ctx.redirect('/users/new', { form: ctx.request.body, e });
      }
    })
    .patch('/users/:id', async (ctx) => {
      const { firstName, lastName, email, password } = ctx.request.body;
      const updateValue = { firstName, lastName, email, password };
      const user = await User.findById(ctx.params.id);

      try {
        await user.update(updateValue, { where: { id: ctx.params.id } });
        ctx.flash.set({ type: 'success', text: 'User has been updated' });
        ctx.redirect('/users');
      } catch (e) {
        ctx.response.status = 422;
        ctx.flash.set({ type: 'danger', text: 'Incorrect user data' });
        ctx.redirect('/users/new', { form: ctx.request.body, e });
      }
    })
    .delete('/users/:id', async (ctx) => {
      await User.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      ctx.redirect('/users');
    });
};
