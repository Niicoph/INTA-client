import { useQuery } from "@tanstack/react-query";
import { getSanitizantesSipan } from "@/services/sanidadServiceSipan";
import { type Producto } from "@/types/sanitizante";

export function useSanitizantesSipan() {
	const query = useQuery<Producto[]>({
		queryKey: ["sanitizantesData"],
		queryFn: () => getSanitizantesSipan(),
		staleTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
	};
}