module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('articles', 'site', {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "blog"
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('articles', 'site');
  }
}