// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://piliebwatwazughrjbsh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbGllYndhdHdhenVnaHJqYnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzEyNTUsImV4cCI6MjA1ODY0NzI1NX0.MKbcfSPTdA_rflTSbJUWffmmF3IG-gjLUvmOkzYEcEo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);