import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import { Header } from '../Header';

export default function MainLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot
            screenOptions={{
                headerShown: Platform.OS === "web" ? false : true,
            }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbee',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
