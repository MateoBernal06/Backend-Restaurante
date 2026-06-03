import { supabase } from "../config/supabase";
import { CreateUserDTO, LoginUserDTO } from "../types/users.types";

const createUser = async (user: CreateUserDTO) => {
  const { data, error } = await supabase.from("users").insert(user).select();
  return { data, error };
};

const loginUser = async (user: LoginUserDTO) => {
  const { email } = user;
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);
  return { data, error };
};

export { createUser, loginUser };
