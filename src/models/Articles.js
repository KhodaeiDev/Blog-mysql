const { DataTypes } = require("sequelize");

const Article = (sequelize) =>
  sequelize.define(
    "article",

    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primarykey: true,
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
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

module.exports = Article;
