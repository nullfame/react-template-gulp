// Import React, components
var React = require('react');
var Likes = require('./Likes.js');


//====== Component ======//

var HelloWorld = React.createClass({

	getDefaultProps: function () {
		return {
			name: "World"
		}
	},
	render: function () {
		return <div>
			<p>Hello, {this.props.name}</p>
			<p><Likes /></p>
		</div>;
	},
}); // End Component


// Export Component
module.exports = HelloWorld;