import { supabase } from "../config/supabase";
import {CreateInventory} from "../types/inventory.types";

const createInventory = async (inventory: CreateInventory) => {
  const { data, error } = await supabase
    .from("inventory_movements")
    .insert(inventory)
    .select("*")
    .single();
  return { data, error };
};

export { createInventory };
