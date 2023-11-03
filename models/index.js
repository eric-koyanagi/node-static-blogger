const dbConfig = require("../config/db.config.js");
const { applyAssociations } = require('./associations');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.articles = require("./article.js")(sequelize, Sequelize);
db.authors = require("./author.js")(sequelize, Sequelize);

// because sequelize is silly, we can't actually define associations in each model file, we have to define them here
applyAssociations(db);

module.exports = db;