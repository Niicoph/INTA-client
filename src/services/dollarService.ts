import dollarApi from "@/api/dollarApi";

export async function getDollar() {
    const response = await dollarApi.get("/estadisticascambiarias/v1.0/Cotizaciones/USD");
    return response.data;
}
