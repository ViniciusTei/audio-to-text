import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_DB_PUBLIC_URL
const supabaseKey = import.meta.env.VITE_DB_PUBLIC_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
