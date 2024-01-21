import { fetcher } from "@/lib/axios";
import { useEffect, useState } from "react";

export type KeyStringTypes = {
  [key: string]: string;
};

export type AttributesTypes = {
  [key: string]: KeyStringTypes;
};

export type ResponseDataTypes = {
  category: AttributesTypes;
  id: AttributesTypes & KeyStringTypes;
  "im:artist": AttributesTypes & KeyStringTypes;
  "im:contentType": AttributesTypes;
  "im:image": Array<AttributesTypes & KeyStringTypes>;
  "im:itemCount": KeyStringTypes;
  "im:name": KeyStringTypes;
  "im:price": AttributesTypes & KeyStringTypes;
  "im:releaseDate": AttributesTypes & KeyStringTypes;
  link: AttributesTypes;
  rights: KeyStringTypes;
  title: KeyStringTypes;
};

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
        const res = await fetcher.get(`/api/topalbums?limit=${limit}`);
        if (res) {
          const result = await res.data.feed.entry;
          const sortData = result.map((data: ResponseDataTypes) => ({
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
