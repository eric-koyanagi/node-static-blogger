module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('articles', 'author_id', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: 'authors',
        key: 'id'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('articles', 'author_id');
  }
}