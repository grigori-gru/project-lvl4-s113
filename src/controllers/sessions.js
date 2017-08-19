// import User from '../entities/user';
import encrypt from '../lib/encrypt';

export default (router, users) => {
  router
    .get('/sessions/new', async (ctx) => {
      await ctx.render('sessions/new', { form: {} });
    })
    .post('/sessions', async (ctx) => {
      const { email, password } = ctx.request.body;
      const user = users.find(item => item.email === email);
      if (user && user.passwordDigest === encrypt(password)) {
        ctx.session.id = user.id;
        await ctx.redirect('/');
        return;
      }

      ctx.response.status = 422;
      await ctx.render('sessions/new', { form: ctx.request.body, error: 'Invalid nickname or password' });
    })
    .delete('/sessions', async (ctx) => {
      delete ctx.session.id;
      await ctx.redirect('/');
    });
};
