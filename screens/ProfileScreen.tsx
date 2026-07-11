import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "./LoginScreen";

export default function ProfileScreen() {
  const { isLoggedIn, session, logOut } = useAuth();
  if(!isLoggedIn){
    return <LoginScreen/>
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.name}>Hello, {session?.user.email}</Text>
      </View>
      <Pressable style={styles.logoutButton} onPress={logOut}>
        <Text style={styles.logoutText}>Log Out</Text>
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
    paddingHorizontal: 16
  },
  name: {
    color: "#222",
    fontSize: 17,
    fontWeight: '600',
  },
  logoutButton: {
    margin: 16,
    borderWidth:1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center'
  },
  logoutText: {
    color: '#222',
    fontWeight: '600'
  }
});
