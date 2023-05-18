import { z } from "zod";
import {
  scheduleRequestSchema,
  scheduleResponseSchema,
  scheduleSchema,
} from "../../schemas/schedule/schedule.schema";

type TSchedule = z.infer<typeof scheduleSchema>;
type TScheduleRequest = z.infer<typeof scheduleRequestSchema>;
type TScheduleResponse = z.infer<typeof scheduleResponseSchema>;

export { TSchedule, TScheduleRequest, TScheduleResponse };
