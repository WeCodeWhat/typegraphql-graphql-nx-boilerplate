import { MiddlewareFn } from "type-graphql";
import { GQLContext } from "../../utils/graphql-utils";

export const UserIsLoggedIn: MiddlewareFn<GQLContext> = (
	{ context: { req } },
	next
) => {
	if (!req.session.userId) {
		throw new Error("not authenticated");
	}
	console.log("check");
	return next();
};
