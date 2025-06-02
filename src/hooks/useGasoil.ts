import { useQuery } from "@tanstack/react-query";
import { getGasoils } from "@/services/gasoilService";


export function useGasoil(localidad: string) {
  const query = useQuery({
    queryKey: ["gasoilRate", localidad],
    queryFn: () => getGasoils({localidad}),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.error,
  };
}
