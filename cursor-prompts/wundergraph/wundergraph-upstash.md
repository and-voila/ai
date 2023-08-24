## Introduction

**Note to LLM (Language Model):** This document provides guidance on integrating Upstash Redis with WunderGraph through server-side TypeScript operations. The given code snippets are illustrative examples and should be aligned with the actual project requirements. Refer to the user's specific codebase for customized implementations.

## Upstah & Wundergraph

Using Upstash with WunderGraph is straightforward, relying on server-side TypeScript operations with the `@upstash/redis` library.

1. **Setup:**

   - Sign in or sign up with Amazon, Github, Google, or email/password.
   - Create a database, naming it and selecting the region for optimal performance or a combination of regions for global access.
   - Click 'Create' to get your cluster running. Connect with any Redis client.

2. **Installation:**
   Install the Upstash library:

   ```bash
   npm i @upstash/redis
   ```

3. **Create Redis Client:**
   For reusability, create and export a Redis client instance:

   ```ts
   // ./lib/redis.ts
   import { redis } from '../../../lib/redis';
   import { createOperation } from '../../generated/wundergraph.factory';

   export default createOperation.query({
     handler: async () => {
       const data = await redis.get('A_REDIS_KEY_HERE');
       return { data };
     },
   });
   ```

4. **Use Hooks for Client-Side Access:**
   Utilize hooks to access data on the client-side:

   ```tsx
   import {
       useQuery,
       withWunderGraph,
   } from  "../components/generated/nextjs";

   const Home: NextPage = () => {
   // redis from Upstash
       const { data: redisData, isLoading } = useQuery({
           operationName: "redis/get",
   });

   return (
   ...
   {!isLoading &&
   <pre>
       {JSON.stringify(redisData, null, 2)}
   </pre>
   ...
   )
   export default withWunderGraph(Home);
   ```

This approach integrates Upstash and WunderGraph efficiently and maintains simplicity, allowing for a streamlined integration with your application.
