import { useQuery } from "@tanstack/react-query";
import { fetchDieselAPI } from "../services/API/fetchDieselAPI";

export function useGasoil(province: string) {
  const query = useQuery({
    queryKey: ["gasoilRate", province],
    queryFn: () => fetchDieselAPI({province}),
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.error,
  };
}
