module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('articles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: Sequelize.DataTypes.STRING,
      author: Sequelize.DataTypes.STRING,
      slug: Sequelize.DataTypes.STRING,
      body: Sequelize.DataTypes.TEXT,
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      next: {
        type: Sequelize.INTEGER,
        references: {
          model: 'articles',
          key: 'id'
        },
      },
      previous: {
        type: Sequelize.INTEGER,
        references: {
          model: 'articles',
          key: 'id'
        },
      }
    });

    /*
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.createTable('articles', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          title: DataTypes.STRING,
          author: DataTypes.STRING,
          slug: DataTypes.STRING,
          body: DataTypes.TEXT,
          created_at: {
            type: Sequelize.DATE
          },
          updated_at: {
            type: Sequelize.DATE
          },
          next: {
            type: Sequelize.INTEGER,
            references: {
              model: 'articles',
              key: 'id'
            },
          },
          previous: {
            type: Sequelize.INTEGER,
            references: {
              model: 'articles',
              key: 'id'
            },
          }
        }),
      ]);
    });*/
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('articles');
  }
}