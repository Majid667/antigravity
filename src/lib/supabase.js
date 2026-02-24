import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://odsosihkztlsasntirho.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kc29zaWhrenRsc2FzbnRpcmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTg1NjMsImV4cCI6MjA4NzM5NDU2M30.TRJZLt6J01skxbyseuBKjgzcVctUWQbYPChj1DIeefs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
