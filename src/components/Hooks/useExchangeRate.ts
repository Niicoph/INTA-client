import { useEffect, useState } from "react";
import { fetchExchangeRateBCRA } from "../../services/fetchBCRAapi";
import type { Result } from "../../services/fetchBCRAapi";

export function useExchangeRate(currency: string) {
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchExchangeRateBCRA(currency);
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency]);

  return { data, loading, error };
}
