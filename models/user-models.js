const Sequelize = require ("sequelize");
const Schema = Sequelize.Schema;


// create schema for user model defining how we want our user record to look
const userSchema = new Schema({
    //properties we want user to have
    username: "String",
    googleId: "String"
});

const User = Sequelize.Model("user", userSchema);

//export for user in another file
module.exports= User;