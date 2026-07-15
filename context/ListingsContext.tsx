import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Listing } from "../types/listing";
import { fetchListings } from "../lib/listings";

type ListingsContextType = {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined,
);

export function ListingsProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchListings();
      setListings(data);
    } catch (error: any) {
      setError(error.message ?? "failed to lead listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ListingsContext.Provider value={{ listings, loading, error, refetch: load }}>
        {children}
    </ListingsContext.Provider>
  )
}

export function useListings() {
    const context = useContext(ListingsContext);
    if(!context){
        throw new Error('useListings must be used withi a ListingsProvider');
    }
    return context;
}
