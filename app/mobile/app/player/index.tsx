import { useAuth } from '@/components/context/useAuth';
import { Text, View } from 'react-native';

export default function Index() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={async () => {
          await logout();
        }}>
        dashboard
      </Text>
    </View>
  );
}
