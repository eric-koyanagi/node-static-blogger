module.exports = (sequelize, Sequelize) => {
  const moment = require('moment');
  const { Op } = require("sequelize");
  const db = require("../models/index"); 

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

  // Class methods
  Author.upsert = function(values, condition) {
    return Author
      .findOne({ where: condition })
      .then(function(obj) {
          if(obj)
            return obj.update(values);

          return Author.create(values);
      })
  };
  
  return Author;
};