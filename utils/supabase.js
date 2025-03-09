
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "your-supabase-url";
const supabaseAnonKey = "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
