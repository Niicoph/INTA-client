import { useQuery } from "@tanstack/react-query";
import { fetchDieselAPI } from "../services/API/fetchDieselAPI";

export function useGasoil(localidad: string) {
  const query = useQuery({
    queryKey: ["gasoilRate", localidad],
    queryFn: () => fetchDieselAPI({localidad}),
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.error,
  };
}
