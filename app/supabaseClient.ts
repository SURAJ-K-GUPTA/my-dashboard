import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check the current authenticated user
export const checkUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session ? session.user : null;
};
