import debug from 'debug';

import renderFlash from '../lib/renderFlash';
import buildFormObj from '../lib/formObjectBuilder';

import encrypt from '../lib/encrypt';

const logger = debug('app');

export default (router, { User }) => {
  router
    .get('newSessions', '/sessions/new', async (ctx) => {
      await ctx.render('sessions/new', { f: buildFormObj({}) });
    })
    .post('sessions', '/sessions', async (ctx) => {
      logger('POST sessions start');
      const { email, password } = ctx.request.body.form;
      logger('POST seesion body', ctx.request.body);
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user && user.passwordDigest === encrypt(password)) {
        logger('POST /sessions true');
        ctx.flash.set({ type: 'success', text: 'It\'s ok!!! Session is open' });
        ctx.session.id = user.id;
        ctx.redirect(router.url('root'));
        return;
      }

      logger('POST /sessions false');
      ctx.state.flash = renderFlash('Email or password were wrong!');
      ctx.render('sessions/new', { f: buildFormObj({ email }) });
      ctx.response.status = 422;
    })
    .delete('sessions', '/sessions', (ctx) => {
      logger('DELETE /sessions');
      ctx.session = {};
      ctx.flash.set({ type: 'success', text: 'Session is closed' });
      ctx.redirect(router.url('root'));
    });
};
