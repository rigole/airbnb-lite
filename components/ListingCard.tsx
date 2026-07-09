import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Listing } from "../types/listing";

type Props = {
    listing: Listing;
};

export const ListingCard = ({ listing }: Props) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: listing.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                    {listing.title}
                </Text>
                <Text style={styles.location}>{listing.location}</Text>
                <Text style={styles.price}>
                    <Text style={styles.priceValue}>${listing.pricePerNight.toFixed(2)}</Text> night
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
    marginBottom: 20,
    },
    image: {
        width: '100%',
       aspectRatio: 1.2,
        borderRadius: 12,
        backgroundColor: '#EBEBEB',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    location: {
        fontSize: 13,
        color: '#717171',
        marginTop: 2,
    },
    price: {
        fontSize: 12,
        marginTop: 4,
        color: '#222',
    },
    priceValue: {
        fontWeight: '700',
    },
    info: {
        marginTop: 8,
    },
});

export default ListingCard;
