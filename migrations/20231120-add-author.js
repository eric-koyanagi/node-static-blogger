module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.createTable('authors', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: Sequelize.DataTypes.STRING,
          linkedIn: Sequelize.DataTypes.STRING,
          website: Sequelize.DataTypes.STRING,
          github: Sequelize.DataTypes.STRING,
          about: Sequelize.DataTypes.TEXT,      
        }, {transaction}),

        queryInterface.removeColumn('articles', 'author', {transaction}),  

      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.dropTable('authors', {transaction}),
        queryInterface.addColumn('articles', 'author', Sequelize.DataTypes.STRING)
      ]);
    });
  }
}