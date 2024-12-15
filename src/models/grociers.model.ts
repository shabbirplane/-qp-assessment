import {
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

@Table({
  paranoid: true,
  timestamps: true,
  freezeTableName: true,
  tableName: "groceries",
})
export default class Groceries extends Model<Groceries> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column({ type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  inventory: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  // Optional Hook: To enforce some constraints or modify data before creation
  @BeforeCreate
  @BeforeUpdate
  static validateFields(instance: Groceries) {
    if (instance.price <= 0) {
      throw new Error("Price must be greater than 0.");
    }
    if (instance.inventory < 0) {
      throw new Error("Inventory cannot be negative.");
    }
  }
}
