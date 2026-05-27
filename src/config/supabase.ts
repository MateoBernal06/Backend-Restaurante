import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const URL_SUPABASE: string | undefined = process.env.URL_SUPABASE;
const KEY_SUPABSE: string | undefined = process.env.KEY_SUPABSE;

if(!URL_SUPABASE){
  throw new Error("URL_SUPABASE no definida");
}

if(!KEY_SUPABSE){
  throw new Error("KEY_SUPABSE no definida");
}

if (!URL_SUPABASE || !KEY_SUPABSE) {
  throw new Error("Credenciales faltantes");
}

export const supabase = createClient(URL_SUPABASE, KEY_SUPABSE);

