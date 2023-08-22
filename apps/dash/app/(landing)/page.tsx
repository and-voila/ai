import Link from 'next/link';
import { Button } from 'ui';

const LandingPage = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center font-display text-2xl font-semibold text-foreground">
          Dashboard
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center space-x-4">
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            This is what building in public looks like.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
