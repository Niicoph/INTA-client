import { useQuery } from "@tanstack/react-query";
import { getMaquinaria } from "@/services/maquinariaService";
import { type Tractor } from "@/types/maquinaria";

export function useMaquinaria() {
  const query = useQuery<Tractor[]>({
    queryKey: ["maquinariaData"],
    queryFn: () => getMaquinaria(),
    staleTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  });

  // Podés filtrar o transformar según lo que necesites
  const tractors = query.data;

  return {
    data: tractors,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}