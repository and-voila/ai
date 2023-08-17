# And Voila AI Turborepo

Ever dream of having an AI sidekick to help craft your digital masterpieces? Welcome to And Voila AI, where we're like a creative family.

Just like Charlie with his "Charlie Work," And Voila AI is your AI buddy - learning how you create content and automating the boring stuff.

Imagine the sweet content you could make with all that saved time. You and your team could whip up next-level ideas, leaving the grunt work to us.

And Voila AI also keeps your creative secrets safe from prying eyes. Our AI only learns from your content, locking away your digital recipes from outsiders. Think of it like a secure vault where your data stays private.

With And Voila AI, the creativity comes from you, with the AI just lending a hand. We make sure your genius shines through. And blockchain lets you get paid for your awesome content.

As Frank would say, we provide the tools and space, but you craft the success. The Dayman, aaahhahhhhh!

## Credits ⭐️

Ever tried brewing up the perfect creation but needed that secret ingredient? That's what **dan5py's** **[turborepo-shadcn-ui](https://github.com/dan5py/turborepo-shadcn-ui)** has been for our Turborepo project. We found this open-source gem, and like Charlie with a wild card, it was perfect. Thanks to their hard work, we've got something awesome cooking. Cheers to **[dan5py](https://github.com/dan5py)** for creating some open source magic! 🙏🏽 🍻

## Embracing Turborepo: Our Monorepo Approach 🧩

We've moved to a monorepo using [Turborepo](https://turborepo.com) to organize our project. This modern setup lets us align development and ensure efficiency across all our work. Our project's built on a powerful, cohesive foundation, with each tool carefully chosen to improve Developer Experience (DX) and User Experience (UX):

### Core Stack

- [Next JS](https://nextjs.org): The heartbeat powering fast, seamless user experiences.
- [TypeScript](https://www.typescriptlang.org): Our safety net, ensuring robust code through strong typing.
- [Drizzle ORM](https://orm.drizzle.team): SQL's best buds in TypeScript, bringing type safety to our databases.
- [Wundergraph](https://wundergraph.com): Streamlining workflows with its next-gen BFF framework, making APIs a breeze.
- [Upstash](https://upstash.com): The Serverless Data Platform of the future, with speed of a hare and cost of a tortoise.
- [Neon Serverless Postgres](https://neon.tech): Postgres goes serverless with autoscaling and branching possibilities.
- [Tailwind CSS](https://tailwindcss.com): Elegant, efficient designs.
- [Radix UI](https://radix-ui.com): Accessibility meets design without losing charm.
- [shadcn/ui](https://github.com/shadcn/ui): The artist's brush pixels.
- [Vercel](https://vercel.com): Our smooth, fast web hosting.

This all-star team enhances DX and UX. Together, they enable innovation and growth.

### Turborepo with Remote Caching 🚀

Using [Turborepo](https://turbo.build/), we've built a monorepo to simplify development and supercharge efficiency. Remote caching makes builds lightning fast.

## Workspaces

Our project has two main workspaces: `/apps` and `/packages`.

- **`/apps`**: The core apps in our ecosystem, each with a specific purpose.
- **`/packages`**: Shared tools and configs for consistency and customization.

## Structure of the Monorepo

Our monorepo is designed for clarity and collaboration:

```
|---/apps
| |---/admin: Internal management
| |---/dash: Main client app
| |---/docs: Docs center
| |---/web: Public website
|---/packages
| |---/eslint-config-custom: ESLint config
| |---/tsconfig: TypeScript config
| |---/ui: Shared UI components
|---/public
| |---# Global assets
```

This architecture is the blueprint for our project, with a clear split between apps and shared packages. It enables agile development.

## What's inside?

Our monorepo's structure enables specialization and collaboration. Let's check out each part:

### Apps workspace

- **/apps/admin**: The command center where we manage everything behind the scenes so And Voila runs smoothly.
- **/apps/dash**: The creativity gateway with personalized portals for users, secured with authentication.
- **/apps/docs**: The knowledge hub with guides, docs and resources to empower users and developers.
- **/apps/web**: And Voila's public face - an inviting window into our services and content.

### Packages workspace

- **/packages/ui**: A dynamic React component library powered by **shadcn/ui**. Our shared artistic toolkit.
- **/packages/eslint-config-custom**: The code rulebook with ESLint configs.
- **/packages/tsconfig**: Unified TypeScript config files for consistency.

Every app and package uses 100% TypeScript for robust, maintainable code.

With Turborepo's organization and remote caching speed, we've built a cohesive, innovative project.

## Add Shared `ui` components

Use the pre-made script:

```sh
pnpm ui:add <component-name>
```

> This works just like the add command in the `shadcn/ui` CLI.

### Build

To build all apps and packages, run the following command:

```sh
cd and-voila
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```sh
cd and-voila
pnpm dev
```

## Useful Links

Show **dan5py** some ❤️ for turborepo-shadcn-ui:

- [turborepo-shadcn-ui](https://github.com/dan5py/turborepo-shadcn-ui)

Learn more about Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Config](https://turbo.build/repo/docs/reference/configuration)
- [CLI](https://turbo.build/repo/docs/reference/command-line-reference)

Learn about shadcn/ui:

- [Docs](https://ui.shadcn.com/docs)

### About And Voila AI

Check out And Voila's apps:

- https://andvoila.ai
- https://andvoila.ai/app
- https://andvoila.ai/docs
