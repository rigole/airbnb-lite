import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen }  from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if(showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
 

  return (
    <View style={styles.homeContainer}>
      <StatusBar style="dark" />
      <Text style={styles.homeText}>Home screen (placeholder)!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 16,
    color: '#222',
  },
});
