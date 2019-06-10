module.exports = function(sequelize, DataTypes) {
  var Tweet = sequelize.define("Tweet", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Tweet.associate = function(models) {
    // We're saying that a Tweet should belong to an Author
    // A Tweet can't be created without an Author due to the foreign key constraint
    Tweet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Tweet;
};
