import { useQuery } from "@tanstack/react-query";
import { fetchDieselAPI } from "../services/API/fetchDieselAPI";

//hooks identicos con dolar, se debería poder unificar usando useQueries, pendiente de prueba

export function useGasoilRate(province: string) {
  const query = useQuery({
    queryKey: ["gasoilRate", province],
    queryFn: () => fetchDieselAPI(province),
    staleTime: 1000 * 60 * 5, // 5 minutos sin refetch
  });

  return {    
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}