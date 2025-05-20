import { AuthProvider } from "@/components/context/useAuth";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
        headerShown: Platform.OS === "web" ? false : true,
      }}/>
    </AuthProvider>
  );
}
