import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import type { Context } from "./context";

const inputSchema = z.object({ currentOrganizationId: z.string() });

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const validateCurrentOrganizationId = t.middleware(
  async ({ ctx, input, next }) => {
    if (!ctx.session?.user) {
      return next();
    }

    const result = inputSchema.safeParse(input);

    if (!result.success) {
      return next();
    }

    const userOrganization = await ctx.prisma.usersOnOrganizations.findFirst({
      where: {
        organizationId: result.data.currentOrganizationId,
        userId: ctx.session.user.id,
      },
      take: 1,
    });

    if (userOrganization) {
      return next();
    }

    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
);

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure
  .use(isAuthed)
  .use(validateCurrentOrganizationId);
