import { type Producto } from "@/types/sanitizante";

export async function getSanitizantes(): Promise<Producto[]> {
    const response = await fetch("/pasanitizante.json");
    if (!response.ok) {
        throw new Error("No se pudo obtener la lista de sanitizantes.");
    }
    const data = await response.json();
    return data;
}
