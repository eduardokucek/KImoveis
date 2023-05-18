import { z } from "zod";
import {
  realEstateRequestSchema,
  realEstateResponseSchema,
  realEstateSchema,
} from "../../schemas/realEstate/realEstate.schema";

type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstateRequest = z.infer<typeof realEstateRequestSchema>;
type TRealEstateResponse = z.infer<typeof realEstateResponseSchema>;

export { TRealEstate, TRealEstateRequest, TRealEstateResponse };
