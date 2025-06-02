import { useQuery } from "@tanstack/react-query";
import { getDollars } from "@/services/dollarService";
import { type Dollar } from "@/types/dollar";

export function useDollar() {
  const query = useQuery({
    queryKey: ["dollarRate"],
    queryFn: () => getDollars(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchOnWindowFocus: false,
  });

  const filteredData = query.data?.filter((dollar : Dollar) => {
    const excludedTypes = [
      "Bolsa",
      "Contado con liquidación",
      "Mayorista",
      "Cripto",
      "Blue",
    ];
    return !excludedTypes.includes(dollar.nombre);
  });

  return {
    data: filteredData,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
