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
    addBookings: (booking: Booking) => void;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider ({ children } : { children: ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>([]);
}