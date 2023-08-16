import { Button } from 'ui';

export default function Page() {
  return (
    <div className="bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="prose mx-auto max-w-2xl dark:prose-invert lg:prose-lg">
        <h1>Admin App - Turbo Repo</h1>
        <p>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <h2>Overview</h2>
        <p>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <h3>Features</h3>
        <p>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <ul>
          <li>Dashboard Management</li>
          <li>User Permissions</li>
          <li>Analytics</li>
        </ul>
        <h4>Installation</h4>
        <p>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <pre>
          <code>pnpm install admin-app-turbo-repo</code>
        </pre>
        <h5>Support</h5>
        <p>
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <blockquote>
          For support, please contact our team at{' '}
          <a href="mailto:support@turbo-repo.com">support@turbo-repo.com</a>.
        </blockquote>
        <h6>Terms &amp; Conditions</h6>
        <p>
          By using the Admin App within Turbo Repo, you agree to comply with all
          applicable laws and regulations.
        </p>
        <Button variant="premium" size="lg">
          Go to Admin
        </Button>
      </div>
    </div>
  );
}
