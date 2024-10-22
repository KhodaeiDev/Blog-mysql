const TagsArticles = (sequelize) =>
  sequelize.define(
    "tags_articles",
    {},
    {
      timestamps: false,
    }
  );

module.exports = TagsArticles;
