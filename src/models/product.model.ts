import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from "../types/product.types";
import { supabase } from "../config/supabase";

const createProduct = async (product: CreateProductDTO) => {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select("*")
    .single();
  return { data, error };
};

const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  return { data, error };
};

const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export { createProduct, getProducts, getProduct };
