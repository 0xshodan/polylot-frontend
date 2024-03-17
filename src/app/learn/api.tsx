import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/database.types";


async function fetchCards() {
    const supabase = createClientComponentClient<Database>();
    const {data, error} = await supabase.from("cards").select();
    return data
}

export {fetchCards};