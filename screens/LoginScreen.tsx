import React, { useState } from "react";

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { signUp, logIn } = useAuth();

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    const result =
      mode === "login"
        ? await logIn(email, password)
        : await signUp(email, password);
    setSubmitting(false);
    if (result) setError(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {mode === "login" ? "Log In" : "Sign up"}
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#717171"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#717171"
        autoCapitalize="none"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable
        style={[styles.button, submitting && styles.buttonDisabled]}
        disabled={submitting}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {submitting
            ? "Please wait..."
            : mode === "login"
              ? "Log In"
              : "Sign up"}
        </Text>
      </Pressable>

      <Pressable onPress={() => setMode(mode === 'login' ? 'signup': 'login')}>
        <Text style={styles.switchText}>
            {mode === 'login' ? "Dont't have an account? sign Up" : "Already have an account? Sign In"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  switchText: {
    textAlign: "center",
    color: "#717171",
    marginTop: 16,
    fontSize: 13,
  },
});
