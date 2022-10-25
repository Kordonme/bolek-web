import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { currentOrganiationParameter } from "../types";

export const addHomeowner = protectedProcedure
  .input(
    z
      .object({
        firstName: z.string().min(2),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        email: z.union([z.string().optional(), z.string().email()]),
      })
      .merge(currentOrganiationParameter)
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        email: input.email,
        organizations: {
          create: {
            organizationId: input.currentOrganizationId,
          },
        },
      },
    });
  });
