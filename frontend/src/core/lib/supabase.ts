import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('❌ Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
