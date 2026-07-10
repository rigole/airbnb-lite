import React, { createContext, useContext, ReactNode, useState } from "react";

type WishlistContextType = {
    wishlist: string[];
    toggleWishlist: (id: string) => void;
    isWishlisted: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<string[]>([]);

    const toggleWishlist = (id: string) => {
        setWishlist((prevWishlist) => {
            if (prevWishlist.includes(id)) {
                return prevWishlist.filter((itemId) => itemId !== id);
            } else {
                return [...prevWishlist, id];
            }
        });
    }
    const isWishlisted = (id: string) => wishlist.includes(id);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if(!context){
        throw new Error('usewhishlist must be within in wishlistprovider')
    }
    return context;
    
}