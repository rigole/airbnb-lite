import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trips Screen</Text>
      <View style={styles.center}>
        <Text style={styles.emptyText}>You have no trips booked</Text>
      </View>
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
});