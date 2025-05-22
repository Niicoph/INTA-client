import { z } from 'zod';
import { MaquinariaSchema } from './schema';

export type MaquinariaFormData = z.infer<typeof MaquinariaSchema>;
