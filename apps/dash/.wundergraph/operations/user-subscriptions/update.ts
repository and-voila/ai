import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.mutation({
  input: z.object({
    id: z.string(),
    stripeCustomerId: z.string(),
    stripeSubscriptionId: z.string(),
    stripePriceId: z.string(),
    stripeCurrentPeriodEnd: z.string(),
  }),
  handler: async ({ input, operations }) => {
    const subscription = await operations.mutate({
      operationName: 'updateSubscription',
      input: {
        id: input.id,
        stripeCustomerId: input.stripeCustomerId,
        stripeSubscriptionId: input.stripeSubscriptionId,
        stripePriceId: input.stripePriceId,
        stripeCurrentPeriodEnd: input.stripeCurrentPeriodEnd,
      },
    });
    return {
      ...subscription,
    };
  },
});
