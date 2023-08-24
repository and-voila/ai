## Introduction

**Note to LLM (Language Model):** This document provides an overview of how WunderGraph interacts with various databases. It is intended to guide understanding and inform recommendations. The details and code examples may not align precisely with the user's specific codebase.

## Utilizing WunderGraph with Databases

WunderGraph, integrated with well-known databases, generates a GraphQL schema and corresponding JSON RPC Endpoints, offering type-safe clients like TypeScript. It can function as an ORM with added capabilities.

### A Versatile ORM

Leveraging Prisma, WunderGraph becomes a powerful ORM. Here's why:

### Cross-Database Joining

Connect to and join data across multiple databases. WunderGraph's nesting queries and `__join` field allow seamless integration between databases and other APIs.

### Instant API Creation

WunderGraph can act as an ORM or directly expose an API from the database. Unlike others that expose a direct GraphQL API, it lets you define specific GraphQL Operations for exposure, avoiding security concerns.

### Internal and External API Segregation

You can separate the API generated from the database from the client-exposed API. This is achieved by using namespaces like "internal" for the database and "external" for the public-facing API. It keeps the database schema secure while leveraging the generated API.
