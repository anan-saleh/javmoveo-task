import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

type Props = {
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
};

export const LoginOptionsRow: React.FC<Props> = ({ rememberMe, setRememberMe }) => {
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text style={styles.rememberText}>Remember Me</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotText: {
    color: '#555',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    fontSize: 14,
  },
});
