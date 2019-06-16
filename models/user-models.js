module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    username: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    googleId: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Tweet, {
      // foreignKey: "UserId",
      onDelete: "CASCADE"
    });
  };

  return User;
};
