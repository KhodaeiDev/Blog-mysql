const { DataTypes } = require("sequelize");

const Article = (sequelize) =>
  sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      tableName: "articles",
      timestamps: true,
    }
  );

module.exports = Article;
