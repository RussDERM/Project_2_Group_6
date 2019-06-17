module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define("Tweet", {
    tweetId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Tweet.associate = function(models) {
    Tweet.belongsTo(models.User);
  };

  return Tweet;
};
