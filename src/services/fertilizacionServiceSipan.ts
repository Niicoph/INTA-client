import sipanApi from "@/api/sipanApi";
import { type Producto } from "@/types/fertilizacion";
import { type ProductoSipan } from '@/types/sipan';
import { adapterProductosFertilizantes } from "@/utils/Adapter/adapterProductos";

export async function getFertilizantesSipan(): Promise<Producto[]> {
  const response = await sipanApi.post('/productos.json.php', new URLSearchParams({ token: import.meta.env.VITE_TOKEN_PRODUCTOS }));
  
  const sipanData: ProductoSipan[] = Object.values(response.data);
  //Adapta datos provenientes del SIPAN al tipado utilizado durante el desarrollo
  const data: Producto[] = adapterProductosFertilizantes({data: sipanData});

  return data;
}