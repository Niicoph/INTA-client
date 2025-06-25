import { useQuery } from "@tanstack/react-query";
import { type Producto } from "@/types/fertilizacion";
import { getFertilizantes } from "@/services/fertilizacionService";

export function useFertilizantes() {
    const query = useQuery<Producto[]>({
        queryKey: ["fertilizantesData"],
        queryFn: () => getFertilizantes(),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
}
