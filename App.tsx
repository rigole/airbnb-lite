import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { SplashScreen } from "./components/SplashScreen";
import { ListingCard } from "./components/ListingCard";
import { MOCK_LISTINGS } from "./data/listings";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar style="dark" />
      <FlatList
        data={MOCK_LISTINGS}
        renderItem={({ item }) => <ListingCard listing={item} />}
        keyExtractor={(item) => item.id}
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
  content: {
    padding: 16,
  },
  homeText: {
    fontSize: 16,
    color: "#222",
  },
});
