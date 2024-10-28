const { DataTypes } = require("sequelize");

const Tag = (sequelize) =>
  sequelize.define(
    "tag",
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "tags",
      timestamps: false,
    }
  );

module.exports = Tag;
