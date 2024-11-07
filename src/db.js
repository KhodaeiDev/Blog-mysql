const { Sequelize } = require("sequelize");
const configs = require("./configs");

const db = new Sequelize({
  host: configs.db.host,
  database: configs.db.name,
  username: configs.db.user,
  password: configs.db.password,
  port: configs.db.port,
  dialect: configs.db.dialect,
  logging: configs.isProductions ? false : console.log,
});

const Tag = require("./models/Tag")(db);
const Articles = require("./models/Articles")(db);
const TagsArticles = require("./models/TagsArticles")(db);
const User = require("./models/User")(db);

User.hasMany(Articles, {
  onDelete: "CASCADE",
  foreignKey: "author_id",
});

Articles.belongsTo(User, {
  foreignKey: "author_id",
  as: "author",
});

Tag.belongsToMany(Articles, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignKey: "tags_id",
});

Articles.belongsToMany(Tag, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignKey: "article_id",
});

module.exports = { db, Tag, Articles, TagsArticles, User };
