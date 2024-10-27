const { Sequelize } = require("sequelize");
const configs = require("./configs");

const Tag = require("./models/Tag");
const Articles = require("./models/Articles");
const TagsArticles = require("./models/TagsArticles");
const User = require("./models/User");

const db = new Sequelize({
  host: configs.db.host,
  database: configs.db.name,
  username: configs.db.user,
  password: configs.db.password,
  port: configs.db.port,
  dialect: configs.db.dialect,
  logging: configs.isProductions ? false : console.log,
});

User.hasMany(Articles, {
  onDelete: "CASCADE",
  foreignkey: "author_id",
});

Articles.blongsTo(User, {
  foreignkey: "author_id",
  as: "author",
});

Tag.belongsToMany(Articles, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignkey: "tag_id",
});

Articles.belongsToMany(Tag, {
  through: TagsArticles,
  onDelete: "CASCADE",
  foreignkey: "article_id",
});

module.exports = db;
