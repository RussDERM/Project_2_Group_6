module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    userName: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating User with Tweets
    // When an User is deleted, also delete any associated Tweets
    User.hasMany(models.Tweets, {
      onDelete: "cascade"
    });
  };

  return User;
};
