import { supabase } from "../config/supabase";
import { CreateInventory } from "../types/inventory.types";

const createInventory = async (inventory: CreateInventory) => {
  const { data, error } = await supabase
    .from("inventory_movements")
    .insert(inventory)
    .select("*")
    .single();
  return { data, error };
};

const getAllInventory = async () => {
  const { data, error } = await supabase
    .from("inventory_movements")
    .select("*");
  return { data, error };
};

const getInventory = async (id: string) => {
  const { data, error } = await supabase
    .from("inventory_movements")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
};

const getInventoryByProduct = async (product_id: string) => {
  const { data, error } = await supabase
    .from("inventory_movements")
    .select(
      `*,
      products (name, unit),
      users (name, surname)`,
    )
    .eq("product_id", product_id)
    .order("created_at", { ascending: false });
  return { data, error };
};

export {
  createInventory,
  getAllInventory,
  getInventory,
  getInventoryByProduct,
};
