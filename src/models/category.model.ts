import { supabase } from "../config/supabase";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../types/category.types";

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


const updateCategory = async (id: string, category: UpdateCategoryDTO) => {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id)
    .select("*")
    .single();
  return { data, error };
}


const inactivateCategory = async (id: string) => {
  const { data, error } = await supabase
    .from("categories")
    .update({ status: false })
    .eq("id", id)
    .select("*")
    .single();
  return { data, error };
}


const activateCategory = async (id: string) => {
  const { data, error } = await supabase
    .from("categories")
    .update({ status: true })
    .eq("id", id)
    .select("*")
    .single();
  return { data, error };
}

export { createCategory, getCategories, getCategory, updateCategory, inactivateCategory, activateCategory };
