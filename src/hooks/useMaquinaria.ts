import { useQuery } from "@tanstack/react-query";
import { getMaquinariaList } from "@/services/maquinariaService";
import { type MaquinariaList } from "@/types/maquinaria";

export function useMaquinaria() {
  const query = useQuery<MaquinariaList>({
    queryKey: ["maquinariaData"],
    queryFn: () => getMaquinariaList(),
    staleTime: 1000 * 60 * 10, // 10 minutos
    refetchOnWindowFocus: false,
  });

  // Podés filtrar o transformar según lo que necesites
  const maquinaria = query.data;

  return {
    data: maquinaria,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}