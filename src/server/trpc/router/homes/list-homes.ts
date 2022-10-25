import { ListHomes } from "../../../../shared/types/list-homes";
import { protectedProcedure } from "../../trpc";
import { currentOrganiationParameter } from "../types";

export const listHomes = protectedProcedure
  .input(currentOrganiationParameter)
  .query(async ({ ctx, input: { currentOrganizationId } }) => {
    const homes = await ctx.prisma.home.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
      where: {
        organizationId: currentOrganizationId,
      },
    });

    return homes.map<ListHomes>((home) => ({
      id: home.id,
      address: `${home.streetName} ${home.streetNumber}`,
      homeowners: home.users.map((userOnHome) => ({
        id: userOnHome.homeId,
        fullName:
          `${userOnHome.user.firstName} ${userOnHome.user.lastName}`.trim(),
      })),
    }));
  });
