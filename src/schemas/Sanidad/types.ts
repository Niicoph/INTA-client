import { z } from 'zod';
import {PresentacionSchema} from './schema';

export type PresentacionFormData = z.infer<typeof PresentacionSchema>;
