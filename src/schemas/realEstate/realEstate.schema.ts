import { z } from "zod";
import { addressSchema, addressRequestSchema } from "../adress/address.schema";

const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.number().or(z.string()),
  size: z.number().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  categoryId: z.number(),
  address: z.object({ addressSchema }),
});

const realEstateRequestSchema = realEstateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({ address: addressRequestSchema });

const realEstateResponseSchema = realEstateSchema;

export { realEstateSchema, realEstateRequestSchema, realEstateResponseSchema };
