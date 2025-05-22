import { AuthProvider } from "@/components/context/useAuth";
import { Slot } from 'expo-router';
import FlashMessage from 'react-native-flash-message';
import '../assets/css/global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
      <FlashMessage position="top" />
    </AuthProvider>
  );
}
