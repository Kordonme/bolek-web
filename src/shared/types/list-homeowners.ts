import { z } from "zod";

const obj = z.object({
  id: z.string(),
  fullName: z.string(),
  homes: z.array(
    z.object({
      id: z.string(),
      address: z.string(),
    })
  ),
});

export type ListHomeowners = z.infer<typeof obj>;
