import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  return <Stack
    screenOptions={{
    headerShown: Platform.OS === "web" ? false : true,
  }}/>;
}
