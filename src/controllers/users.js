import User from '../entities/user';
import encrypt from '../lib/encrypt';


export default (router, users) => {
  // let users = [
  //   new User('adam', 'mada', 'email@mail.ru', encrypt('qwerty')),
  //   new User('mada', 'adam', 'email1@mail.ru', encrypt('password2')),
  // ];

  router
    .get('/', async (ctx) => {
      await ctx.render('index');
    })
    .get('/users', async (ctx) => {
      await ctx.render('users/index', { users });
    })
    .get('/users/new', async (ctx) => {
      await ctx.render('users/new', { form: {}, errors: {} });
    })
    .get('/users/:id', async (ctx) => {
      const user = users.find(item => item.id.toString() === ctx.params.id);
      await ctx.render('users/show', { user });
    })
    .get('/users/:id/edit', async (ctx) => {
      const user = users.find(item => item.id.toString() === ctx.params.id);
      await ctx.render('users/edit', { user, form: user, errors: {} });
    })
    .post('/users', async (ctx) => {
      const { firstName, lastName, email, password } = ctx.request.body;

      const errors = {};
      if (!firstName) {
        errors.firstName = "Can't be blank";
      }
      if (!lastName) {
        errors.lastName = "Can't be blank";
      }
      if (!email) {
        errors.email = "Can't be blank";
      } else {
        const uniq = users.find(item => item.email === email) === undefined;
        if (!uniq) {
          errors.email = 'Already exist';
        }
      }

      if (!password) {
        errors.password = "Can't be blank";
      }

      if (Object.keys(errors).length === 0) {
        const user = new User(firstName, lastName, email, encrypt(password));
        users.push(user);
        await ctx.redirect(`/users/${user.id}`);
        return;
      }

      ctx.response.status = 422;
      await ctx.render('users/new', { form: ctx.request.body, errors });
    })
    .patch('/users/:id', async (ctx) => {
      const user = users.find(item => item.id.toString() === ctx.params.id);
      const { firstName, lastName, email, password } = ctx.request.body;

      const errors = {};
      if (!firstName) {
        errors.firstName = "Can't be blank";
      }
      if (!lastName) {
        errors.lastName = "Can't be blank";
      }
      if (!email) {
        errors.email = "Can't be blank";
      } else {
        const uniq = users.find(item => item.email === email) === undefined;
        if (!uniq) {
          errors.email = 'Already exist';
        }
      }

      if (!password) {
        errors.password = "Can't be blank";
      }

      if (Object.keys(errors).length === 0) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        await ctx.redirect(`/users/${user.id}/edit`);
        return;
      }
      ctx.response.status = 422;
      await ctx.render('users/edit', { user, form: ctx.request.body, errors });
    // })
    // .delete('/users/:id', async (ctx) => {
    //   users = users.filter(user => user.id.toString() !== ctx.params.id);
    //   await ctx.redirect('/users');
    });
};
