import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SplashScreen } from "./components/SplashScreen";
import { StatusBar } from "expo-status-bar";
import { Listing } from "./types/listing";
import { WishlistProvider } from "./context/WishlistContext";
import MainTabs from "./navigation/MainTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListingDetailScreen } from "./screens/ListingDetailScreen";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <WishlistProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ListingDetail"
              component={ListingDetailScreen}
              options={{ title: "" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </WishlistProvider>
    </SafeAreaProvider>
  );
}
