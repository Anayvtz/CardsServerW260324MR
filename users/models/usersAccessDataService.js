const { generateAuthToken } = require("../../auth/providers/jwt");
const _ = require("lodash");
const User = require("./mongodb/User");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comaprePasswords } = require("../helpers/bcrypt");

const registerUser = async (newUser) => {
  try {
    newUser.password = generateUserPassword(newUser.password);
    let user = new User(newUser);
    user = await user.save();

    user = _.pick(user, ["name", "email", "_id"]);

    return user;
  } catch (error) {
    return createError("Mongoose registerUser:", error);
  }
};

const getUser = async (userId) => {
  try {
    let user = await User.findById(userId);
    return user;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const getUsers = async () => {
  try {
    let users = await User.find();
    return users;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const loginUser = async (email, password) => {
  try {
    const userFromDb = await User.findOne({ email });

    if (!userFromDb) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      return createError("Authentication", error);
    }
    if (!comaprePasswords(password, userFromDb.password)) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      return createError("Authentication", error);
    }
    const token = generateAuthToken(userFromDb);
    return token;
  } catch (error) {
    return createError("Mongoose", error);
  }
};

const editUser = async (id, userInfo) => {
  try {
    let { phone } = userInfo;
    

    let user = await User.findByIdAndUpdate(id, userInfo, { new: true });
    return user;
  } catch (err) {
    return createError("Mongoose editUser:", err);
  }
}
const changeIsBusiness = async (id) => {
  try {
    let user = await getUser(id);
    let { isBusiness } = user;
    user.isBusiness = !isBusiness;
    user = await User.findByIdAndUpdate(id, user);
    return user;
  } catch (err) {
    return createError("Mongoose changeIsBusiness:", err);
  }
}
const deleteUser = async (id) => {
  try {
    let user = await User.findByIdAndDelete(id);
    return user;
  } catch (err) {
    return createError("Mongoose deleteUser:", err);
  }
}
module.exports = { registerUser, getUser, getUsers, loginUser, editUser, changeIsBusiness, deleteUser };
