import { supabase } from "../config/supabase";
import { CreateUserDTO } from "../types/users.types";

const createUser = async (user: CreateUserDTO) => {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    return { data, error }
};

export {
  createUser
}