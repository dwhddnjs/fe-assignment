import axios from "axios";
import { useEffect, useState } from "react";

export type TopalbumTypes = {
  id: string;
  title: string;
  artist: string;
  category: string;
  price: string;
};

export const useTopalbums = (limit: number) => {
  const [data, setData] = useState<TopalbumTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/topalbums?limit=${limit}`
        );
        if (res) {
          const result = await res.data.feed.entry;
          const sortData = result.map((data: any) => ({
            id: data.id.attributes["im:id"],
            title: data["im:name"].label,
            artist: data["im:artist"].label,
            category: data.category.attributes.term,
            price: data["im:price"].label,
          }));
          setData(sortData);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [limit]);

  return { data, isLoading, error };
};
