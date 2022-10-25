import { z } from "zod";

export const currentOrganiationParameter = z.object({
  currentOrganizationId: z.string(),
});
