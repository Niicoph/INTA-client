import {z} from "zod";
import {ProductoSchema} from "./schema";
import {TratamientoSchema} from "./schema";
import {PlanSchema} from "./schema";

export type ProductoFormData = z.infer<typeof ProductoSchema>;
export type TratamientoFormData = z.infer<typeof TratamientoSchema>;
export type PlanFormData = z.infer<typeof PlanSchema>;
