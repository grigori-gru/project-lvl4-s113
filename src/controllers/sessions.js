import encrypt from '../lib/encrypt';

export default (router, { User }) => {
  router
    .get('/sessions/new', async (ctx) => {
      await ctx.render('sessions/new', { form: {} });
    })
    .post('/sessions', async (ctx) => {
      const { email, password } = ctx.request.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user && user.passwordDigest === encrypt(password)) {
        ctx.flash.set({ type: 'success', text: 'It\'s ok!!! Session start' });
        ctx.session.id = user.id;
        await ctx.redirect('/');
        return;
      }

      ctx.flash.set({ type: 'danger', text: 'Email or password were wrong!' });
      await ctx.redirect('sessions/new', { form: ctx.request.body });
    })
    .delete('/sessions', async (ctx) => {
      delete ctx.session.id;
      await ctx.redirect('/');
    });
};
