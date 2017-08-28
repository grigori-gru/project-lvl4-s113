import debug from 'debug';

import encrypt from '../lib/encrypt';

const logger = debug('app');

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
        logger('POST /sessions true');
        ctx.flash.set({ type: 'success', text: 'It\'s ok!!! Session start' });
        ctx.session.id = user.id;
        ctx.redirect('/');
        return;
      }

      logger('POST /sessions false');
      ctx.flash.set({ type: 'danger', text: 'Email or password were wrong!' });
      ctx.redirect('/sessions/new');
      ctx.response.status = 422;
    })
    .delete('/sessions', async (ctx) => {
      delete ctx.session.id;
      await ctx.redirect('/');
    });
};
