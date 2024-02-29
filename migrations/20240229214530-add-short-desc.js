module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('articles', 'short_desc', {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('articles', 'short_desc');
  }
}