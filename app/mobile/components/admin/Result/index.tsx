import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSongs } from '@/hooks/useSongs';
import { socket } from '@/api/socket/socket';

export const Result = () => {
  const { query = '' } = useLocalSearchParams();
  const { songs } = useSongs(query as string);
  const router = useRouter();

  const filtered = songs.filter((song) =>
    song.name.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (song) => {
    socket.emit('select-song', song);
    router.push({ pathname: '/private/live', params: { song: JSON.stringify(song) } });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.songItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results for "{query}"</Text>
      {filtered.length === 0 ? (
        <Text>No results found.</Text>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  songItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 12,
    borderRadius: 6,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  artist: {
    color: '#666',
    fontSize: 13,
  },
});
