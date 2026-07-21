import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "./LoginScreen";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const OPTIONS: { label: string; value: "system" | "light" | "dark" }[] = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export default function ProfileScreen({ navigation }: any) {
  const { isLoggedIn, session, logOut } = useAuth();
  const { colors, override, setOverride } = useTheme();
  const {
    override: langOverride,
    setOverride: setLangOverride,
    t,
  } = useLanguage();
  const LANG_OPTIONS: { label: string; value: "system" | "en" | "fr" }[] = [
    { label: "System", value: "system" },
    { label: "EN", value: "en" },
    { label: "FR", value: "fr" },
  ];
  if (!isLoggedIn) {
    return <LoginScreen />;
  }
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      <View style={styles.card}>
        <Text style={[styles.name, { color: colors.text }]}>
          Hello, {session?.user.email}
        </Text>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
        Appearance
      </Text>
      <View style={[styles.segmentRow, { borderColor: colors.border }]}>
        {OPTIONS.map((option) => {
          const active = override === option.value;
          return (
            <Pressable
              key={option.value}
              style={[
                styles.segment,
                active && { backgroundColor: colors.primary },
              ]}
              onPress={() => setOverride(option.value)}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: active ? "#fff" : colors.text },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
        {t("profile.language")}
      </Text>
      <View style={[styles.segmentRow, { borderColor: colors.border }]}>
        {LANG_OPTIONS.map((option) => {
          const active = langOverride === option.value;
          return (
            <Pressable
              key={option.value}
              style={[
                styles.segment,
                active && { backgroundColor: colors.primary },
              ]}
              onPress={() => setLangOverride(option.value)}
            >
              <Text
                style={[
                  styles.segmentText,
                  { color: active ? "#fff" : colors.text },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={[styles.hostButton, { borderColor: colors.border }]}
        onPress={() => navigation.navigate("CreateListings")}
      >
        <Text style={[styles.hostButtonText, { color: colors.text }]}>
          {t('profile.hostButton')}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.hostButton, { borderColor: colors.border }]}
        onPress={() => navigation.navigate("MyListings")}
      >
        <Text style={[styles.hostButtonText, { color: colors.text }]}>
          {t('profile.myListings')}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.logoutButton, { borderColor: colors.border }]}
        onPress={logOut}
      >
        <Text style={[styles.logoutText, { color: colors.text }]}>
          {t('profile.logout')}
        </Text>
      </Pressable>
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
  card: {
    paddingHorizontal: 16,
  },
  name: {
    color: "#222",
    fontSize: 17,
    fontWeight: "600",
  },
  logoutButton: {
    margin: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutText: {
    color: "#222",
    fontWeight: "600",
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
  },
  segmentRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop:8,
    textTransform: "uppercase",
  },
  hostButton: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  hostButtonText: {
    fontWeight: "600",
  },
});
