import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_LISTINGS } from "../data/listings";
import { useWishlist } from "../context/WishlistContext";
import ListingCard from "../components/ListingCard";
import { useTheme } from "../context/ThemeContext";
import { useListings } from "../context/ListingsContext";

export default function WishlistScreen() {
  const { wishlist } = useWishlist();
  const { colors } = useTheme();
  const { listings } = useListings();
  const savedListings = listings.filter((listing) =>
    wishlist.includes(listing.id),
  );
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Wishlist Screen</Text>
      <FlatList
        data={savedListings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => <ListingCard listing={item} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: colors.textSecondary }}>Your wishlist is empty</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    padding: 16,
  },
  content: { padding: 16, flexGrow: 1 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#717171",
  },
});
