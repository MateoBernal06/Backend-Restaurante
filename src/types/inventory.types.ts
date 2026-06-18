export type typeInventory = "entrada" | "salida";

export interface Inventory {
  readonly id: string;
  readonly user_id: string;
  readonly product_id: string;
  type: typeInventory;
  quantity: number;
  reason: string;
  readonly created_at: Date;
}

export interface CreateInventory extends Omit<Inventory, "id" | "created_at"> {}


export interface ModifyStock extends Omit<Inventory, "id" | "created_at" | "user_id" | "reason">{}