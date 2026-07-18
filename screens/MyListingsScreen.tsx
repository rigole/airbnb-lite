import { View, Text, StyleSheet, Alert, ActivityIndicator, SafeAreaView, Image, FlatList, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useListings } from "../context/ListingsContext";
import { Listing } from "../types/listing";
import { useEffect, useState } from "react";
import { deleteListing, fetchListingsByOwnerId } from "../lib/listings";
import { Ionicons } from "@expo/vector-icons";

export default function MyListingsScreen() {
  const { colors } = useTheme();
  const { session } = useAuth();
  const { refetch } = useListings();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!session) return;
    setLoading(true);
    const data = await fetchListingsByOwnerId(session.user.id);
    setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [session]);

  const handleDelete = async (listing: Listing) => {
    Alert.alert(
      "Delete Listing",
      `${listing.title} will be deleted. Are you sure you want to continue?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteListing(listing.id);
              setListings(listings.filter((l) => l.id !== listing.id));
              refetch();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to delete listing");
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        style={
          (styles.container,
          { backgroundColor: colors.background, justifyContent: "center" })
        }
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>My Listings</Text>
      <FlatList 
        data={listings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: colors.border }]}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
              <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{item.location}</Text>
              <Text style={[styles.cardPrice, { color: colors.text }]}>${item.pricePerNight} / night</Text>
            </View>
            <Pressable hitSlop={10} onPress={() => handleDelete(item)}>
              <Ionicons name="trash-outline" size={20} color="#D93025" />
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: colors.textSecondary }}>
              You have not listed any places yet
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    paddingBottom: 8,
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  cardSubtitle: {
    fontSize: 13,
    marginTop: 2
  }
});
