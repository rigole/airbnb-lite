import React, { useState } from "react";

import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function LoginScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors, isDark } = useTheme();

  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { signUp, logIn, session } = useAuth();
  const { t } = useLanguage()

  const handleSubmit = async () => {
    setError(null);
    setInfoMessage(null);
    setSubmitting(true);

    if (mode === "signup") {
      const signUpError = await signUp(email, password);
      setSubmitting(false);

      if (signUpError) {
        setError(signUpError);
        return;
      }
      if (!session) {
        setInfoMessage(
          `We sent a confirmation link to ${email}, Confirm it and then login`,
        );

        setMode("login");
        setPassword("");
      }
      return;
    }

    const loginError = await logIn(email, password);
    setSubmitting(false);
    if (loginError) setError(loginError);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={styles.title}>
        {mode === "login" ? `${t('login.loginTitle')}` : `${t('signupTitle')}`}
      </Text>

      {infoMessage && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{infoMessage}</Text>
        </View>
      )}

      <TextInput
        placeholder={t('login.email')}
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[styles.input, { color: colors.text }]}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder={t('login.password')}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        style={[styles.input, { color: colors.text }]}
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
            ? `${t('login.waiting')}`
            : mode === "login"
              ? `${t('login.loginButton')}`
              : `${t('login.signupButton')}`}
        </Text>
      </Pressable>

      <Pressable onPress={() => setMode(mode === "login" ? "signup" : "login")}>
        <Text style={styles.switchText}>
          {mode === "login"  
            ? `${t('login.switchToSignup')}`
            : `${t('login.switchToLogin')}`}
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
  infoText: {
    color: "#8A5A00",
    fontSize: 13,
    lineHeight: 18,
  },
  switchText: {
    textAlign: "center",
    color: "#717171",
    marginTop: 16,
    fontSize: 13,
  },
  infoBox: {
    backgroundColor: "#FFF4E5",
    borderRadius: 10,
    lineHeight: 18,
  },
});
