import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/useAuth';

export const Header: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <Image source={require('../../assets/images/Icon-web.png')} style={styles.logo} />
        <Text style={styles.title}>JAMOVEO</Text>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    color: '#facc15',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#facc15',
    fontSize: 16,
  },
});
