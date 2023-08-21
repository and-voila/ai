import { auth } from '@clerk/nextjs';

import { client } from '@/lib/wundergraph';

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await client.query({
    operationName: 'getUserSubscription',
    input: {
      userId: userId,
    },
  });

  // const userSubscription = await prismadb.userSubscription.findUnique({
  //   where: {
  //     userId: userId,
  //   },
  //   select: {
  //     stripeSubscriptionId: true,
  //     stripeCurrentPeriodEnd: true,
  //     stripeCustomerId: true,
  //     stripePriceId: true,
  //   },
  // });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.data.subscription?.stripeCurrentPeriodEnd &&
    parseInt(userSubscription.data.subscription.stripeCurrentPeriodEnd, 10) +
      DAY_IN_MS >
      Date.now();

  return !!isValid;
};
