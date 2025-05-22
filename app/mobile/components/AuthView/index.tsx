import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Platform, useWindowDimensions } from 'react-native';
import AuthForm from './AuthForm';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../context/useAuth';
import { useRouter } from 'expo-router';

export const LoginView: React.FC = () => {
  const route = useRoute();
  const router = useRouter();
  const isRegister = route.name === 'register';
  const source = isRegister ? require('../../assets/images/register.png') : require('../../assets/images/login.png');
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      router.navigate(user.isAdmin ? '/admin' : '/player');
    }
  }, [user]); 
  const isWideScreen = Platform.OS === 'web' && width >= 768;
  if (isWideScreen) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.leftPane}>
          <AuthForm />
        </View>

        <View style={styles.rightPane}>
          <Image
            source={source}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.centeredContainer}>
      <AuthForm />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  leftPane: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFEFA',

  },
  rightPane: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
