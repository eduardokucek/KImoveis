import { z } from "zod";
import {
  categoryRequestSchema,
  categoryResponseSchema,
  categorySchema,
} from "../../schemas/category/category.schema";

type TCategory = z.infer<typeof categorySchema>;
type TCategoryRequest = z.infer<typeof categoryRequestSchema>;
type TCategoryResponse = z.infer<typeof categoryResponseSchema>;

export { TCategory, TCategoryRequest, TCategoryResponse };
