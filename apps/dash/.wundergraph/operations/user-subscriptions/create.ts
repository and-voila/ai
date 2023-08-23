import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.mutation({
  input: z.object({
    userId: z.string(),
  }),
  handler: async ({ input, operations }) => {
    const subscription = await operations.mutate({
      operationName: 'createSubscription',
      input: {
        userId: input.userId,
        count: 0,
      },
    });
    return {
      ...subscription,
    };
  },
});
