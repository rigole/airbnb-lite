import { supabase } from "./supabase";
import { Listing } from "../types/listing";

type ListingRow = {
    id: string;
    title: string;
    location: string;
    price_per_night: number;
    image: string;
}

function mapRowToListing(row: ListingRow): Listing {
    return {
        id: row.id,
        title: row.title,
        pricePerNight: row.price_per_night,
        imageUrl: row.image,
        location: row.location
    };
}

export async function fetchListings(): Promise<Listing[]>{
    const { data, error } = await supabase
    .from('listings')
    .select('id, title, location, price_per_night, image')
    .order('created_at', { ascending: false })

    if(error) throw error;
    return (data as ListingRow[]).map(mapRowToListing);
}