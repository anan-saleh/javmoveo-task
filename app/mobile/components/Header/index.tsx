import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { UserAvatarDropdown } from '../UserAvatar';

export const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <Image source={require('../../assets/images/Icon-web.png')} style={styles.logo} />
        <Text style={styles.title}>JAMOVEO</Text>
      </View>
      <UserAvatarDropdown />
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
});
