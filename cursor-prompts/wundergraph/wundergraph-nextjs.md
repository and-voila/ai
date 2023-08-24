## Configure WunderGraph (LLM Note: Technical Guide for Configuration)

WunderGraph is configured in the `.wundergraph` directory. Here's a guide to set up your application:

### 1. Configuration Inside `.wundergraph/wundergraph.config.ts`

Configure the WunderGraph application and write your operations here.

```ts
import {
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from '@wundergraph/sdk';
import server from './wundergraph.server';
import operations from './wundergraph.operations';

const todos = introspect.graphql({
  apiNamespace: 'todos',
  url: 'http://127.0.0.1:3000/api/graphql',
  subscriptionsUseSSE: true,
  loadSchemaFromString: /* GraphQL */ `
    type Todo {
      id: Int!
      text: String!
      isCompleted: Boolean!
    }

    input TodoInput {
      id: Int!
      text: String!
      isCompleted: Boolean!
    }

    input NewTodoInput {
      text: String!
    }

    type Query {
      todos: [Todo]
    }

    type Mutation {
      updateTodo(todo: TodoInput): Todo
      addTodo(todo: NewTodoInput): Todo
    }

    type Subscription {
      TodoChanges: Todo
    }
  `,
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [todos],
  server,
  operations,
  generate: {
    codeGenerators: [],
  },
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === 'production'
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            'http://localhost:3000',
          ]
        : [
            'http://localhost:3000',
            new EnvironmentVariable('WG_ALLOWED_ORIGIN'),
          ],
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== 'production' ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
});
```

### 2. API Introspection

The API is introspected and added to the WunderGraph virtual graph.

```ts
// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [todos],
  server,
  operations,
  generate: {
    codeGenerators: [],
  },
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === 'production'
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            'http://localhost:3000',
          ]
        : [
            'http://localhost:3000',
            new EnvironmentVariable('WG_ALLOWED_ORIGIN'),
          ],
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== 'production' ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
});
```

### 3. Operations

Operations are written in the `.wundergraph/operations` directory using Graphql or TypeScript.

```graphql
query allTodos {
  todos_todos {
    id
    isCompleted
    text
  }
}
```

### 4. Calling the Operation in Next.js

A sample `.wundergraph/wundergraph.operations.ts` file handles operations.

```ts
import { configureWunderGraphOperations } from '@wundergraph/sdk';
import type { OperationsConfiguration } from './generated/wundergraph.operations';

export default configureWunderGraphOperations<OperationsConfiguration>({
  operations: {
    defaultConfig: {
      authentication: {
        required: false,
      },
    },
    queries: (config) => ({
      ...config,
      caching: {
        enable: false,
        staleWhileRevalidate: 60,
        maxAge: 60,
        public: true,
      },
      liveQuery: {
        enable: true,
        pollingIntervalSeconds: 1,
      },
    }),
    mutations: (config) => ({
      ...config,
    }),
    subscriptions: (config) => ({
      ...config,
    }),
    custom: {},
  },
});
```

### 5. Client and Server Configuration

Create a WunderGraph client and set up the server using the existing code snippets provided.

- `/.wundergraph/wundergraph.server.ts`
- `/lib/wundergraph/index.ts`

```ts
import { configureWunderGraphServer } from '@wundergraph/sdk/server';

export default configureWunderGraphServer(() => ({
  hooks: {
    queries: {},
    mutations: {},
  },
}));
```

```ts
import { createClient } from '../../../.wundergraph/generated/client';

export const client = createClient();
```

### 6. API Route Setup

We also need an API route inside `/app/api/wundergraph/graphql.ts`.

```ts
import { createServer } from '@graphql-yoga/node';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface UpdateTodoInput {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface AddTodoInput {
  text: string;
}

let nextId = 0;
let todos: Todo[] = [{ id: nextId++, text: 'Todo #1', isCompleted: false }];
let listeners: Array<(updatedTodo: Todo) => any> = [];

export const todosStore = {
  addTodo({ text }: AddTodoInput) {
    const newTodo = { id: nextId++, text, isCompleted: false };
    todos = [...todos, newTodo];
    emitChange(newTodo);
    return newTodo;
  },
  updateTodo(input: UpdateTodoInput) {
    const todoIndex = todos.findIndex((todo) => todo.id === input.id);
    if (todoIndex !== -1) {
      const newTodo = {
        id: input.id,
        text: input.text,
        isCompleted: input.isCompleted,
      };
      todos = [
        ...todos.slice(0, todoIndex),
        newTodo,
        ...todos.slice(todoIndex + 1),
      ];
      emitChange(newTodo);
      return newTodo;
    } else {
      throw new Error('Todo not found');
    }
  },
  subscribe(listener: (updatedTodo: Todo) => any) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange(updatedTodo: Todo) {
  for (let listener of listeners) {
    listener(updatedTodo);
  }
}

const typeDefs = /* GraphQL */ `
  type Todo {
    id: Int!
    text: String!
    isCompleted: Boolean!
  }

  input TodoInput {
    id: Int!
    text: String!
    isCompleted: Boolean!
  }

  input NewTodoInput {
    text: String!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    updateTodo(todo: TodoInput): Todo
    addTodo(todo: NewTodoInput): Todo
  }

  type Subscription {
    TodoChanges: Todo
  }
`;

const resolvers = {
  Query: {
    todos: () => todosStore.getSnapshot(),
  },
  Mutation: {
    updateTodo: (_: any, { todo }: { todo: UpdateTodoInput }) => {
      return todosStore.updateTodo(todo);
    },
    addTodo: (_: any, { todo }: { todo: AddTodoInput }) => {
      return todosStore.addTodo(todo);
    },
  },
  Subscription: {
    TodoChanges: {
      subscribe: async function* () {
        while (true) {
          const onNextChange = new Promise<Todo>((resolve) => {
            const unsubscribe = todosStore.subscribe((updatedTodo) => {
              unsubscribe();
              resolve(updatedTodo);
            });
          });
          const updatedTodo = await onNextChange;
          yield {
            TodoChanges: updatedTodo,
          };
        }
      },
    },
  },
};

// Provide your schema
export default createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema: {
    typeDefs,
    resolvers,
  },
});

export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
};
```

### 7. Actions and Operations Handling

The actions.ts file inside `/app/actions.ts` handles operations. Use the existing code snippet as a guide.

```ts
'use server';

import { client } from '@/lib/wundergraph';
import { data } from 'autoprefixer';
import { revalidatePath } from 'next/cache';
import { AllTodosResponseData } from '../../.wundergraph/generated/models';

export const toggleTodo = async (
  data: NonNullable<AllTodosResponseData['todos_todos']>[0],
) => {
  await client.mutate({
    operationName: 'updateTodo',
    input: {
      ...data,
      isCompleted: !data.isCompleted,
    },
  });

  revalidatePath('/');
};
```

### 8. Using Operations on Pages

You can use the operations on your page, `/app/page.tsx`, as shown in the existing code snippet.

```tsx
import { Todo } from '@/components/Todo';
import { client } from '@/lib/wundergraph';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const todos = await client.query({
    operationName: 'allTodos',
  });

  const addTodo = async (data: FormData) => {
    'use server';

    const newTodo = {
      text: (data.get('new-todo') ?? '') as string,
    };

    await client.mutate({
      operationName: 'addTodo',
      input: newTodo,
    });

    revalidatePath('/');
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-800">
            WunderGraph TodoList
          </h1>
          <div className="rounded-lg bg-white p-6 shadow">
            <h1 className="mb-4 text-2xl font-semibold text-gray-700">
              Todo List
            </h1>
            {todos?.data?.todos_todos?.map((todo, index) =>
              todo ? <Todo key={index.toString()} data={todo} /> : null,
            )}
            <div className="flex items-center">
              <form action={addTodo}>
                <input
                  type="text"
                  name="new-todo"
                  placeholder="New todo text"
                  className="form-input flex-grow rounded-l-lg border-r-0 p-2 focus:border-indigo-300 focus:ring-0"
                />
                <button
                  type="submit"
                  className="rounded-r-lg bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-500 focus:outline-none"
                >
                  Add Todo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

## TypeScript Operations

WunderGraph allows you to write your operation using TypeScript. TypeScript Operations are a great way to use WunderGraph as a fully featured backend framework. Let's find out how to write a TypeScript operation.

```ts
import { createOperation, z } from '../../generated/wundergraph.factory';

export default createOperation.query({
  input: z.object({
    id: z.string(),
  }),
  handler: async ({ input }) => {
    return {
      id: input.id,
      name: 'Jens',
      bio: 'Founder of WunderGraph',
    };
  },
});
```

This operation will return a user with the given id. We simply return a plain object here, but you can also return a database model or any other data type. We're using Zod to create the input schema, this will make sure that the input is validated before it reaches the handler.

You can call TypeScript operations just like Graphql operations, fully type safe. Note that the operation name is `users/get`, this is the path to the operation file, without the extension. We use filebased router for operations, similar to Next.js pages. This allows you to keep your operations organized.
