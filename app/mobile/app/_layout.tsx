import { AuthProvider } from "@/components/context/useAuth";
import { Slot } from 'expo-router';
import '../assets/css/global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
