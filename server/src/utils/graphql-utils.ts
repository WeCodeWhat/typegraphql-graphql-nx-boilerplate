export interface GQLResolverFncMap {
	[key: string]: {
		[key: string]: GQLResolverFnc;
	};
}

export type GQLResolverFnc = (
	root: any,
	context: Context,
	args: any,
	info: any
) => any;

export interface Context {}
