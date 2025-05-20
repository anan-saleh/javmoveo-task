import React from 'react';
import { View, StyleSheet, Image, Platform, useWindowDimensions } from 'react-native';
import AuthForm from './AuthForm';

export const LoginView: React.FC = () => {
  const isRegister = false;
  const photo = isRegister ? '../../assets/images/register.png' : '../../assets/images/login.png';
  const { width } = useWindowDimensions();
  const isWideScreen = Platform.OS === 'web' && width >= 768;
  if (isWideScreen) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.leftPane}>
          <AuthForm />
        </View>

        <View style={styles.rightPane}>
          <Image
            source={require(photo)}
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
