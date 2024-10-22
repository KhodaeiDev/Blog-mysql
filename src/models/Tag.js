const { DataTypes } = require("sequelize");

const Tag = (sequelize) =>
  sequelize.define(
    "tag",
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

module.exports = Tag;
