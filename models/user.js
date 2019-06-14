module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    Id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },

    username: {
      type: DataTypes.TEXT
    },

    about: {
      type: DataTypes.TEXT
    },

    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_login: {
      type: DataTypes.DATE
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });

  User.associate = function(models) {
    // Associating User with Tweets
    // When an User is deleted, also delete any associated Tweets
    User.hasMany(models.Tweet, {
      onDelete: "cascade"
    });
  };

  return User;
};
