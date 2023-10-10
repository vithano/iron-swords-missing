
import {createClient} from '@supabase/supabase-js'
import {Database} from './database.types'

const supabaseUrl = process.env.SUPABASE_URL || "https://jaqqunzflskbrrwzlglq.supabase.co"
const supabaseKey = process.env.SUPABASE_ANON_KEY || ""

const supabase = createClient<Database>(supabaseUrl, supabaseKey)


export default supabase;