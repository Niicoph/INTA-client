import { useQuery } from "@tanstack/react-query";
import { getSanitizantes } from "@/services/sanidadService";
import { type Producto } from "@/types/sanitizante";

export function useSanitizantes() {
  const query = useQuery<Producto[]>({
    queryKey: ["sanitizantesData"],
    queryFn: () => getSanitizantes(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
