import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { GQLContext } from "../../utils/graphql-utils";

export const isAuth: MiddlewareFn<GQLContext> = (
	{ context: { req, session } },
	next
) => {
	console.log(req.session, session);
	if (!req.session.userId) {
		throw new AuthenticationError("not authenticated");
	}
	console.log("authenticated");
	return next();
};
