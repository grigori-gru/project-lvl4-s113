import Sequelize from 'sequelize';

export default connect => connect.define('task', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'new',
    allowNull: false,
  },
  creator: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
    allowNull: false,
  },
  assignedTo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
