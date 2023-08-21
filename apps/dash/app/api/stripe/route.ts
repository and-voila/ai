import { auth, currentUser } from '@clerk/nextjs';
import { stripe } from 'lib/stripe';
import { absoluteUrl } from 'lib/utils';
import { NextResponse } from 'next/server';

import { client } from '@/lib/wundergraph';

const settingsUrl = absoluteUrl('/settings');

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userSubscription = await client.query({
      operationName: 'getUserSubscription',
      input: {
        userId: userId,
      },
    });

    if (
      userSubscription &&
      userSubscription.data.subscription.stripeCustomerId
    ) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.data.subscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'And Voila Pro',
              description: 'And Voila Pro Subscription',
            },
            unit_amount: 4900,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('[STRIPE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
