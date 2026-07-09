import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
type SplashScreenProps = {
  onFinish: () => void;
};

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
    const timer = setTimeout(onFinish, 2000);
  }, []);

  return (
    <Animated.View style={styles.container}>
      <StatusBar style="light" />
      <Animated.Text
        style={[styles.appName, { opacity, transform: [{ translateY }] }]}
      >
        Airbnb-lite
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: "#FF385C",
    alignItems: "center",
    justifyContent: "center",
  },
});
