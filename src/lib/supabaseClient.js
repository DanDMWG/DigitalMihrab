import { createClient } from '@supabase/supabase-js';

// ✅ Replace these with your real project details from the Supabase dashboard
const supabaseUrl = 'https://pqqfpnxuuuwvuivmbyfg.supabase.co'; // <-- your unique URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcWZwbnh1dXV3dnVpdm1ieWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NzQzMDUsImV4cCI6MjA2NDM1MDMwNX0.Td_sTbC2CTLsmFc7ZlIl7UMFGSNJxR9XRc-6kfNQp1I';               // <-- your anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
