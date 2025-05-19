import gasoilApi from "@/api/gasoilApi";

/**
 * Obtains a list of availables dollars
 */
export async function getDollars() {
    const response = await gasoilApi.get("/v1/dolares");
    return response.data;
}
