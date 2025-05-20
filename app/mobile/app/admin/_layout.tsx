import { useAuth } from "@/components/context/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRouter, Stack } from "expo-router";
import { Platform, View, ActivityIndicator } from "react-native";

export default function AdminLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);

        if (!currentUser) {
          router.replace("/login");
        } else if (!currentUser.isAdmin) {
          router.replace("/unauthorized");
        }
      } catch (error) {
        console.error("Error checking admin user:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: Platform.OS === "web" ? false : true,
      }}
    />
  );
}
