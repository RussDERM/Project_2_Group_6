module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    displayName: {
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
      onDelete: "CASCADE"
    });
  };

  return User;
};
