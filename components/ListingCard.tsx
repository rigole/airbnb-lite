import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Listing } from "../types/listing";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useWishlist } from "../context/WishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

type Props = {
  listing: Listing;
  width?: number;
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const ListingCard = ({ listing, width }: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { colors, isDark } = useTheme();
  const saved = isWishlisted(listing.id);
  const isHorizontal = !!width;
  return (
    <Pressable
      style={[styles.card, isHorizontal &&  { width, marginBottom: 0, marginRight: 0 } ]}
      onPress={() => navigation.navigate("ListingDetail", { listing })}
    >
      <View style={styles.imageWrap}>
        <Image source={{ uri: listing.imageUrl }} style={styles.image} />
        <Pressable
          hitSlop={10}
          style={styles.heartButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
        >
          <Ionicons
            name={saved ? "heart" : "heart-outline"}
            size={22}
            color={saved ? "#FF385C" : "#fff"}
          />
        </Pressable>
        <View style={styles.info}>
          <Text  style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {listing.title}
          </Text>
          <Text  style={[styles.title, { color: colors.text }]}>{listing.location}</Text>
          <Text  style={[styles.title, { color: colors.textSecondary }]}>
            <Text style={styles.priceValue}>
              ${listing.pricePerNight.toFixed(2)}
            </Text>{" "}
            night
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  imageWrap: { position: "relative" },
  image: {
    width: "100%",
    aspectRatio: 1.2,
    borderRadius: 12,
    backgroundColor: "#EBEBEB",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  location: {
    fontSize: 13,
    color: "#717171",
    marginTop: 2,
  },
  price: {
    fontSize: 12,
    marginTop: 4,
    color: "#222",
  },
  priceValue: {
    fontWeight: "700",
  },
  info: {
    marginTop: 8,
  },
  heartButton: { position: "absolute", top: 10, right: 10 },
});

export default ListingCard;
