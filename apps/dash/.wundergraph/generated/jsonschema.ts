// Code generated by wunderctl. DO NOT EDIT.

// @ts-ignore: no-types available
import type { JSONSchema7 } from "json-schema";

// @ts-ignore: module unavailable
declare module "json-schema" {
	export interface JSONSchema7 {
		"x-graphql-enum-name"?: string;
	}
}

export interface Queries {
	allApiLimits: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
	allSubscriptions: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
}

export interface Mutations {
	createApiLimit: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
	createSubscription: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
	deleteApiLimit: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
	deleteSubscription: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
	updateApiLimit: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
	updateSubscription: {
		input: JSONSchema7;
		response: JSONSchema7;
		operationType: string;
		description: string;
	};
}

export interface Subscriptions {}

export type Schema = Queries & Mutations & Subscriptions;

const jsonSchema: Schema = {
	allApiLimits: {
		input: { type: "object", properties: {}, additionalProperties: false },
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						apiLimits: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									userId: { type: "string" },
									count: { type: "integer" },
									createdAt: { type: "string" },
									updatedAt: { type: "string" },
								},
								additionalProperties: false,
								required: ["id", "userId", "count", "createdAt", "updatedAt"],
							},
						},
					},
					additionalProperties: false,
					required: ["apiLimits"],
				},
			},
			additionalProperties: false,
		},
		operationType: "QUERY",
		description: "",
	},
	allSubscriptions: {
		input: { type: "object", properties: {}, additionalProperties: false },
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						subscriptions: {
							type: "array",
							items: {
								type: "object",
								properties: {
									id: { type: "string" },
									userId: { type: "string" },
									stripeCustomerId: { type: "string" },
									stripeSubscriptionId: { type: "string" },
									stripePriceId: { type: "string" },
									stripeCurrentPeriodEnd: { type: "string" },
								},
								additionalProperties: false,
								required: ["id", "userId"],
							},
						},
					},
					additionalProperties: false,
					required: ["subscriptions"],
				},
			},
			additionalProperties: false,
		},
		operationType: "QUERY",
		description: "",
	},
	createApiLimit: {
		input: {
			type: "object",
			properties: { userId: { type: "string" }, count: { type: "integer" } },
			additionalProperties: false,
			required: ["userId", "count"],
		},
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						prisma_createOneUserApiLimit: {
							type: "object",
							properties: { id: { type: "string" } },
							additionalProperties: false,
							required: ["id"],
						},
					},
					additionalProperties: false,
				},
			},
			additionalProperties: false,
		},
		operationType: "MUTATION",
		description: "",
	},
	createSubscription: {
		input: {
			type: "object",
			properties: {
				userId: { type: "string" },
				stripeCustomerId: { type: ["string", "null"] },
				stripeSubscriptionId: { type: ["string", "null"] },
				stripePriceId: { type: ["string", "null"] },
				stripeCurrentPeriodEnd: { type: ["string", "null"] },
			},
			additionalProperties: false,
			required: ["userId"],
		},
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						prisma_createOneUserSubscription: {
							type: "object",
							properties: { id: { type: "string" } },
							additionalProperties: false,
							required: ["id"],
						},
					},
					additionalProperties: false,
				},
			},
			additionalProperties: false,
		},
		operationType: "MUTATION",
		description: "",
	},
	deleteApiLimit: {
		input: { type: "object", properties: { id: { type: "string" } }, additionalProperties: false, required: ["id"] },
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						prisma_deleteOneUserApiLimit: {
							type: "object",
							properties: { id: { type: "string" } },
							additionalProperties: false,
							required: ["id"],
						},
					},
					additionalProperties: false,
				},
			},
			additionalProperties: false,
		},
		operationType: "MUTATION",
		description: "",
	},
	deleteSubscription: {
		input: { type: "object", properties: { id: { type: "string" } }, additionalProperties: false, required: ["id"] },
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						prisma_deleteOneUserSubscription: {
							type: "object",
							properties: { id: { type: "string" } },
							additionalProperties: false,
							required: ["id"],
						},
					},
					additionalProperties: false,
				},
			},
			additionalProperties: false,
		},
		operationType: "MUTATION",
		description: "",
	},
	updateApiLimit: {
		input: {
			type: "object",
			properties: { id: { type: "string" }, count: { type: "integer" } },
			additionalProperties: false,
			required: ["id", "count"],
		},
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						prisma_updateOneUserApiLimit: {
							type: "object",
							properties: { id: { type: "string" }, count: { type: "integer" } },
							additionalProperties: false,
							required: ["id", "count"],
						},
					},
					additionalProperties: false,
				},
			},
			additionalProperties: false,
		},
		operationType: "MUTATION",
		description: "",
	},
	updateSubscription: {
		input: {
			type: "object",
			properties: {
				id: { type: "string" },
				stripeCustomerId: { type: ["string", "null"] },
				stripeSubscriptionId: { type: ["string", "null"] },
				stripePriceId: { type: ["string", "null"] },
				stripeCurrentPeriodEnd: { type: ["string", "null"] },
			},
			additionalProperties: false,
			required: ["id"],
		},
		response: {
			type: "object",
			properties: {
				data: {
					type: "object",
					properties: {
						prisma_updateOneUserSubscription: {
							type: "object",
							properties: { id: { type: "string" } },
							additionalProperties: false,
							required: ["id"],
						},
					},
					additionalProperties: false,
				},
			},
			additionalProperties: false,
		},
		operationType: "MUTATION",
		description: "",
	},
};

export type QueryNames = "allApiLimits" | "allSubscriptions";

export type MutationNames =
	| "createApiLimit"
	| "createSubscription"
	| "deleteApiLimit"
	| "deleteSubscription"
	| "updateApiLimit"
	| "updateSubscription";

export type SubscriptionNames = never;

export default jsonSchema;
