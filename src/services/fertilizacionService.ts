import { type Producto } from "@/types/fertilizacion";

export async function getFertilizantes(): Promise<Producto[]> {
    const response = await fetch("/productos.json");
    if (!response.ok) {
        throw new Error("No se pudo obtener la lista de sanitizantes.");
    }
    const data = await response.json();
    return data["fertilizantes"];
}
