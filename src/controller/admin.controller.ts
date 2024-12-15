import AdminService from "../service/admin.service";
import { Request, Response } from "express";

export default class AdminController {
  // Add a new grocery item
  async addGrocery(req: Request, res: Response) {
    try {
      const { name, price, inventory, description } = req.body;

      if (!name || !price || !inventory) {
        return res.status(400).json({
          error: "Name, price, and inventory are required fields",
        });
      }

      const grocery = await AdminService.addGrocery({
        name,
        price,
        inventory,
        description,
      });

      res
        .status(201)
        .json({ message: "Grocery item added successfully", grocery });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all grocery items
  async getGroceries(req: Request, res: Response) {
    try {
      const groceries = await AdminService.getGroceries();
      res.status(200).json(groceries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Remove a grocery item
  async removeGrocery(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Grocery ID is required" });
      }

      const result = await AdminService.removeGrocery(Number(id));
      res
        .status(200)
        .json({ message: "Grocery item deleted successfully", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a grocery item
  async updateGrocery(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, price, inventory } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Grocery ID is required" });
      }

      const result = await AdminService.updateGrocery(Number(id), {
        name,
        price,
        inventory,
      });

      res
        .status(200)
        .json({ message: "Grocery item updated successfully", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update inventory for a grocery item
  async updateInventory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { inventory } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Grocery ID is required" });
      }

      if (inventory === undefined || typeof inventory !== "number") {
        return res.status(400).json({
          error: "Inventory must be a valid number",
        });
      }

      const result = await AdminService.updateInventory(Number(id), inventory);
      res
        .status(200)
        .json({ message: "Inventory updated successfully", result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
