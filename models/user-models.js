module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    User.hasMany(models.Tweet);
    //   // Associating User with Tweet
    //   // When an User is deleted, also delete any associated Tweets
    //   User.hasMany(models.Tweet, {
    //     onDelete: "cascade"
    //   });
  };

  return User;
};
