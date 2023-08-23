import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.query({
  input: z.object({
    userId: z.string(),
  }),
  handler: async ({ input, operations }) => {
    const apiLimit = await operations.query({
      operationName: 'getUserApiLimit',
      input: {
        userId: input.userId,
      },
    });
    return {
      apiLimit,
    };
  },
});
