import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from '@routes/index';
import { AuthProvider, useAuth } from '@hooks/auth';
export default function App() {
  const { user } = useAuth();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })
  if (!fontsLoaded) {
    return (
      <View>
        <Text>
          Loading
        </Text>
      </View>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={'#B83341'} translucent />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

