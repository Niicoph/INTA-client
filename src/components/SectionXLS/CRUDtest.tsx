// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// PARA QUE FUNCIONE EL Query HAY QUE MODIFICAR App.tsx con:
/* 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
return (
    <QueryClientProvider client={queryClient}>
        <App>
    </QueryClientProvider>
*/

// FUNCIONA PUT (MODIFICACIÓN DE DATOS) CON SCRIPT DESDE LA CONSOLA DEL CHROME
/* Para probar hay que hacer en App.tsx un modelo del objeto y pasarlo por prompt a <CRUDtest implemento={testImplemento} />
const testImplemento = {
  id: "4",
  nombre: "Pala modificado desde navegador",
  precio_usd: 5500,
  coef_gastos_conservacion: 0.06,
  horas_utiles: 1600,
  valor_residual_pct: 0.15,
  consumo_litros_hora_CV: 0.35
};

export default function CRUDtest({implemento}: {
  implemento: any;  
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (editado: any) =>
      fetch(`http://localhost:3001/api/maquinaria/implementos/${implemento.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editado),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['implemento'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = Object.fromEntries(new FormData(form).entries());
    const parsed = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, isNaN(+v) ? v : Number(v)])
    );

    mutation.mutate({ ...implemento, ...parsed });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {Object.keys(implemento).map((key) => (
        <Input key={key} name={key} defaultValue={implemento[key]} />
      ))}
      <Button type="submit">Guardar cambios</Button>
    </form>
  );
}
*/

// FUNCIONA DELETE (BORRADO DE DATOS)
/* Para probar hay que pasarlo por prompt a <CRUDtest id="value" />
export default function CRUDtest({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      fetch(`http://localhost:3001/api/maquinaria/implementos/${id}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['implementos'] });
    }
  });

  return <button onClick={() => mutation.mutate()}>Eliminar</button>; 
}
*/

// FUNCIONA PUT (INGRESO DE DATOS)
/* export default function CRUDtest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (nuevo: any) =>
      fetch("http://localhost:3001/api/maquinaria/implementos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["implementos"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const nuevo = {
      id: form.identificador.value,
      nombre: form.nombre.value,
      precio_usd: Number(form.precio.value),
      coef_gastos_conservacion: Number(form.coef.value),
      horas_utiles: Number(form.horas.value),
      valor_residual_pct: Number(form.valor.value),
      consumo_litros_hora_CV: Number(form.consumo.value),
    };

    mutation.mutate(nuevo);
  };

  return (
    // SIN VERIFICACIÓN DE DATOS, BACKEND TAMPOCO TIENE VERIFICACIÓN

    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Alta de Implemento</Label>
      <Input name="identificador" placeholder="ID" required />
      <Input name="nombre" placeholder="Nombre" required />
      <Input name="precio" type="number" placeholder="Precio USD" required />
      <Input name="coef" type="number" step="0.00001" placeholder="Coef. conservación" />
      <Input name="horas" type="number" placeholder="Horas útiles" />
      <Input name="valor" type="number" placeholder="% Valor residual" />
      <Input name="consumo" type="number" step="0.01" placeholder="Consumo L/hora/CV" />
      <Button type="submit">Agregar</Button>
    </form>
  );
}
*/