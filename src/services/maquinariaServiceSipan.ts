import sipanApi from "@/api/sipanApi";
import { type MaquinariaList } from "@/types/maquinaria";
import { type MaquinariaSipan } from "@/types/sipan";
import { adapterMaquinarias } from "@/utils/Adapter/adapterMaquinarias";

export async function getMaquinariaSipan(): Promise<MaquinariaList> {
  const response = await sipanApi.post('/maquinaria.json.php', new URLSearchParams({ token: import.meta.env.VITE_TOKEN_MAQUINARIAS }));
  
  const sipanData: MaquinariaSipan[] = Object.values(response.data);
  //Adapta datos provenientes del SIPAN al tipado utilizado durante el desarrollo
  const data: MaquinariaList = adapterMaquinarias({data: sipanData});

  return data;
}