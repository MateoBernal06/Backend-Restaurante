import { supabase } from "../config/supabase";

const getLowStockProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, stock, min_stock, unit")
    .eq("status", true)
    .order("stock", { ascending: true });

  if (error) {
    return { data: null, error };
  }
  const lowStock = data.filter((product) => product.stock <= product.min_stock);
  return { data: lowStock, error: null };
};

const getInventoryValue = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, stock, price")
    .eq("status", true);

  if (error) {
    return { data: null, error };
  }

  const detail = data?.map((p) => ({
    id: p.id,
    name: p.name,
    stock: p.stock,
    price: p.price,
    subtotal: p.stock * p.price,
  }));

  const total = detail?.reduce((sum, p) => sum + p.subtotal, 0);

  return { data: { detail, total }, error: null };
};

const getMovementsByDate = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from("inventory_movements")
    .select("*, products(name, unit), users(name, surname)")
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .order("created_at", { ascending: false });

  return { data, error };
};

export { getLowStockProducts, getInventoryValue, getMovementsByDate };
