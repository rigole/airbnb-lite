import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Listing } from '../types/listing';

export type Booking = {
    id: string;
    checkIn: string;
    listing: Listing;
    checkOut: string;
    guests: number;
    totalPrice: number;
}

type TripsContextType = {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider ({ children } : { children: ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const addBooking = (booking: Booking) => {
        setBookings((prev) => [booking, ...prev]);
    };

    return (
        <TripsContext.Provider value={{ bookings, addBooking }}>
            {children}
        </TripsContext.Provider>
    );
}

export function useTrips() {
    const context = useContext(TripsContext);
    if(!context){
        throw new Error("useTrips must be used within a tripsProvider");
    }
    return context;
}