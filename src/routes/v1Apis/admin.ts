import AdminController from "../../controller/admin.controller";
import { Router } from "express";
import { roleBasedMiddleware } from "../../middleware/auth.middleware";

export class AdminRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    const adminController = new AdminController();

    // Route to add a new grocery item
    this.router.post(
      "/grocery",
      roleBasedMiddleware(["admin"]),
      adminController.addGrocery
    );

    // Get all grocery items
    this.router.get(
      "/groceries",
      roleBasedMiddleware(["admin"]),
      adminController.getGroceries
    );

    // Remove a grocery item
    this.router.delete(
      "/grocery/:id",
      roleBasedMiddleware(["admin"]),
      adminController.removeGrocery
    );

    // Update a grocery item
    this.router.put(
      "/grocery/:id",
      roleBasedMiddleware(["admin"]),
      adminController.updateGrocery
    );

    // Update inventory for a grocery item
    this.router.patch(
      "/grocery/:id/inventory",
      roleBasedMiddleware(["admin"]),
      adminController.updateInventory
    );
  }
}
