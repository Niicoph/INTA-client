import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRateBCRA } from "../services/API/fetchBCRAapi";

export function useExchangeRate(currency: string) {
  const query = useQuery({
    queryKey: ["exchangeRate", currency],
    queryFn: () => fetchExchangeRateBCRA(currency),
    staleTime: 1000 * 60 * 5, // 5 minutos sin refetch
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}