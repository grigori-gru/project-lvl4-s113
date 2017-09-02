import Sequelize from 'sequelize';

export default connect => connect.define('tag', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
    allowNull: false,
  },
});
