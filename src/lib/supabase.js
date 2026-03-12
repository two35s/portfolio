import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbblnjbdzazaxfkuufit.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYmxuamJkemF6YXhma3V1Zml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNDMyNDQsImV4cCI6MjA4ODkxOTI0NH0.7sPzbn_-vIzypb2lFVSjuq2wtvkb8tTFUJeBdbcLKiI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
