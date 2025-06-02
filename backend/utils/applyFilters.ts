export function applyFilters<T>(data: T[], query: any): T[] {
  return data.filter((item) => {
    return Object.entries(query).every(([key, value]) => {
      if (value === undefined) return true;

      // Filtro por rango mínimo o máximo: terminan en _min o _max
      if (key.endsWith("_min")) {
        const field = key.replace("_min", "");
        const itemValue = (item as any)[field];
        const numValue = Number(value);
        if (!isNaN(numValue) && typeof itemValue === "number") {
          return itemValue >= numValue;
        }
      } else if (key.endsWith("_max")) {
        const field = key.replace("_max", "");
        const itemValue = (item as any)[field];
        const numValue = Number(value);
        if (!isNaN(numValue) && typeof itemValue === "number") {
          return itemValue <= numValue;
        }
      } else {
        const itemValue = (item as any)[key];

        if (typeof itemValue === "string") {
          return itemValue.toLowerCase().includes(String(value).toLowerCase());
        }

        if (typeof itemValue === "number" || typeof itemValue === "bigint") {
          const numValue = Number(value);
          return !isNaN(numValue) && itemValue === numValue;
        }
      }

      return false;
    });
  });
}