import Groceries from "../models/grociers.model";

class AdminService {
  async addGrocery(data: {
    name: string;
    price: number;
    inventory: number;
    description?: string;
  }) {
    return await Groceries.create(data);
  }

  async getGroceries() {
    return await Groceries.findAll();
  }

  async removeGrocery(id: number) {
    const grocery = await Groceries.findByPk(id);

    if (!grocery) {
      throw new Error("Grocery item not found");
    }

    await Groceries.destroy({ where: { id } });

    return;
  }

  async updateGrocery(
    id: number,
    data: Partial<{ name: string; price: number; inventory: number }>
  ) {
    const grocery = await Groceries.findByPk(id);

    if (!grocery) {
      throw new Error("Grocery item not found");
    }

    await Groceries.update(data, { where: { id } });

    return;
  }

  async updateInventory(id: number, inventory: number) {
    const grocery = await Groceries.findByPk(id);

    if (!grocery) {
      throw new Error("Grocery item not found");
    }

    if (inventory < 0) {
      throw new Error("Inventory level cannot be negative");
    }

    grocery.inventory = inventory;
    await grocery.save();

    return {
      newInventory: grocery.inventory,
    };
  }
}

export default new AdminService();
