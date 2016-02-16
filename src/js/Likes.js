// Import React
var React = require('react');


//====== Component ======//

var Likes = React.createClass({

	getInitialState: function () {
		return {
			count: 0
		}
	},
	render: function () {
		var likeWord = "Likes"
		if(this.state.count == 1) likeWord = "Like";
		return <a href={'#'} onClick={this.add}>
			<i className={'fa fa-thumbs-up'}></i> {this.state.count} {likeWord}
		</a>;
	},


	//====== Component Functions ======//

	add: function () {
		this.setState({
			count: this.state.count + 1
		});
	}
}); // End Component


// Export Component
module.exports = Likes;