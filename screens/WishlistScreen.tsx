import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WishlistScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Wishlist Screen</Text>
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
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
