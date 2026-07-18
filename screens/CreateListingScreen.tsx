import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useListings } from "../context/ListingsContext";
import { useTheme } from "../context/ThemeContext";
import { createListing } from "../lib/listings";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateListingsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { session } = useAuth();
  const { refetch } = useListings();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);

    if (!title || !location || !price || !image) {
      setError("Please fill in every field");
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError("Price must be a valid number");
      return;
    }
    if (!session) {
      setError("You must be logged in.");
      return;
    }
    setSubmitting(true);
    try {
      await createListing({
        title,
        location,
        pricePerNight: priceNumber,
        image,
        ownerId: session.user.id,
      });
      await refetch();
      navigation.goBack();
    } catch (error: any) {
      setError(error.message ?? "something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Host your home</Text>
        <TextInput
          placeholder="Listing title"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
          value={title}
          onChangeText={setTitle}
        />
         <TextInput
          placeholder="Location"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
          value={location}
          onChangeText={setLocation}
        />
         <TextInput
          placeholder="Price per night (USD)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          placeholder="Image Url"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          style={[styles.input, { borderColor: colors.inputBorder, color: colors.text }]}
          value={image}
          onChangeText={setImage}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable
        style={[styles.button, submitting && styles.buttonDisabled]}
        disabled={submitting}
        onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            {submitting ? 'Publishing...' : 'Publish listings'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 14,
  },
  error: {
    color: "#D93025",
    fontSize: 13,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FF385C",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: '700', fontSize: 15 }
});
