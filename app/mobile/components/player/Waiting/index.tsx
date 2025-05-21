import { socket } from '@/api/socket/socket';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export const Waiting = () => {
  const router = useRouter();
  useEffect(() => {
    socket.on('song-selected', (data) => {
      router.push({ pathname: '/private/live', params: { song: JSON.stringify(data) } });
    });

    return () => {
      socket.off('song-selected');
    };
  }, []);

  return (
    <View style={styles.container}>
        <View>
           <Image
                source={require('../../../assets/images/music-note-1.png')}
                resizeMode="cover"
            />
        </View>
        <View style={{ marginTop: 15 }}>
            <Text style={styles.text}>
                Waiting for next song...
            </Text>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 38
  }
});