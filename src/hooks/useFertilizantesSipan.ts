import { useQuery } from "@tanstack/react-query";
import { getFertilizantesSipan } from "@/services/fertilizacionServiceSipan";
import { type Producto } from "@/types/fertilizacion";

export function useFertilizantesSipan() {
	const query = useQuery<Producto[]>({
		queryKey: ["fertilizantesData"],
		queryFn: () => getFertilizantesSipan(),
		staleTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
	};

}