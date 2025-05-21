import { useAuth } from "@/components/context/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {  View, ActivityIndicator } from "react-native";
import MainLayout from "@/components/MainLayout";

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
    <MainLayout />
  );
}
