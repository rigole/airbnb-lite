import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useTrips } from "../context/TripsContext";
import { useTheme } from "../context/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Booking">;

const NIGHTS = 3;

export default function BookingScreen({ route, navigation }: Props) {
  const { listing } = route.params;
  const { addBooking } = useTrips();
  const [guests, setGuests] = useState(1);
  const { colors } = useTheme();
  const [confirmed, setConfirmed] = useState(false);

  const subtotal = listing.pricePerNight * NIGHTS;
  const serviceFee = Math.round(subtotal * 0.12);

  const total = subtotal * serviceFee;

  const handleConfirm = () => {
    addBooking({
      id: `${listing.id}-${Date.now()}`,
      listing,
      checkIn: "In 7 days",
      checkOut: "In 10 days",
      guests,
      totalPrice: total,
    });
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <SafeAreaView style={[styles.container , { backgroundColor: colors.background }]}>
        <View style={styles.center}>
          <Ionicons name="checkmark-circle" size={64} color="#1b7a3d" />
          <Text style={styles.confirmedTitle}>Booking Confirmed!</Text>
          <Pressable
            style={styles.primaryButton}
            onPress={() => navigation.navigate("MainTabs", { screen: 'Profile' })}
          >
            <Text style={styles.primaryButtonText}>View my trips</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{listing.title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary } ]}>
          {NIGHTS} - {listing.location}
        </Text>

        <View style={styles.divider} />

        <View style={styles.guestsRow}>
          <Text style={styles.label}>Guests</Text>
          <View style={styles.stepper}>
            <Pressable
              style={styles.stepperButton}
              onPress={() => setGuests((g) => Math.max(1, g - 1))}
            >
              <Ionicons name="remove" size={16} color="#222" />
            </Pressable>
            <Text style={styles.stepperValue}>{guests}</Text>
            <Pressable
              style={styles.stepperButton}
              onPress={() => setGuests((g) => g + 1)}
            >
              <Ionicons name="add" size={16} color="#222" />
            </Pressable>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            ${listing.pricePerNight} x {NIGHTS} nights
          </Text>
          <Text style={styles.priceValue}>${subtotal}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Service fee</Text>
          <Text style={styles.priceValue}>${serviceFee}</Text>
        </View>
        <View style={styles.divider} />
        < View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>${total}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={handleConfirm}>
            <Text style={styles.primaryButtonText}>Confirm and Pay</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: "700", color: "#222" },
  subtitle: { fontSize: 14, color: "#717171", marginTop: 4 },
  divider: { height: 1, backgroundColor: "#EBEBEB", marginVertical: 18 },
  label: { fontSize: 15, color: "#222" },
  guestsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepper: { flexDirection: "row", alignItems: "center", gap: 14 },
  stepperButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#B0B0B0",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValue: {
    fontSize: 15,
    fontWeight: "600",
    minWidth: 16,
    textAlign: "center",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priceLabel: { fontSize: 14, color: "#222" },
  priceValue: { fontSize: 14, color: "#222" },
  totalLabel: { fontSize: 15, fontWeight: "700", color: "#222" },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: "#EBEBEB " },
  primaryButton: {
    backgroundColor: "#FF385C",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 20,
  },
  confirmedTitle: { fontSize: 18, fontWeight: "700", color: "#222" },
});
