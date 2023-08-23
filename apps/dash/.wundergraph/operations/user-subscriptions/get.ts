import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.query({
  input: z.object({
    userId: z.string(),
  }),
  handler: async ({ input, operations }) => {
    const subscription = await operations.query({
      operationName: 'getUserSubscription',
      input: {
        userId: input.userId,
      },
    });
    return {
      ...subscription,
    };
  },
});
