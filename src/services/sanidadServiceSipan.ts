import sipanApi from "@/api/sipanApi";
import { type Producto } from "@/types/sanitizante";
import { type ProductoSipan } from '@/types/sipan';
import { adapterProductosSanidad } from "@/utils/Adapter/adapterProductos";

export async function getSanitizantesSipan(): Promise<Producto[]> {
  const response = await sipanApi.post('/productos.json.php', new URLSearchParams({ token: import.meta.env.VITE_TOKEN_PRODUCTOS }));
  
  const sipanData: ProductoSipan[] = Object.values(response.data);
  //Adapta datos provenientes del SIPAN al tipado utilizado durante el desarrollo
  const data: Producto[] = adapterProductosSanidad({data: sipanData});

  return data;
}