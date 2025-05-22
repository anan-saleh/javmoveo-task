import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { useAuth } from '../context/useAuth';
import { useRouter } from 'expo-router';

export const UserAvatarDropdown = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const onLogout = async () => {
    await logout();
    router.replace('/');
  };

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Image
          source={require('../../assets/images/avatar-placeholder.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                onLogout();
              }}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 16,
    paddingTop: 50
  },
  menu: {
    borderRadius: 8,
    padding: 10,
    width: 120,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginTop: 8,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuText: {
    color: '#facc15',
    fontSize: 16,
  },
});
