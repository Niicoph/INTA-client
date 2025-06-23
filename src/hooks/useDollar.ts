import { useQuery } from "@tanstack/react-query";
import { getDollar } from "@/services/dollarService";

export function useDollar() {
  const query = useQuery({
    queryKey: ["dollarRate"],
    queryFn: () => getDollar(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });


    const dollarRate = {
        name: "Dolar Oficial",
        value: query.data?.results[0].detalle[0].tipoCotizacion,
        date: query.data?.results[0].fecha,
    }

  return {
    data: dollarRate,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
