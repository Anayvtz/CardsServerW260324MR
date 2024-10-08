const express = require("express");
const chalk = require("chalk");
require("dotenv").config();
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const loggerMiddleware = require("./logger/loggerService");
const { generateUsers, generateCards } = require("./initialData/loadData");
const { getUsers } = require("./users/models/usersAccessDataService");

const app = express();
const PORT = process.env.PORT || 8182;

app.use(corsMiddleware);
app.use(express.json());

app.use(loggerMiddleware());

app.use(express.static("./public"));

app.use(router);

app.use((err, req, res, next) => {
  const message = err || "internal error of the server";
  return handleError(res, 500, message);
});

app.listen(PORT, async () => {
  console.log(chalk.yellow("app is listening to port " + PORT));
  await connectToDb();
  try {
    if (getUsers().length == 0) {
      let userId = 0;
      userId = await generateUsers();

      await generateCards(userId);
    }
  } catch (err) {
    console.log("after listen when generating mock data. err:" + err.message);
  }
});
