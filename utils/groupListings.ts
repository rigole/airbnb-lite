import { Listing } from "../types/listing";


export type ListingSection = {
    location: string;
    title: string;
    listings: Listing[];
}

export function groupListingsByLocation(listings: Listing[]): ListingSection[]{
    const map = new Map<string, Listing[]>();

    listings.forEach((listing) => {
        const key = listing.location;
        if(!map.has(key)) map.set(key, []);
        map.get(key)!.push(listing);
    });

    return Array.from(map.entries()).map(([location, items]) => ({
        location,
        title: `Homes in ${location}`,
        listings: items,
    }));
}