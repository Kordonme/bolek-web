import { z } from "zod";

const obj = z.object({
  id: z.string(),
  address: z.string(),
  homeowners: z.array(
    z.object({
      id: z.string(),
      fullName: z.string(),
    })
  ),
});

export type ListHomes = z.infer<typeof obj>;
