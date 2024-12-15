import UserController from "../../controller/user.controller";
import { Router } from "express";
import { roleBasedMiddleware } from "../../middleware/auth.middleware";

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    const userController = new UserController();

    // Route to get all groceries
    this.router.get(
      "/groceries",
      roleBasedMiddleware(["user"]),
      userController.getAllGroceries
    );

    // Route to book an order
    this.router.post(
      "/order",
      roleBasedMiddleware(["user"]),
      userController.bookOrder
    );
  }
}
