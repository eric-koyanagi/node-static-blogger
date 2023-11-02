module.exports = (sequelize, Sequelize) => {
  const moment = require('moment');
  const { Op } = require("sequelize");

  const Author = sequelize.define("authors", {
        first_name: {
          type: Sequelize.STRING
        },
        last_name: {
          type: Sequelize.STRING
        },
        linkedin: {
          type: Sequelize.STRING
        },
        github: {
          type: Sequelize.STRING
        },
        about: {
          type: Sequelize.TEXT
        },
    },
    {
        underscored: true,
    }
  );

  // Associations  
  Author.belongsTo(Article);

  // Class methods

  
  return Author;
};