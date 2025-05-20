import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export const Waiting = () => {

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