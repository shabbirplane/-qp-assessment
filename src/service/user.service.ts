import Groceries from "../models/grociers.model";
import { Op } from "sequelize";

class UserService {
  async bookOrder(items: { id: number; quantity: number }[]) {
    let totalPrice = 0;

    // Start a transaction
    const transaction = await Groceries.sequelize?.transaction();

    try {
      const itemDetails = [];

      for (const item of items) {
        const grocery = await Groceries.findByPk(item.id, { transaction });
        if (!grocery) {
          throw new Error(`Item with ID ${item.id} not found`);
        }
        if (grocery.inventory < item.quantity) {
          throw new Error(
            `Insufficient inventory for item '${grocery.name}'. Available: ${grocery.inventory}, Requested: ${item.quantity}`
          );
        }

        // Update inventory
        grocery.inventory -= item.quantity;
        await grocery.save({ transaction });

        // Calculate total price
        totalPrice += grocery.price * item.quantity;

        // Prepare order details
        itemDetails.push({
          itemId: grocery.id,
          quantity: item.quantity,
          price: grocery.price,
        });
      }

      // Commit transaction
      await transaction?.commit();

      return {
        message: "Order placed successfully",

        totalPrice,
      };
    } catch (error) {
      await transaction?.rollback();
      throw new Error(`Failed to place order: ${error.message}`);
    }
  }
  async getAllGroceries() {
    return await Groceries.findAll({
      where: {
        inventory: {
          [Op.gt]: 0, // Inventory greater than 0
        },
      },
    });
  }
}

export default new UserService();
