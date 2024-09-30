const express = require("express");
const {
  registerUser,
  getUser,
  getUsers,
  loginUser,
  editUser,
  changeIsBusiness,
  deleteUser,
} = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const {
  validateRegistration,
  validateLogin,
} = require("../validation/userValidationService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const error = validateRegistration(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);

    let user = await registerUser(req.body);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, "post /:" + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const error = validateLogin(req.body);
    if (error) return handleError(res, 400, `Joi Error: ${error}`);

    let { email, password } = req.body;
    const token = await loginUser(email, password);
    res.send(token);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user or admin can get user info"
      );
    }

    let user = await getUser(id);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let users = await getUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;
    console.log("userInfo phone:" + req.body.phone);
    console.log("user info name:" + req.body.name?.first);


    if (userInfo._id !== id) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user can edit user info"
      );
    }

    let user = await editUser(id, req.body);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});
router.patch("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id !== id) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user can edit user info"
      );
    }

    let user = await changeIsBusiness(id);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const { id } = req.params;

    if (userInfo._id !== id && !userInfo.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: Only the same user or admin can delete user info"
      );
    }

    let user = await deleteUser(id);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});
module.exports = router;
