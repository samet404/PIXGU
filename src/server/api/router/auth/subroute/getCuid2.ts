import { joinedUserProducure } from '@/procedure';
import { createId } from '@paralleldrive/cuid2';

export const getCuid2 = joinedUserProducure.query(() => createId())