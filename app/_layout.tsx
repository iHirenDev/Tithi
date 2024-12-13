import { Stack } from "expo-router";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    'PTSerif-Bold':require('../assets/fonts/PTSerif-Bold.ttf'),
    'PTSerif-Regular':require('../assets/fonts/PTSerif-Regular.ttf'),
  })

  useEffect(() => {
    if(error) throw error

    if(fontsLoaded){
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])
  
  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    </Stack>
  );
}
