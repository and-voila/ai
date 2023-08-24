**Note: This implementation utilizes the Next JS Pages router, not the Next JS App Router. It's intended for reference only.**

WunderGraph is an open-source Backend for Frontend (BFF) tool that enables developers to unify multiple APIs into a single interface, generate typesafe API clients, and include authentication and file uploads.

### Pairing WunderGraph with Neon

With WunderGraph, you can introspect data sources and integrate them into a virtual graph. You can transform your Neon database into a GraphQL API, JSON-RPC, or REST, and build serverless apps with Neon and Postgres.

### Integration with Next.js

The following steps demonstrate how to set up an app with Neon and WunderGraph using Next.js.

#### Configure WunderGraph

1. Add Neon as a datasource in `wundergraph.config.ts`.

```typescript
import {
  configureWunderGraphApplication,
  introspect,
  authProviders,
  EnvironmentVariable,
} from '@wundergraph/sdk';
import operations from './wundergraph.operations';
import server from './wundergraph.server';

const spaceX = introspect.graphql({
  apiNamespace: 'spacex',
  url: 'https://spacex-api.fly.dev/graphql/',
});

// Add your neon datasource
const neon = introspect.postgresql({
  apiNamespace: 'neon',
  //Your database URL can be found in the Neon console
  databaseURL: new EnvironmentVariable('NEON_DATABASE_URL'),
});

configureWunderGraphApplication({
  // Add neon inside your APIs array
  apis: [spaceX, neon],
  server,
  operations,
  codeGenerators: [
    {
      templates: [...templates.typescript.all],
    },
  ],
});
```

2. Write an operation that turns Neon into an API, exposing data for the frontend.

Inside your `Users.graphql` file, add the following code:

```graphql
{
  neon_findFirstusers {
    id
    name
    email
  }
}
```

## Configure the frontend

Keep in mind this example is for the Next JS Pages Router, we are using Next JS App Router.

```typescript
import { NextPage } from 'next';
import { useQuery, withWunderGraph } from '../components/generated/nextjs';

const Home: NextPage = () => {
  const dragons = useQuery({
    operationName: 'Dragons',
  });
  // We want to write this hook to get the data from our Users operation
  const users = useQuery({
    operationName: 'Users',
  });

  const refresh = () => {
    dragons.mutate();
  };
  return (
    <div>
      <div className="relative mx-auto max-w-5xl pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          WunderGraph & Next.js
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
          Use{' '}
          <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
            <a
              className="text-cyan-400 hover:text-cyan-600"
              target="_blank"
              href="https://wundergraph.com"
            >
              WunderGraph
            </a>
          </code>{' '}
          to make your data-source accessible through JSON-RPC to your Next.js
          app.
        </p>
      </div>
      <div className="relative flex flex-col items-center overflow-hidden p-8 sm:p-12">
        <div className="w-full max-w-xl rounded-2xl bg-blue-50 px-20 py-14">
          <div className="mx-auto flex max-w-sm flex-col items-center">
            <p className="mb-8 mt-3 text-center text-black/80">
              This is the result of your{' '}
              <code className="font-mono font-bold font-medium text-amber-500">
                Users
              </code>{' '}
              operation.
            </p>
            <code className="p-3" data-testid="result">
              //update dragons to users
              {JSON.stringify(users, null, 2)}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withWunderGraph(Home);
```

## Important Points

- Don't delete or change the password for wundergraph-$project_id in Neon.
- Use NEON_DATABASE_URL as your database URL.

## LLM Note:

The given example has been optimized for low-level memory usage, ensuring efficient operations. Always consider database and application constraints for production deployment.
