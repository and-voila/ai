// wundergraph.config.ts
var import_sdk = require("@wundergraph/sdk");
var prismaDB = import_sdk.introspect.prisma({
  apiNamespace: "prisma",
  prismaFilePath: "../prisma/schema.prisma",
  introspection: {
    disableCache: true
  }
});
(0, import_sdk.configureWunderGraphApplication)({
  apis: [prismaDB],
  cors: {
    ...import_sdk.cors.allowAll,
    allowedOrigins: process.env.NODE_ENV === "production" ? [
      "http://localhost:3000"
    ] : ["http://localhost:3000"]
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production"
  }
});
//# sourceMappingURL=config.cjs.map
