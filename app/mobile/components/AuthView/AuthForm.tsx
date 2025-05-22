import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { LoginOptionsRow } from './LoginOptionsRow';
import { useAuth } from '../context/useAuth';
import { useRoute } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';

const instruments = ['Guitar', 'Piano', 'Drums', 'Violin', 'Bass'];

export default function AuthForm() {
  const route = useRoute();
  const router = useRouter();
  const isRegister = route.name === 'register';
  const { login, register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [instrument, setInstrument] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await register({
        username, password, instrument, isAdmin
      });
      router.navigate("/login");
      } else {
        const res = await login({
          username, password
        });
        router.navigate(res.isAdmin ? "/admin" : "/player");
      }
    } catch (error) {
      const description = error?.response?.data?.message;
      showMessage({
        message: "Error",
        description,
        type: "danger",
      });
    }
  };

  const titleText = isRegister ? 'Register' : 'Login';
  const userNameText = isRegister ? 'Username*' : 'Enter your Username*';
  const passwordText = isRegister ? 'Create password*' : 'Enter your Password*';
  const buttonText = isRegister ? 'Register' : 'Login';
  const navigationText = isRegister ? 'Already have an account?' : 'Don’t have an account?';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subTitle}>Welcome to JaMoveo</Text>
        <Text style={styles.title}>{titleText}</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{userNameText}</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
        />
      </View>

{
  (isRegister && !isAdmin) ? 
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Your instrument*</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          mode="dialog"
          selectedValue={instrument}
          onValueChange={(value) => setInstrument(value)}
          style={styles.picker}
          dropdownIconColor="#718096"
          
        >
          <Picker.Item label="Select your instrument" value="" />
          {instruments.map((instrument) => (
            <Picker.Item key={instrument} label={instrument} value={instrument} />
          ))}
        </Picker>
      </View>
    </View> : null
}

    <View style={styles.inputGroup}>
      <Text style={styles.label}>{passwordText}</Text>
      <View style={styles.passwordContainer}>
          <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.inputWithIcon}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} style={styles.iconWrapper}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#718096" />
          </TouchableOpacity>
      </View>
      <LoginOptionsRow rememberMe={rememberMe} setRememberMe={setRememberMe} />
    </View>
  {
    isRegister ? 
      <View style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <Checkbox
          value={isAdmin}
          onValueChange={setIsAdmin}
          style={{ marginRight: 5 }}
        />
        <Text style={styles.label}>Is Admin ?</Text>
      </View> : null
  }
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          {navigationText}{' '}
          <Text
            style={styles.registerLink}
          >
            <Link href={isRegister ? "/login" : "/register"}>
              {isRegister ? 'Log in' : 'Register'}
            </Link>
          </Text>
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '90%',
    maxWidth: 450,
    alignSelf: 'center',
  },
  header: {
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f3eee4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
    passwordContainer: {
    position: 'relative',
    width: '100%',
    },
    inputWithIcon: {
    backgroundColor: '#f3eee4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    paddingRight: 40,
    },
    iconWrapper: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    },
    eyeButton: {
        paddingHorizontal: 10,
    },
    button: {
    backgroundColor: '#f6e05e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  registerContainer: {
  marginTop: 20,
  alignItems: 'center',
},
registerText: {
  fontSize: 14,
  color: '#6b7280',
},
registerLink: {
  color: '#854d0e',
  fontWeight: '600',
},
  pickerContainer: {
    backgroundColor: '#f3eee4',
    borderRadius: 8,
    marginBottom: 20,
  },
    pickerWrapper: {
    backgroundColor: '#f3eee4',
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});