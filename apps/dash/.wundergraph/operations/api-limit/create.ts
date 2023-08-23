import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.mutation({
  input: z.object({
    userId: z.string(),
  }),
  handler: async ({ input, operations }) => {
    const apiLimit = await operations.mutate({
      operationName: 'createApiLimit',
      input: {
        userId: input.userId,
        count: 0,
      },
    });
    return {
      apiLimit,
    };
  },
});
