import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ListingCard } from "../components/ListingCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOCK_LISTINGS } from "../data/listings";
import { useTheme } from "../context/ThemeContext";
import { useListings } from "../context/ListingsContext";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const { colors, isDark } = useTheme();
  const { listings, loading, error } = useListings();

  const filteredListings = listings.filter((listing) =>
    `${listing.title} ${listing.location}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.homeContainer, { justifyContent: "center" }]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if(error){
    return (
      <SafeAreaView style={[styles.homeContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.textSecondary }}>Could not load listings.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={[styles.homeContainer, { backgroundColor: colors.background }]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <FlatList
        data={filteredListings}
        renderItem={({ item }) => <ListingCard listing={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
            <View
              style={[styles.searchBar, { borderColor: colors.inputBorder }]}
            >
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Where to?"
                placeholderTextColor={colors.textSecondary}
                value={query}
                onChangeText={setQuery}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
  },
  header: {
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  homeText: {
    fontSize: 16,
    color: "#222",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    gap: 8,
    borderColor: "#DDDDDD",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#222",
  },
  emptyText: {
    marginTop: 16,
    color: "#717171",
    textAlign: "center",
  },
});
