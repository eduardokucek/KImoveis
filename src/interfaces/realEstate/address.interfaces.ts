import { z } from "zod";
import {
  addressRequestSchema,
  addressResponseSchema,
  addressSchema,
} from "../../schemas/adress/address.schema";

type TAddress = z.infer<typeof addressSchema>;
type TAddressRequest = z.infer<typeof addressRequestSchema>;
type TAddressResponse = z.infer<typeof addressResponseSchema>;

export { TAddress, TAddressRequest, TAddressResponse };
