import { type Tractor } from "@/types/maquinaria";

export async function getMaquinaria(): Promise<Tractor[]> {
    const response = await fetch("/src/utils/maquinaria.json");
    if (!response.ok) {
        throw new Error("No se pudo obtener la lista de tractores");
    }
    const data = await response.json();
    return data;
}