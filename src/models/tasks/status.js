import Sequelize from 'sequelize';

export default connect => connect.define('status', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isIn: [['new', 'on the go', 'testing', 'done']],
    },
    allowNull: false,
  },
});
