import { ListHomeowners } from "../../../../shared/types/list-homeowners";
import { protectedProcedure } from "../../trpc";
import { currentOrganiationParameter } from "../types";

export const listHomeowners = protectedProcedure
  .input(currentOrganiationParameter)
  .query(async ({ ctx, input: { currentOrganizationId } }) => {
    const users = await ctx.prisma.user.findMany({
      include: {
        homes: {
          include: {
            home: true,
          },
        },
      },
      where: {
        organizations: {
          some: {
            organizationId: currentOrganizationId,
          },
        },
      },
    });

    return users.map<ListHomeowners>((user) => ({
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      homes: user.homes.map((userOnHome) => ({
        id: userOnHome.homeId,
        address: `${userOnHome.home.streetName} ${userOnHome.home.streetNumber}`,
      })),
    }));
  });
