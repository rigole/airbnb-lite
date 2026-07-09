import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { SplashScreen } from "./components/SplashScreen";
import { Ionicons } from '@expo/vector-icons';
import { ListingCard } from "./components/ListingCard";
import { MOCK_LISTINGS } from "./data/listings";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [query, setQuery] = useState('');

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
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Explore</Text>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#222" />
              <TextInput
                style={styles.searchInput}
                placeholder="Where to?"
                placeholderTextColor="#717171"
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
  title:{
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
  }
});
