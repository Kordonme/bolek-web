import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { currentOrganiationParameter } from "../types";

export const getHome = protectedProcedure
  .input(
    z
      .object({
        homeId: z.string(),
      })
      .merge(currentOrganiationParameter)
  )
  .query(async ({ ctx, input }) => {
    const home = await ctx.prisma.home.findFirst({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
      where: {
        id: input.homeId,
        organizationId: input.currentOrganizationId,
      },
    });

    if (!home) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return {
      id: home.id,
      address: `${home.streetName} ${home.streetNumber}`,
      homeowners: home.users.map((userOnHome) => ({
        id: userOnHome.homeId,
        fullName:
          `${userOnHome.user.firstName} ${userOnHome.user.lastName}`.trim(),
      })),
    };
  });
