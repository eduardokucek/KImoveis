import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express from "express";
import { handleErrors } from "./errors/errors";
import usersRoute from "./routes/users/users.routes";
import loginRoute from "./routes/login/login.routes";
import categoriesRoute from "./routes/categories/categories.routes";
import realEstateRoute from "./routes/realEstate/realEstate.routes";
import scheduleRoute from "./routes/schedules/schedule.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoute);
app.use("/login", loginRoute);
app.use("/categories", categoriesRoute);
app.use("/realEstate", realEstateRoute);
app.use("/schedules", scheduleRoute);

app.use(handleErrors);

export default app;
