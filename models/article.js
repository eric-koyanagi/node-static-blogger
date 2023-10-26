import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    body: DataTypes.DATE,

});

// Export model
module.exports = mongoose.model("Article", ArticleSchema);