import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useResize } from '@/hooks/useResize';
import { useSongs } from '@/hooks/useSongs';
import { Song } from '@/api/songApi';

export const AdminDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const { songs } = useSongs();
  const router = useRouter();
  const { isMobile } = useResize();
  const handleSearch = (song: Song) => {
     if (query.trim()) {
      router.navigate(`/admin/result?query=${encodeURIComponent(query.trim())}`);
    } else {
      router.navigate(`/admin/result?query=${encodeURIComponent(song.name.trim())}`);
    }
  };

  const renderSong = ({ item }: any) => (
    <TouchableOpacity onPress={(e) => handleSearch(item)}>
      <View style={styles.songItem}>
        <Image source={item.image} style={styles.songImage} />
        <Text style={styles.songTitle}>{item.name}</Text>
        <View style={styles.songIcons}>
          <Text style={styles.icon}><Text style={styles.iconFont}>T</Text></Text>
          <Entypo name="video" size={20} style={styles.icon} />
          <FontAwesome5 name="music" size={18} style={styles.icon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentWrapper}>
          <View style={[
              styles.searchWrapper,
              { 
                width: isMobile ? '100%' : 400 
              }
            ]}>
            <TextInput
              style={styles.input}
              placeholder="Search song by name..."
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              placeholderTextColor="#333"
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
              <Ionicons name="search" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentWrapper}>
            <Text style={styles.recommendedText}>Recommended song list</Text>
            <FlatList
                data={songs}
                renderItem={renderSong}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={{ gap: 12 }}
            />
            </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%'
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
  },
  contentWrapper: {
    width: '100%',
    alignSelf: 'center',
    padding: 30,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1ede2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    paddingLeft: 10,
  },
  recommendedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1ede2',
    borderRadius: 10,
    padding: 12,
  },
  songImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 14,
  },
  songTitle: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  songIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 12,
  },
  iconFont: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});