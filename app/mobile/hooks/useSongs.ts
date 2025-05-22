import { getAllSongs, getSongsByName, Song } from "@/api/songApi";
import { useEffect, useState } from "react";

export const useSongs = (query: string) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = query ? await getSongsByName(query) : await getAllSongs();
        setSongs(data);
      } catch (err: any) { // todo: fix the any type to handle axios errors
        setError(err?.message || "Failed to fetch songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [query]);

  return { songs, loading, error };
};