import axios from "axios";
import { useEffect, useState } from "react";

export const useTopalbums = () => {
  const [data, setData] = useState<any>(null);
  console.log("data: ", data);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/topalbums`
        );
        if (res) {
          const result = await res.data.feed.entry;
          const sortData = result.map((data: any, i: number) => ({
            id: i + 1,
            title: data["im:name"].label,
            artist: data["im:artist"].label,
            category: data.category.attributes.term,
            price: data["im:price"].label,
            cover: null,
          }));
          setData(sortData);
        }
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const mutate = ({ id, ctx }: any) => {
    const prevState = [...data];
    const findIndex = prevState.find((el) => el.id === id);

    console.log("ctx: ", ctx);

    prevState[id - 1] = {
      ...findIndex,
      cover: ctx,
    };

    setData(prevState);
  };

  return { data, isLoading, error, mutate };
};
