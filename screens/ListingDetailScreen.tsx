import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ListingDetail">;

export const ListingDetailScreen = ({ route }: Props) => {
  const { listing } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: listing.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.location}>{listing.location}</Text>
          <Text style={styles.price}>
            <Text style={styles.priceValue}>
              ${listing.pricePerNight.toFixed(2)}
            </Text>{" "}
            night
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#EBEBEB",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },
  location: {
    fontSize: 16,
    color: "#717171",
    marginTop: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginTop: 12,
  },
  priceValue: {
    fontWeight: "700",
  },
});
