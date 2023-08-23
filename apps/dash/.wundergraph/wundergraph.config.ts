import {
  configureWunderGraphApplication,
  cors,
  introspect,
} from '@wundergraph/sdk';
import { NextJsTemplate } from '@wundergraph/nextjs/dist/template';

const prismaDB = introspect.prisma({
  apiNamespace: 'prisma',
  prismaFilePath: '../prisma/schema.prisma',
  introspection: {
    disableCache: true,
  },
});

configureWunderGraphApplication({
  apis: [prismaDB],
  authentication: {
    tokenBased: {
      providers: [
        {
          jwksURL: process.env.CLERK_JWKS_URL,
        },
      ],
    },
  },
  generate: {
    codeGenerators: [
      {
        templates: [new NextJsTemplate()],
        path: './generated',
      },
    ],
  },
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === 'production'
        ? [
            // Change this before deploying to production to the actual domain where you're deploying your app
            'http://localhost:3000',
          ]
        : ['http://localhost:3000'],
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== 'production',
  },
});
