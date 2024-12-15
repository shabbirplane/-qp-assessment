import UserService from "../service/user.service";
import { Request, Response } from "express";

export default class UserController {
  // Place an order for multiple grocery items
  async bookOrder(req: Request, res: Response) {
    try {
      const { items } = req.body;

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Invalid or empty order items" });
      }

      const result = await UserService.bookOrder(items);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all grocery items
  async getAllGroceries(req: Request, res: Response) {
    try {
      const groceries = await UserService.getAllGroceries();
      res.status(200).json(groceries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
