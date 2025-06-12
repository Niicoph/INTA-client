import { type MaquinariaList } from "@/types/maquinaria";

export async function getMaquinariaList(): Promise<MaquinariaList> {
    const response = await fetch("/maquinaria.json");
    if (!response.ok) {
        throw new Error("No se pudo obtener la lista de maquinarias");
    }
    const data = await response.json();
    return data;
}
