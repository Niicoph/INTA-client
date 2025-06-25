import { useQuery } from "@tanstack/react-query";
import { getMaquinariaList } from "@/services/maquinariaService";
import { type MaquinariaList } from "@/types/maquinaria";

export function useMaquinaria() {
  const query = useQuery<MaquinariaList>({
    queryKey: ["maquinariaData"],
    queryFn: () => getMaquinariaList(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}