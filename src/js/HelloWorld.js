// Import React
var React = require('react');


//====== Component ======//

var HelloWorld = React.createClass({

	getDefaultProps: function () {
		return {
			name: "World"
		}
	},
	getInitialState: function () {
		return {
			count: 0
		}
	},
	render: function () {
		return <p>Hello, {this.props.name} ({this.state.count})
			<button onClick={this.add}>+</button>
		</p>;
	},


	//====== Component Functions ======//

	add: function () {
		this.setState({
			count: this.state.count + 1
		});
	}
}); // End Component


// Export Component
module.exports = HelloWorld;