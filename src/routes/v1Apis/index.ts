import express from "express";
import { AdminRouter } from "./admin";
import { AuthRouter } from "./auth";
import { UserRouter } from "./user";

export class APISRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.use("/v1", new AuthRouter().router);
    this.router.use("/v1/user", new UserRouter().router);
    this.router.use("/v1/admin", new AdminRouter().router);
  }
}
