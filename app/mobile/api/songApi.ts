import axiosInstance from "./axiosInstance";

export interface Song {
  _id: string;
  name: string;
  artist: string;
  imageUrl: string;
  lyricsWithChords: { lyrics: string; chords?: string }[][];
};

export const getAllSongs = async (): Promise<Song[]> => {
  const response = await axiosInstance.get<Song[]>(`/songs/getAllSongs`);
  return response.data;
};

export const getSongsByName = async (query: string): Promise<Song[]> => {
  const response = await axiosInstance.get<Song[]>(`/songs/getAllSongs?query=${encodeURIComponent(query)}`);
  return response.data;
};