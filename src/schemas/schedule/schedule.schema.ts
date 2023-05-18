import { z } from "zod";

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const scheduleRequestSchema = scheduleSchema.omit({ id: true });
const scheduleResponseSchema = scheduleSchema;

export { scheduleSchema, scheduleRequestSchema, scheduleResponseSchema };
