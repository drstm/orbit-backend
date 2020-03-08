'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    uuid: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    public_key: DataTypes.STRING,
    private_key: DataTypes.STRING,
    sequence: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {});
  accounts.associate = function(models) {
    // associations can be defined here
  };
  return accounts;
};