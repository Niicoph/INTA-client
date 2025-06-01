import { z } from 'zod';
import { PresentacionSchema } from './schema';
import { AplicacionSchema } from './schema';
import { PlanSchema } from './schema';

export type PresentacionFormData = z.infer<typeof PresentacionSchema>;
export type AplicacionFormData = z.infer<typeof AplicacionSchema>;
export type PlanFormData = z.infer<typeof PlanSchema>;
