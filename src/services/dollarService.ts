import dollarApi from "@/api/dollarApi";

/**
 * Obtains a list of availables dollars
 */
export async function getDollars() {
    const response = await dollarApi.get("/v1/dolares");
    return response.data;
}
