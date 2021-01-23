import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import Q from "./tmp/Q";
import S from "./tmp/S";

const addNum = gql`
	mutation {
		addNum
	}
`;

export default class App extends Component {
	render() {
		return (
			<div style={{ justifyContent: "center", display: "flex" }}>
				<div>
					<h1>Query with subscribeToMore</h1>
					<Q />
				</div>
				<div style={{ width: 300, display: "flex", justifyContent: "center" }}>
					<Mutation mutation={addNum}>
						{(mutate: any) => (
							<div>
								<button onClick={mutate}>add num</button>
							</div>
						)}
					</Mutation>
				</div>
				<div>
					<h1>Subscription component</h1>
					<S />
				</div>
			</div>
		);
	}
}
