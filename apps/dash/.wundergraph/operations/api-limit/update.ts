import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.mutation({
  input: z.object({
    userId: z.string(),
    count: z.number(),
  }),
  handler: async ({ input, operations }) => {
    const apiLimit = await operations.mutate({
      operationName: 'updateApiLimit',
      input: {
        userId: input.userId,
        count: input.count,
      },
    });
    return {
      apiLimit,
    };
  },
});
