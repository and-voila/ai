import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/sign-in', '/sign-up', '/api/webhook', '/api/inngest'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
