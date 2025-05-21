import { useAuth } from "@/components/context/useAuth";
import MainLayout from "@/components/MainLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);

        if (!currentUser) {
          router.replace("/login");
        } else if (currentUser.isAdmin) {
          router.replace("/unauthorized");
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MainLayout />
  );
}
