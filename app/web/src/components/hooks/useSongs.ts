import { useEffect, useState } from "react";
import { getSongsByName, type Song } from "../../api/songApi";

export const useSongs = (query: string) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSongsByName(query);
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
