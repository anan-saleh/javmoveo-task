import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { socket } from '../../api/socket/socket';
import { useAuth } from '@/components/context/useAuth';

export const Live = () => {
  const router = useRouter();
  const song = JSON.parse(decodeURIComponent(useLocalSearchParams().song || '{}'));
  const { user } =  useAuth();

  useEffect(() => {
    socket.on('song-removed', () => {
      const destination = user.isAdmin ? '/admin/dashboard' : '/player';
      router.replace(destination);
    });
    return () => {
      socket.off('song-removed');
    };
  }, []);

  const quitSong = () => {
    socket.emit('remove-song');
  };

  const prepAllSongsAndLyrics = song?.lyricsWithChords?.flatMap((line) => {
    return line;
  })

  const getLyricsAndChords = () => {
      return prepAllSongsAndLyrics.map((item, i) => (
            <View key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={styles.lyricSegment}>
                    {item.chords && <Text style={styles.chord}>{item.chords + ' '}</Text>}
                    <Text>{item.lyrics}</Text>
                    {item.chords && <Text style={styles.chord}>{item.chords + ' '}</Text>}
                    <Text>{item.lyrics}</Text>
                </Text>
            </View>
        ))
  };

  return (
    <>
      <Text style={styles.title}>Opening:</Text>
      <View style={styles.box}>
        {getLyricsAndChords()}
        {user.isAdmin && (
          <TouchableOpacity onPress={quitSong} style={styles.quitButton}>
            <Text style={styles.quitButtonText}>Quit</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
  },
  box: {
    alignItems: 'flex-start',
    height: '100%',
    paddingHorizontal: 20,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lyricLine: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  lyricSegment: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 6,
    fontSize: 16,
    lineHeight: 24,
  },
  chord: {
    color: '#e0a100',
    fontWeight: 'bold',
  },
  quitButton: {
    marginTop: 30,
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffdddd',
    borderRadius: 8,
  },
  quitButtonText: {
    fontWeight: 'bold',
    color: '#d00',
  },
});
