import { useState, useEffect } from "react";

export default function useFetch(fetchFunction, params = null, immediate = true) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = async (overrideParams) => {
    setLoading(true); setError(null);
    try {
      const result = await fetchFunction(overrideParams || params);
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => { if (immediate) execute(); }, []);

  return { data, loading, error, refetch: execute };
}
