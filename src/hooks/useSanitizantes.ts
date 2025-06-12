import { useQuery } from "@tanstack/react-query";
import { type Sanitizante } from "@/types/sanitizante";
import { getSanitizantes } from "@/services/sanidadService";

export function useSanitizantes() {
    const query = useQuery<Sanitizante[]>({
        queryKey: ["sanidadData"],
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
