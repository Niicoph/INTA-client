import { useQuery } from "@tanstack/react-query";
import { getMaquinariaListSipan } from "@/services/maquinariaServiceSipan";
import { type MaquinariaList } from "@/types/maquinaria";

export function useMaquinariaSipan() {
	const query = useQuery<MaquinariaList>({
		queryKey: ["maquinariaData"],
		queryFn: () => getMaquinariaListSipan(),
		staleTime: 1000 * 60 * 10,
		refetchOnWindowFocus: false,
	});

	return {
		data: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
	};
}