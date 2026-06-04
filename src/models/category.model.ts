import { supabase } from "../config/supabase";
import { CreateCategoryDTO } from "../types/category.types";

const createCategory = async (category: CreateCategoryDTO) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select("*")
    .single();

  return { data, error };
};

const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  return { data, error };
};

const getCategory = async (id: string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export { createCategory, getCategories, getCategory };
