import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://apmgoslxzgvfsmmkgjfw.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbWdvc2x4emd2ZnNtbWtnamZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczODM4NzYsImV4cCI6MjAxMjk1OTg3Nn0.OgtCRvXx44mN00LGmc4Gw9tyflFoee0PhOwpFgEZulU'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
