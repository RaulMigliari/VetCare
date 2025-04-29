//! conexão com o Supabase

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()
// console.log('URL:', process.env.SUPABASE_URL)
// console.log('KEY:', process.env.SUPABASE_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default supabase

