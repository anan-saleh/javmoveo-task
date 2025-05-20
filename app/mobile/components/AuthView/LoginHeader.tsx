import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const LoginHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Welcome to JaMoveo</Text>
      <Text style={styles.title}>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  subTitle: {
    color: '#718096',
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#b7791f',
  },
});
