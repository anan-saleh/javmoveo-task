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
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';

const recommendedSongs = [
  { id: '1', title: 'Echo – The Weeknd', image: 'someImage' },
  { id: '2', title: 'Gold – Dua Lipa', image: 'someImage' },
  { id: '3', title: 'Falling – Harry Styles', image: 'someImage' },
  { id: '4', title: 'Waves – Dean Lewis', image: 'someImage' },
  { id: '5', title: 'Shivers – Ed Sheeran', image: 'someImage' },
  { id: '6', title: 'Alive – Sia', image: 'someImage' },
  { id: '7', title: 'Horizon – Coldplay', image: 'someImage' },
];

export const AdminDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handleSearch = () => {
    console.log(query);
     if (query.trim()) {
      router.navigate(`/admin/result?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const renderSong = ({ item }: any) => (
    <View style={styles.songItem}>
      <Image source={item.image} style={styles.songImage} />
      <Text style={styles.songTitle}>{item.title}</Text>
      <View style={styles.songIcons}>
        <Text style={styles.icon}><Text style={styles.iconFont}>T</Text></Text>
        <Entypo name="video" size={20} style={styles.icon} />
        <FontAwesome5 name="music" size={18} style={styles.icon} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Search any song..."
              value={query}
              onChangeText={setQuery}
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
                data={recommendedSongs}
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
    width: 400,
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