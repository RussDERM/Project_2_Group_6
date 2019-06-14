// require("./user");
module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define("Tweet", {
    tweetId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }

    // createdAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    // },

    // updatedAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    // },

    // UserId: {
    //   type: DataTypes.INTEGER
    // }
  });

  Tweet.associate = function(models) {
    Tweet.belongsTo(models.User);
  //   // We're saying that a Tweet should belong to an Author
  //   // A Tweet can't be created without a User due to the foreign key constraint
  //   Tweet.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  };

  return Tweet;
};
