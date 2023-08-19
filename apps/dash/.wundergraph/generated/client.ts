import type {
	ClientConfig,
	CreateClientConfig,
	User,
	UploadRequestOptions,
	OperationMetadata,
	OperationsDefinition,
	OperationRequestOptions,
	SubscriptionRequestOptions,
	SubscriptionEventHandler,
	FetchUserRequestOptions,
	UploadValidationOptions,
	QueryRequestOptions,
	MutationRequestOptions,
	ClientOperationErrors,
	ExtractProfileName,
	ExtractMeta,
	GraphQLError,
} from "@wundergraph/sdk/client";
import { Client } from "@wundergraph/sdk/client";
import type { OperationErrors } from "./ts-operation-errors";

import type { PublicCustomClaims } from "./claims";
import type {
	AllApiLimitsResponse,
	AllApiLimitsResponseData,
	AllSubscriptionsResponse,
	AllSubscriptionsResponseData,
	CreateApiLimitResponse,
	CreateApiLimitInput,
	CreateApiLimitResponseData,
	CreateSubscriptionResponse,
	CreateSubscriptionInput,
	CreateSubscriptionResponseData,
	DeleteApiLimitResponse,
	DeleteApiLimitInput,
	DeleteApiLimitResponseData,
	DeleteSubscriptionResponse,
	DeleteSubscriptionInput,
	DeleteSubscriptionResponseData,
	UpdateApiLimitResponse,
	UpdateApiLimitInput,
	UpdateApiLimitResponseData,
	UpdateSubscriptionResponse,
	UpdateSubscriptionInput,
	UpdateSubscriptionResponseData,
} from "./models";
export type UserRole = "admin" | "user";

export const WUNDERGRAPH_S3_ENABLED = false;
export const WUNDERGRAPH_AUTH_ENABLED = false;

export const defaultClientConfig: ClientConfig = {
	applicationHash: "379d8373",
	baseURL: "https://andvoila.wundergraph.dev",
	sdkVersion: "0.174.4",
};

export const operationMetadata: OperationMetadata = {
	allApiLimits: {
		requiresAuthentication: false,
	},
	allSubscriptions: {
		requiresAuthentication: false,
	},
	createApiLimit: {
		requiresAuthentication: false,
	},
	createSubscription: {
		requiresAuthentication: false,
	},
	deleteApiLimit: {
		requiresAuthentication: false,
	},
	deleteSubscription: {
		requiresAuthentication: false,
	},
	updateApiLimit: {
		requiresAuthentication: false,
	},
	updateSubscription: {
		requiresAuthentication: false,
	},
};

export type PublicUser = User<UserRole, PublicCustomClaims>;

export class WunderGraphClient extends Client {
	query<
		OperationName extends Extract<keyof Operations["queries"], string>,
		Input extends Operations["queries"][OperationName]["input"] = Operations["queries"][OperationName]["input"],
		Response extends Operations["queries"][OperationName]["response"] = Operations["queries"][OperationName]["response"]
	>(options: OperationName extends string ? QueryRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.query<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	mutate<
		OperationName extends Extract<keyof Operations["mutations"], string>,
		Input extends Operations["mutations"][OperationName]["input"] = Operations["mutations"][OperationName]["input"],
		Response extends Operations["mutations"][OperationName]["response"] = Operations["mutations"][OperationName]["response"]
	>(options: OperationName extends string ? MutationRequestOptions<OperationName, Input> : OperationRequestOptions) {
		return super.mutate<OperationRequestOptions, Response["data"], Response["error"]>(options);
	}

	subscribe<
		OperationName extends Extract<keyof Operations["subscriptions"], string>,
		Input extends Operations["subscriptions"][OperationName]["input"] = Operations["subscriptions"][OperationName]["input"],
		Response extends Operations["subscriptions"][OperationName]["response"] = Operations["subscriptions"][OperationName]["response"]
	>(
		options: OperationName extends string
			? SubscriptionRequestOptions<OperationName, Input>
			: SubscriptionRequestOptions,
		cb?: SubscriptionEventHandler<Response["data"], Response["error"]>
	) {
		return super.subscribe<OperationRequestOptions, Response["data"], Response["error"]>(options, cb);
	}
	public login(authProviderID: Operations["authProvider"], redirectURI?: string) {
		return super.login(authProviderID, redirectURI);
	}
	public async fetchUser<TUser extends PublicUser = PublicUser>(options?: FetchUserRequestOptions) {
		return super.fetchUser<TUser>(options);
	}
}

export const createClient = (config?: CreateClientConfig) => {
	return new WunderGraphClient({
		...defaultClientConfig,
		...config,
		operationMetadata,
		csrfEnabled: false,
	});
};

export type Queries = {
	allApiLimits: {
		input?: undefined;
		response: { data?: AllApiLimitsResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	allSubscriptions: {
		input?: undefined;
		response: { data?: AllSubscriptionsResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
};

export type Mutations = {
	createApiLimit: {
		input: CreateApiLimitInput;
		response: { data?: CreateApiLimitResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	createSubscription: {
		input: CreateSubscriptionInput;
		response: { data?: CreateSubscriptionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	deleteApiLimit: {
		input: DeleteApiLimitInput;
		response: { data?: DeleteApiLimitResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	deleteSubscription: {
		input: DeleteSubscriptionInput;
		response: { data?: DeleteSubscriptionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	updateApiLimit: {
		input: UpdateApiLimitInput;
		response: { data?: UpdateApiLimitResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
	updateSubscription: {
		input: UpdateSubscriptionInput;
		response: { data?: UpdateSubscriptionResponse["data"]; error?: ClientOperationErrors };
		requiresAuthentication: false;
	};
};

export type Subscriptions = {};

export type LiveQueries = {};

export interface Operations
	extends OperationsDefinition<Queries, Mutations, Subscriptions, LiveQueries, UserRole, {}> {}
