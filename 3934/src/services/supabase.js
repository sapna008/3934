import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lekzwozivjbfdywtemuu.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxla3p3b3ppdmpiZmR5d3RlbXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDU5MDAsImV4cCI6MjA1MjY4MTkwMH0.l67cholzbGdLLww1Dkup6HwBaEkSIW9dpfEp6Hj1pgA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
