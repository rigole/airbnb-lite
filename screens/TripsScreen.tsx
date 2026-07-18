import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTrips } from "../context/TripsContext";
import { useTheme } from "../context/ThemeContext";

export default function TripsScreen() {
  const { bookings } = useTrips();
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={styles.title}>Trips Screen</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {item.listing.title}
            </Text>
            <Text
              style={[styles.cardSubtitle, { color: colors.textSecondary }]}
            >
              {item.checkIn} - {item.checkOut} . {item.guests} guest
              {item.guests > 1 ? "s" : ""}
            </Text>
            <Text style={[styles.cardPrice, { color: colors.text }]}>
              ${item.totalPrice} total
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: colors.textSecondary }}>
              No trips booked Yet
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#717171",
  },
  card: {
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  cardPrice: {
    fontSize: 13,
    color: "#222",
    marginTop: 6,
    fontWeight: "600",
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  cardSubtitle: { fontSize: 13, color: "#717171", marginTop: 6 },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },
});
