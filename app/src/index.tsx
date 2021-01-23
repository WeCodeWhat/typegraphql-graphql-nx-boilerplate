import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	split,
	ApolloLink,
} from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
	uri: "http://localhost:5000/graphql",
});

const wsLink = new WebSocketLink({
	uri: `ws://localhost:5000/graphql`,
	options: {
		reconnect: true,
	},
});

const link = split(
	({ query, operationName }) => {
		const { kind } = getMainDefinition(query);
		return kind === "OperationDefinition" && operationName === "subscription";
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: ApolloLink.from([link]),
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ApolloProvider>,
	document.getElementById("root")
);

reportWebVitals();
